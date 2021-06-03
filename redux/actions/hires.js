import firebase, { firestore } from "../../firebase/firebase";
import * as actionTypes from "../../redux/actions/actionTypes";
export const hireMe = (data) => {
  return firestore
    .collection("hires")
    .add({
      title: data.title,
      description: data.description,
      price: data.price,
      approvedStatus: null,
      done: false,
      userId: data.userId,
      customerId: data.customerId,
      posterId: data.posterId,
      date: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log("Document Updated");
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};

export const listPendingHires = (id) => {
  const hireList = [];
  return firestore
    .collection("hires")
    .where("userId", "==", id)
    .where("approvedStatus", "==", null)
    .get()
    .then((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        hireList.push({ ...doc.data(), id: doc.id });
      });
    })
    .then(() => {
      return hireList;
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};

export const acceptHire = (id) => {
  return firestore
    .collection("hires")
    .doc(id)
    .update({
      approvedStatus: true,
    })
    .then(() => {
      alert("You have approved this job");
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};

export const rejectHire = (id) => {
  return firestore
    .collection("hires")
    .doc(id)
    .update({
      approvedStatus: false,
    })
    .then(() => {
      alert("You have rejected this job");
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};

export const viewWorkOrder = (id) => {
  return firestore
    .collection("hires")
    .doc(id)
    .get()
    .then((doc) => {
      return { ...doc.data(), id: doc.id };
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};

export const isWorkOrderActive = (customerId, userId, posterId) => {
  return (dispatch) => {
    const unsubscribe = firestore
      .collection("hires")
      .where("customerId", "==", customerId)
      .where("userId", "==", userId)
      .where("posterId", "==", posterId)
      .where("done", "==", false)
      .onSnapshot((doc) => {
        if (doc.empty) dispatch({ type: actionTypes.IS_ACTIVE });
        else dispatch({ type: actionTypes.NOT_ACTIVE });
      });
    return unsubscribe;
  };
};
