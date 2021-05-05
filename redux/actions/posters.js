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
  let promises = [];
  return firestore
    .collection("posters")
    .where("category", "==", category)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let posterData = doc.data();
        posterData.id = doc.id;
        if (posterData.authorRef) {
          promises.push(
            posterData.authorRef.get().then((res) => {
              posterData.authorData = res.data();
            })
          );
        }
        posters.push(posterData);
      });
      return Promise.all(promises);
    })
    .then(() => {
      return JSON.stringify(posters);
    })
    .catch((err) => err.message);
};

export const fetchPostersbyId = (documentId) => {
  let promises = [];
  let poster;
  return firestore
    .collection("posters")
    .doc(documentId)
    .get()
    .then((doc) => {
      poster = doc.data();
      poster.id = doc.id;
      promises.push(
        poster.authorRef.get().then((res) => {
          poster.authorData = res.data();
        })
      );
      return Promise.all(promises);
    })
    .then(() => {
      return JSON.stringify(poster);
    });
};
