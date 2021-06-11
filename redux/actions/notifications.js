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
