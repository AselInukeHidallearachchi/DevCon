import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload, // user object from /api/auth
      };

    case REGISTER_SUCCESS:
      // Persist token so a page refresh can still authenticate
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload, // { token }
        isAuthenticated: true,
        loading: false,
      };

    case AUTH_ERROR:
    case REGISTER_FAIL:
      // Token invalid/absent — clear everything
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };

    default:
      return state;
  }
}
