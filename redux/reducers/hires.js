import * as actionTypes from "../actions/actionTypes";
const initialState = {
  isWorkOrderActive: null,
  workOrder: {}
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
    case actionTypes.FETCH_WORK_ORDER:
      return{
        ...state,
        workOrder: action.workOrder
      }
    default:
      return state;
  }
};

export default hireReducer;
