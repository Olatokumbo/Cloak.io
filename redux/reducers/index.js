import { combineReducers } from "redux";
import authReducer from "./auth";
const rootReducer = {
  auth: authReducer,
};

export default combineReducers(rootReducer);
