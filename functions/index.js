const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.newUser = functions.auth.user().onCreate((user) => {
  return addUser(user);
});

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
      photoUrl: cred.photoURL,
      joined: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => functions.logger.info("New User has been Added"))
    .catch((err) => Error(err.message));
};
