import {
  auth,
  googleProvider,
  firestore,
  facebookProvider,
} from "../../firebase/firebase";
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
    .signInWithPopup(googleProvider)
    .then((result) => {
      console.log("Signin", result);
      auth.currentUser.updateProfile({
        displayName: result.user.email.split("@")[0],
      });
    })
    .catch((error) => {
      alert(error.message);
    });
};

export const signinFacebook = () => {
  auth
    .signInWithPopup(facebookProvider)
    .then((result) => {
      console.log("Signin", result);
      auth.currentUser.updateProfile({
        displayName: result.user.email.split("@")[0],
      });
    })
    .catch((error) => {
      alert(error.message);
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
    })
    .then(() => {
      alert("Changes Saved");
    })
    .catch((e) => {
      console.log(e.message);
    });
};
