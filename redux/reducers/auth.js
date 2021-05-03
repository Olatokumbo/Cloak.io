import * as actionTypes from "../actions/actionTypes";
const initialState = {
  isAuth: false,
  loading: false,
  username: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNIN_SUCCESS:
      return {
          isAuth: true,
          loading: false,
          username: action.username
      };

    default:
      return state;
  }
};

export default authReducer;
