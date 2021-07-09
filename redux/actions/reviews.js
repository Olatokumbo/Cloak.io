import { firestore } from "../../firebase/firebase";

export const fetchReviews = (posterId) => {
  const reviews = [];
  let lastVisible;
  return firestore
    .collection("reviews")
    .where("posterId", "==", posterId)
    .orderBy("date", "desc")
    .limit(2)
    .get()
    .then((snapShot) => {
      lastVisible = snapShot.docs[snapShot.docs.length - 1];
      snapShot.forEach((doc) => {
        reviews.push({ id: doc.id, ...doc.data() });
      });
    })
    .then(() => {
      return { reviews, lastVisible };
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};

export const fetchNextReviews = (posterId, last) => {
  const reviews = [];
  let lastVisible;
  return firestore
    .collection("reviews")
    .where("posterId", "==", posterId)
    .orderBy("date", "desc")
    .startAfter(last)
    .limit(2)
    .get()
    .then((snapShot) => {
      lastVisible = snapShot.docs[snapShot.docs.length - 1];
      // else lastVisible = null;
      snapShot.forEach((doc) => {
        reviews.push({ id: doc.id, ...doc.data() });
      });
    })
    .then(() => {
      return { reviews, lastVisible };
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
