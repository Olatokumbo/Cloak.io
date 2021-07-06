const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { ALGOLIA_ADMIN_KEY, ALGOLIA_ID } = require("../config");
const algoliasearch = require("algoliasearch").default;
// const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;

const ALGOLIA_INDEX_NAME = "jobs";
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

const onJobCreated = functions.firestore
  .document("jobs/{jobId}")
  .onCreate((snap, context) => {
    // Get the note document
    const job = snap.data();
    // Add an 'objectID' field which Algolia requires
    job.objectID = context.params.jobId;
    // Write to the algolia index
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return admin
      .auth()
      .getUser(job.userId)
      .then((user) => {
        job.photoURL = user.photoURL;
        job.displayName = user.displayName;
      })
      .then(() => {
        return index.saveObject(job);
      });
  });

const onJobUpdated = functions.firestore
  .document("jobs/{jobId}")
  .onUpdate((change, context) => {
    const job = change.after.data();
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
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

const onJobDeleted = functions.firestore
  .document("jobs/{jobId}")
  .onDelete((snap, context) => {
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    const { jobId } = context.params;
    return index.deleteObject(jobId).then((data) => {
      functions.logger.info("Delete the Algolia Object", data);
    });
  });


  module.exports = { onJobCreated, onJobUpdated, onJobDeleted} 