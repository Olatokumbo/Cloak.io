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

const deleteUser = functions.auth.user().onDelete((user) => {
  return removeUser(user);
});

const removeUser = (cred) => {
  return admin
    .firestore()
    .collection("users")
    .doc(cred.uid)
    .delete()
    .then(() => {
      return deletePostersbyId(cred.uid);
    })
    .then(() => {
      return deleteJobsbyId(cred.uid);
    });
};

const deletePostersbyId = (userId) => {
  var promises = [];
  var collectionRef = admin
    .firestore()
    .collection("posters")
    .where("userId", "==", userId);

  return collectionRef
    .get()
    .then((qs) => {
      qs.forEach((docSnapshot) => {
        promises.push(docSnapshot.ref.delete());
      });
      return Promise.all(promises);
    })
    .then(() => {
      return functions.logger.info("POSTERS REMOVED");
    })
    .then(() => {});
};

const deleteJobsbyId = (userId) => {
  var promises = [];
  var collectionRef = admin
    .firestore()
    .collection("jobs")
    .where("userId", "==", userId);

  return collectionRef
    .get()
    .then((qs) => {
      qs.forEach((docSnapshot) => {
        promises.push(docSnapshot.ref.delete());
      });
      return Promise.all(promises);
    })
    .then(() => {
      functions.logger.info("JOBS REMOVED");
    });
};

module.exports = { newUser, deleteUser };
