import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actionTypes from "./redux/actions/actionTypes";
import { auth } from "./firebase/firebase";

const Auth = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        dispatch({
          type: actionTypes.SIGNIN_SUCCESS,
          uid: user.uid,
          photoURL: user.photoURL,
        });
      } else dispatch({ type: actionTypes.LOGGED_OUT });
    });
    return () => unsubscribe();
  }, []);
  return <div>{props.children}</div>;
};

export default Auth;
