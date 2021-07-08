import { firestore } from "../../firebase/firebase";
import * as actionTypes from "../../redux/actions/actionTypes";

export const getNotifications = (userId) => {
  return (dispatch) => {
    const unsubscribe = firestore
      .collection("notifications")
      .where("userId", "==", userId)
      .orderBy("date", "desc")
      .limit(4)
      .onSnapshot((querySnapshot) => {
        let notifications = [];
        querySnapshot.forEach((doc) => {
          notifications.push({ id: doc.id, ...doc.data() });
          dispatch({
            type: actionTypes.GET_NOTIFICATIONS,
            notifications,
          });
        });
      });
    return unsubscribe;
  };
};

export const fetchNotifications = (userId) => {
  let notifications = [];
  let lastVisible;
  return firestore
    .collection("notifications")
    .where("userId", "==", userId)
    .orderBy("date", "desc")
    .limit(6)
    .get()
    .then((querySnapshot) => {
      console.log(querySnapshot);
      lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      querySnapshot.forEach((doc) => {
        notifications.push({ id: doc.id, ...doc.data() });
      });
    })
    .then(() => {
      return { notifications, lastVisible };
    });
};

export const fetchNextNotifications = (userId, last) => {
  let notifications = [];
  let lastVisible;
  return firestore
    .collection("notifications")
    .where("userId", "==", userId)
    .orderBy("date", "desc")
    .startAfter(last)
    .limit(6)
    .get()
    .then((querySnapshot) => {
      lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      querySnapshot.forEach((doc) => {
        notifications.push({ id: doc.id, ...doc.data() });
      });
    })
    .then(() => {
      return { notifications, lastVisible };
    });
};

export const resetNotifications = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.RESET_NOTIFICATIONS });
  };
};
