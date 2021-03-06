import {
  auth,
  googleProvider,
  firestore,
  facebookProvider,
} from "../../firebase/firebase";
import * as actionTypes from "../actions/actionTypes";
import { successNotification } from "../../utils/notifications";

export const signinEaP = (email, password) => {
  // return (dispatch) => {
  return auth.signInWithEmailAndPassword(email, password).catch((error) => {
    throw new Error(error.message);
  });
  // };
};

export const signupEaP = (email, password) => {
  // return (dispatch) => {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      auth.currentUser.updateProfile({
        displayName: userCredential.user.email.split("@")[0],
      });
    })
    .then(() => {
      return sendVerificationEmailLink();
    })
    .catch((error) => {
      throw new Error(error.message);
    });
  // }
};

export const signinGoogle = () => {
  auth
    .signInWithPopup(googleProvider)
    .then((result) => {
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
      console.log(result);
      auth.currentUser.updateProfile({
        displayName: result.user.thirdPartyUserData.email.split("@")[0],
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
        dispatch({ type: actionTypes.RESET_NOTIFICATIONS });
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
export const sendVerificationEmailLink = () => {
  return auth.currentUser
    .sendEmailVerification()
    .then(() => {
      successNotification(
        "Success",
        "Verification Link has been sent to your email"
      );
    })
    .catch((e) => {
      console.log(e.message);
    });
};

export const deleteAccount = () => {
  return (dispatch) => {
    auth.currentUser
      .delete()
      .then(() => {
        auth
          .signOut()
          .then(() => {
            console.log("Logged Out");
            dispatch({ type: actionTypes.SIGNOUT });
            dispatch({ type: actionTypes.RESET_NOTIFICATIONS });
          })
          .catch((err) => new Error(err.message));
      })
      .catch((error) => {
        alert(error.message);
      });
  };
};
