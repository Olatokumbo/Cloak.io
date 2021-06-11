const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { ALGOLIA_ADMIN_KEY, ALGOLIA_ID } = require("../config");
const algoliasearch = require("algoliasearch").default;
const addNotification = require("../helper/notification");
// const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;

const ALGOLIA_INDEX_NAME = "posters";
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

// Algolia search
const onPosterCreated = functions.firestore
  .document("posters/{posterId}")
  .onCreate((snap, context) => {
    // Get the note document
    const poster = snap.data();
    // Add an 'objectID' field which Algolia requires
    poster.objectID = context.params.posterId;
    // Write to the algolia index
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    admin
      .auth()
      .getUser(poster.userId)
      .then((user) => {
        poster.photoURL = user.photoURL;
        poster.displayName = user.displayName;
      })
      .then(() => {
        return index.saveObject(poster);
      });
  });

const onPosterUpdate = functions.firestore
  .document("posters/{posterId}")
  .onUpdate((change, context) => {
    const poster = change.after.data();
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    poster.objectID = context.params.posterId;
    return admin
      .firestore()
      .collection("users")
      .doc(poster.userId)
      .get()
      .then((res) => {
        // poster.authorData = res.data();
        poster.photoURL = res.data().photoURL;
        poster.displayName = res.data().displayName;
      })
      .then(() => {
        return index.partialUpdateObject(poster).then((data) => {
          functions.logger.info("Algolia", data);
        });
      });
  });

const onPosterDeleted = functions.firestore
  .document("posters/{posterId}")
  .onDelete((snap, context) => {
    const { posterId } = context.params;
    const userId = snap.data().userId;
    return deletePoster(posterId, userId);
  });

const deleteAlgoliaObject = (objectID) => {
  // Write to the algolia index
  const index = client.initIndex(ALGOLIA_INDEX_NAME);
  return index
    .deleteObject(objectID)
    .then(() => {
      return console.log("Successfully deleted File");
    })
    .catch((err) => {
      return Error("Error::", err.message);
    });
};

const deletePoster = (posterId, userId) => {
  const bucket = admin.storage().bucket();
  return bucket
    .deleteFiles({
      prefix: `${userId}/posters/${posterId}`,
    })
    .then(() => {
      return deleteAlgoliaObject(posterId);
    })
    .catch((err) => {
      return Error("Error::", err.message);
    });
};

const onPosterHire = functions.firestore
  .document("/hires/{hireId}")
  .onCreate((snapshot, context) => {
    const userId = snapshot.data().userId;
    const { hireId } = context.params;
    const url = `/poster/requests/${hireId}`;
    return addNotification({ userId, message: "New Hire Request", url });
  });

module.exports = {
  onPosterCreated,
  onPosterUpdate,
  onPosterDeleted,
  onPosterHire,
};
