import { firestore } from "../../firebase/firebase";
export const fetchReviews = (posterId) => {
  const reviews = [];
  return firestore
    .collection("reviews")
    .where("posterId", "==", posterId)
    .orderBy("date", "desc")
    .get()
    .then((snapShot) => {
      snapShot.forEach((doc) => {
        reviews.push({ id: doc.id, ...doc.data() });
      });
    })
    .then(() => {
      return reviews;
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};

export const fetchReviewById = (id) => {
  return firestore
    .collection("reviews")
    .doc(id)
    .get()
    .then((doc) => {
      return { id: doc.id, ...doc.data() };
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};

export const isHireReviewed = (hireId) => {
  return firestore
    .collection("hires")
    .doc(hireId)
    .get()
    .then((doc) => {
      if (doc.data().reviewId) return true;
      else return false;
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};
