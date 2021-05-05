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
      displayName: cred.displayName,
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
    return index.saveObject(poster);
  });
