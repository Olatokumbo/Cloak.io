import * as actionTypes from "../actions/actionTypes";
const initialState = {
  isAuth: false,
  username: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNIN_SUCCESS:
      return {
          isAuth: true,
          username: "david0"
      };

    default:
      return state;
  }
};

export default authReducer;
