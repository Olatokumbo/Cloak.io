import { firestore } from "../../firebase/firebase";
import * as actionTypes from "../../redux/actions/actionTypes";

export const getAllProfileId = () => {
  const users = [];
  return firestore
    .collection("users")
    .get()
    .then((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        users.push(doc.id);
      });
    })
    .then(() => {
      return JSON.stringify(users);
    });
};

export const fetchUser = (userId) => {
  return firestore
    .collection("users")
    .doc(userId)
    .get()
    .then((doc) => {
      return JSON.stringify({ ...doc.data(), id: doc.id });
    })
    .catch((e) => {
      return new Error(e.message);
    });
};

export const updateProfileDescription = (profile) => {
  return firestore
    .collection("users")
    .doc(profile.id)
    .update({
      description: profile.description,
    })
    .then(() => {
      alert("Successfully Updated Your Description");
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};

export const updateProfileSocialLink = (twitterUrl, facebookUrl, instagramUrl, userId) => {
  console.log("RUNNING")
  return firestore
    .collection("users")
    .doc(userId)
    .update({
      twitterUrl,
      facebookUrl,
      instagramUrl,
    })
    .then(() => {
      alert("Successfully Updated");
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};

export const getProfileDetails = (id) => {
  return (dispatch) => {
    const unsubscribe = firestore
      .collection("users")
      .doc(id)
      .onSnapshot((doc) => {
        console.log(doc);
        dispatch({
          type: actionTypes.FETCH_PROFILE,
          user: { id: doc.id, ...doc.data() },
        });
      });
    return unsubscribe;
  };
};

export const resetProfile = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.RESET_PROFILE });
  };
};
