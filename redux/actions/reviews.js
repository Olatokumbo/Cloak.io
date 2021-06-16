import { firestore } from "../../firebase/firebase";
export const fetchReviews = (posterId) => {
  const reviews = [];
  return firestore
    .collection("reviews")
    .where("posterId", "==", posterId)
    .get()
    .then((snapShot) => {
      snapShot.forEach((doc) => {
        reviews.push({ id: doc.id, ...doc.data() });
      });
    })
    .then(() => {
      return (reviews);
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};
