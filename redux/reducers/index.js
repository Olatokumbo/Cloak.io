import { combineReducers } from "redux";
import authReducer from "./auth";
import hireReducer from "./hires";
const rootReducer = {
  auth: authReducer,
  hire: hireReducer,
};

export default combineReducers(rootReducer);
