import * as actionTypes from "../actions/actionTypes";
const initialState = {
  isAuth: false,
  loading: true,
  photoURL: null,
  uid: null,
  displayName: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNIN_SUCCESS:
      return {
        isAuth: true,
        loading: false,
        photoURL: action.photoURL,
        uid: action.uid,
        displayName: action.displayName,
      };
    case actionTypes.LOGGED_OUT:
      return {
        isAuth: false,
        photoURL: null,
        uid: null,
        loading: false,
        displayName: null,
      };
    case actionTypes.SIGNOUT:
      return {
        isAuth: false,
        photoURL: null,
        loading: false,
        uid: null,
        displayName: null,
      };
    default:
      return state;
  }
};

export default authReducer;
