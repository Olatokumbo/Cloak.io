import firebase, { firestore } from "../../firebase/firebase";
import * as actionTypes from "../../redux/actions/actionTypes";
import {
  defaultNotification,
  successNotification,
  warningNotification,
} from "../../utils/notifications";
export const hireMe = (data) => {
  return firestore
    .collection("hires")
    .add({
      title: data.title,
      description: data.description,
      price: data.price,
      done: false,
      cancelled: false,
      userId: data.userId,
      customerId: data.customerId,
      posterId: data.posterId,
      reviewId: null,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      cancelledDate: null,
      completedDate: null,
    })
    .then(() => {
      defaultNotification("Hire Request Sent", "Waiting for Hire Approval");
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
    .where("done", "==", false)
    .where("cancelled", "==", false)
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

export const listPendingHireRequests = (id) => {
  const hireList = [];
  return firestore
    .collection("hires")
    .where("customerId", "==", id)
    .where("done", "==", false)
    .where("cancelled", "==", false)
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

export const listFinishedHires = (id) => {
  const hireList = [];
  return firestore
    .collection("hires")
    .where("userId", "==", id)
    .where("done", "==", true)
    .where("cancelled", "==", false)
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

export const listFinishedHireRequest = (id) => {
  const hireList = [];
  return firestore
    .collection("hires")
    .where("customerId", "==", id)
    .where("done", "==", true)
    .where("cancelled", "==", false)
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

// export const acceptHire = (id) => {
//   return firestore
//     .collection("hires")
//     .doc(id)
//     .update({
//       approvedStatus: true,
//     })
//     .then(() => {
//       alert("You have approved this job");
//     })
//     .catch((e) => {
//       throw new Error(e.message);
//     });
// };

// export const rejectHire = (id) => {
//   return firestore
//     .collection("hires")
//     .doc(id)
//     .update({
//       approvedStatus: false,
//     })
//     .then(() => {
//       alert("You have rejected this job");
//     })
//     .catch((e) => {
//       throw new Error(e.message);
//     });
// };

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
      .where("cancelled", "==", true)
      .onSnapshot((doc) => {
        if (doc.empty) dispatch({ type: actionTypes.IS_ACTIVE });
        else dispatch({ type: actionTypes.NOT_ACTIVE });
      });
    return unsubscribe;
  };
};

export const finishJob = (id) => {
  return firestore
    .collection("hires")
    .doc(id)
    .update({
      done: true,
      cancelled: false,
      completedDate: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      successNotification("Success", "Job Finished");
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};

export const cancelJob = (id) => {
  return firestore
    .collection("hires")
    .doc(id)
    .update({
      done: false,
      cancelled: true,
      cancelledDate: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      warningNotification("Rejected", "Job Order Rejected");
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};

export const listCancelledHires = (userId) => {
  let cancelledHires = [];
  return firestore
    .collection("hires")
    .where("userId", "==", userId)
    .where("cancelled", "==", true)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        cancelledHires.push({ id: doc.id, ...doc.data() });
      });
    })
    .then(() => {
      return cancelledHires;
    });
};

export const addReview = (data) => {
  return firestore.collection("reviews").add({
    hireId: data.id,
    rating: data.rating,
    title: data.title,
    message: data.message,
    posterId: data.posterId,
    userId: data.userId,
    date: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
