import { combineReducers } from "redux";
import authReducer from "./auth";
import hireReducer from "./hires";
import jobReducer from "./jobs";
import posterReducer from "./posters";
const rootReducer = {
  auth: authReducer,
  hire: hireReducer,
  job: jobReducer,
  poster: posterReducer,
};

export default combineReducers(rootReducer);
