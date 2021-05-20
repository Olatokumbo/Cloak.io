import { firestore } from "../../firebase/firebase";

export const getAllProfileId = () => {
  const users = [];
  return firestore
    .collection("users")
    .get()
    .then((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        users.push(doc.id);
      });
    })
    .then(() => {
      return JSON.stringify(users);
    });
};

export const fetchUser = (userId) => {
  return firestore
    .collection("users")
    .doc(userId)
    .get()
    .then((doc) => {
      return JSON.stringify({ ...doc.data(), id: doc.id });
    })
    .catch((e) => {
      return new Error(e.message);
    });
};

export const updateProfileDescription = (profile) => {
  return firestore
    .collection("users")
    .doc(profile.id)
    .update({
      description: profile.description,
    })
    .then(() => {
      alert("Successfully Updated Your Description");
    })
    .catch((e) => {
      return new Error(e.message);
    });
};
