const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;

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
    const poster = snap.data();
    // Add an 'objectID' field which Algolia requires
    poster.objectID = context.params.posterId;

    // Write to the algolia index
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.saveObject(poster);
  });

// [START get_algolia_user_token]
// This complex HTTP function will be created as an ExpressJS app:
// https://expressjs.com/en/4x/api.html
const app = require("express")();
const getFirebaseUser = require("./middlewares/getFirebaseUser");

// We'll enable CORS support to allow the function to be invoked
// from our app client-side.
app.use(require("cors")({ origin: true }));

// Then we'll also use a special 'getFirebaseUser' middleware which
// verifies the Authorization header and adds a `user` field to the
// incoming request:
// https://gist.github.com/abeisgoat/832d6f8665454d0cd99ef08c229afb42
app.use(getFirebaseUser);

// Add a route handler to the app to generate the secured key
app.get("/", (req, res) => {
  // @ts-ignore
  const uid = req.user.uid;
  functions.logger.log("UID", uid);

  // Create the params object as described in the Algolia documentation:
  // https://www.algolia.com/doc/guides/security/api-keys/#generating-api-keys
  const params = {
    // This filter ensures that only documents where author == uid will be readable
    filters: `userId:${uid}`,
    // We also proxy the uid as a unique token for this key.
    userToken: uid,
  };

  // Call the Algolia API to generate a unique key based on our search key
  const key = client.generateSecuredApiKey(
    functions.config().algolia.search_key,
    params
  );

  // Then return this key as {key: '...key'}
  res.json({ key });
});

// Finally, pass our ExpressJS app to Cloud Functions as a function
// called 'getSearchKey';
exports.getSearchKey = functions.https.onRequest(app);
// [END get_algolia_user_token]
