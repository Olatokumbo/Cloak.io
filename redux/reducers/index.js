import { combineReducers } from "redux";
import authReducer from "./auth";
import hireReducer from "./hires";
import jobReducer from "./jobs";
const rootReducer = {
  auth: authReducer,
  hire: hireReducer,
  job: jobReducer,
};

export default combineReducers(rootReducer);
