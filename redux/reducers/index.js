import { combineReducers } from "redux";
import authReducer from "./auth";
import hireReducer from "./hires";
import jobReducer from "./jobs";
import posterReducer from "./posters";
import profileReducer from "./profile";
import notifReducer from "./notifications";
const rootReducer = {
  auth: authReducer,
  hire: hireReducer,
  job: jobReducer,
  poster: posterReducer,
  profile: profileReducer,
  notif: notifReducer
};

export default combineReducers(rootReducer);
