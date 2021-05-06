import { auth, provider } from "../../firebase/firebase";
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
