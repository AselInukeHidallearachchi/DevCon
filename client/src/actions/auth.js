import api from "../utils/api";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Load user
export const loadUser = () => async (dispatch) => {
  // If a token exists in localStorage, stick it on Axios headers
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await api.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data, // user object (name, email, avatar)
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register user (from the previous step, unchanged except imports)
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({ name, email, password });

    try {
      const res = await api.post("/api/users", body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data, // { token }
      });

      // Load user immediately after successful registration
      dispatch(loadUser());
    } catch (err) {
      const errors = err?.response?.data?.errors;
      if (errors) errors.forEach((e) => dispatch(setAlert(e.msg, "danger")));

      dispatch({ type: REGISTER_FAIL });
    }
  };
