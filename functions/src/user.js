const functions = require("firebase-functions");
const admin = require("firebase-admin");

const newUser = functions.auth.user().onCreate((user) => {
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
      facebookUrl: "",
      twitterUrl: "",
      instagramUrl: "",
      photoURL: cred.photoURL,
      joined: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => functions.logger.info("New User has been Added"))
    .catch((err) => Error(err.message));
};

module.exports = newUser;
