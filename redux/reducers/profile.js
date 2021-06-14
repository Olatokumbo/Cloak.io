import * as actionTypes from "../actions/actionTypes";
const initialState = {
  user: {},
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROFILE:
      return {
        user: action.user,
      };
    case actionTypes.FETCH_PROFILE:
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};

export default profileReducer;
