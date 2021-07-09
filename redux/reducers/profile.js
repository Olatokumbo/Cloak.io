import * as actionTypes from "../actions/actionTypes";
const initialState = {
  user: {},
  notFound: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROFILE:
      return {
        user: action.user,
        notFound: false,
      };
    case actionTypes.PROFILE_NOT_FOUND:
      return {
        user: {},
        notFound: true,
      };
    case actionTypes.RESET_PROFILE:
      return {
        ...state,
        user: {},
        notFound: null,
      };
    default:
      return state;
  }
};

export default profileReducer;
