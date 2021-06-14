import * as actionTypes from "../actions/actionTypes";
const initialState = {
  myPosters: [],
};

const posterReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MY_POSTERS:
      return {
        myPosters: action.posters,
      };
    case actionTypes.RESET_POSTERS:
      return {
        ...state,
        myPosters: [],
      };
    default:
      return state;
  }
};

export default posterReducer;
