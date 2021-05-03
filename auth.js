import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actionTypes from "./redux/actions/actionTypes";
import { auth } from "./firebase/firebase";

const Auth = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: actionTypes.SIGNIN_SUCCESS, username: "david0" });
        console.log("Logged In");
      } else console.log("Logged Out");
    });
  }, []);
  return <div>{props.children}</div>;
};

export default Auth;
