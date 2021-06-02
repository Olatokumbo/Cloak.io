import firebase, { firestore } from "../../firebase/firebase";

export const hireMe = (data) => {
  return firestore
    .collection("hires")
    .add({
      title: data.title,
      description: data.description,
      price: data.price,
      approvedStatus: null,
      userId: data.userId,
      customerId: data.customerId,
      date: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log("Document Updated");
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};
