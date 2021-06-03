import * as actionTypes from "../actions/actionTypes";
const initialState = {
  isWorkOrderActive: false,
};

const hireReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.IS_ACTIVE:
      return {
        isWorkOrderActive: true,
      };
    case actionTypes.NOT_ACTIVE:
      return {
        isWorkOrderActive: false,
      };
    default:
      return state;
  }
};

export default hireReducer;
