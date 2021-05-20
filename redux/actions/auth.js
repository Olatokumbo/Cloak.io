import { auth, provider, firestore } from "../../firebase/firebase";
import * as actionTypes from "../actions/actionTypes";

export const signinEaP = (cred) => {
  return (dispatch) => {
    auth
      .signInWithEmailAndPassword(cred.email, cred.password)
      .then((data) => {});
  };
};

export const signinGoogle = () => {
  auth
    .signInWithPopup(provider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signout = () => {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        console.log("Logged Out");
        dispatch({ type: actionTypes.SIGNOUT });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setupAccount = (displayName, phoneNumber, uid) => {
  auth.currentUser
    .updateProfile({
      displayName,
    })
    .then(() => {
      firestore.collection("users").doc(uid).update({
        phoneNumber,
        displayName,
      });
    }).then(()=>{
      alert("Changes Saved")
    })
    .catch((e) => {
      console.log(e.message);
    });
};
