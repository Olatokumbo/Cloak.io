import { firestore } from "../../firebase/firebase";

export const fetchPosters = (id) => {
  let posters = [];
  return firestore
    .collection("posters")
    .where("category", "==", id)
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