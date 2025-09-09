// src/reducers/index.js
import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";

// Later you'll import real reducers like:
// import profile from './profile';
// import posts from './posts';
// import alert from './alert';

export default combineReducers({
  auth,
  // profile,
  // posts,
  alert,
});
