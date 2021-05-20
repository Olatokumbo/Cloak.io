const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const algoliasearch = require("algoliasearch").default;
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
// const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;

const ALGOLIA_INDEX_NAME = "posters";
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

exports.newUser = functions.auth.user().onCreate((user) => {
  return addUser(user);
});

// It creates a new Document when a new User joins
const addUser = (cred) => {
  return admin
    .firestore()
    .collection("users")
    .doc(cred.uid)
    .set({
      email: cred.email,
      displayName: cred.email.split("@")[0],
      emailVerified: cred.emailVerified,
      phoneNumber: cred.phoneNumber,
      location: null,
      photoURL: cred.photoURL,
      joined: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => functions.logger.info("New User has been Added"))
    .catch((err) => Error(err.message));
};

// Algolia search
exports.onPosterCreated = functions.firestore
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

exports.onPosterUpdate = functions.firestore
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

// exports.onPosterDeleted = functions.firestore
//   .document("posters/{posterId}")
//   .onDelete((_snap, context) => {
//     const index = client.initIndex(ALGOLIA_INDEX_NAME);
//     index.delete().then(() => {
//       functions.logger.info("Algolia has been deleted");
//     });
//   });

exports.onJobCreated = functions.firestore
  .document("jobs/{jobId}")
  .onCreate((snap, context) => {
    // Get the note document
    const job = snap.data();
    // Add an 'objectID' field which Algolia requires
    job.objectID = context.params.jobId;
    // Write to the algolia index
    const index = client.initIndex("jobs");
    return admin
      .auth()
      .getUser(job.userId)
      .then((user) => {
        job.photoURL = user.photoURL;
        job.displayName = user.displayName;
        job.location = user.location;
      })
      .then(() => {
        return index.saveObject(job);
      });
  });

exports.onJobUpdated = functions.firestore
  .document("jobs/{jobId}")
  .onUpdate((change, context) => {
    const job = change.after.data();
    const index = client.initIndex("jobs");
    job.objectID = context.params.jobId;
    return admin
      .firestore()
      .collection("users")
      .doc(job.userId)
      .get()
      .then((res) => {
        // poster.authorData = res.data();
        job.photoURL = res.data().photoURL;
        job.displayName = res.data().displayName;
      })
      .then(() => {
        return index.partialUpdateObject(job).then((data) => {
          functions.logger.info("Algolia", data);
        });
      });
  });
