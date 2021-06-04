import * as actionTypes from "../actions/actionTypes";
const initialState = {
  jobApplied: false,
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APPLIED:
      return {
        jobApplied: true,
      };
    case actionTypes.NOT_APPLIED:
      return {
        jobApplied: false,
      };
    default:
      return state;
  }
};

export default jobReducer;
