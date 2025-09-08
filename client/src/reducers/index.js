// src/reducers/index.js
import { combineReducers } from "redux";
import alert from "./alert";

// Later you'll import real reducers like:
// import auth from './auth';
// import profile from './profile';
// import posts from './posts';
// import alert from './alert';

export default combineReducers({
  // auth,
  // profile,
  // posts,
  alert,
});
