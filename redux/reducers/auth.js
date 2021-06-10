import * as actionTypes from "../actions/actionTypes";
const initialState = {
  isAuth: false,
  loading: true,
  photoURL: null,
  uid: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNIN_SUCCESS:
      return {
        isAuth: true,
        loading: false,
        photoURL: action.photoURL,
        uid: action.uid,
      };
    case actionTypes.LOGGED_OUT:
      return {
        isAuth: false,
        photoURL: null,
        uid: null,
        loading: false,
      };
    case actionTypes.SIGNOUT:
      return {
        isAuth: false,
        photoURL: null,
        loading: false,
        uid: null,
      };
    default:
      return state;
  }
};

export default authReducer;
