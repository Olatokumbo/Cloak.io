import firebase, { firestore } from "../../firebase/firebase";

export const getAllPostersId = () => {
  let posters = [];
  return firestore
    .collection("posters")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        posters.push(doc.id);
      });
    })
    .then(() => JSON.stringify(posters))
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};

export const fetchPostersbyCategory = (category) => {
  let posters = [];
  return firestore
    .collection("posters")
    .where("category", "==", category)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        posters.push({ ...doc.data(), id: doc.id });
      });
    })
    .then(() => {
      return JSON.stringify(posters);
    })
    .catch((err) => err.message);
};

export const fetchPostersbyId = (documentId) => {
  return firestore
    .collection("posters")
    .doc(documentId)
    .get()
    .then((doc) => {
      return JSON.stringify(doc.data());
    });
};
