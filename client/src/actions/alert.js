import { v4 as uuidv4 } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

// timeout in ms (default 5s)
export const setAlert =
  (msg, alertType, timeout = 5000) =>
  (dispatch) => {
    const id = uuidv4();

    // Dispatch SET_ALERT
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id },
    });

    // Dispatch REMOVE_ALERT after timeout
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };
