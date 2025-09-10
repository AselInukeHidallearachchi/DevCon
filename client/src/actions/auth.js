import api from '../utils/api';
import { setAlert } from "./alert";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

// Register user
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      const res = await api.post("/api/users", { name, email, password });

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data, // contains token
      });
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
