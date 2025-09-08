import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

// Each alert will look like: { id, msg, alertType }
const initialState = [];

export default function alertReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      // Add a new alert
      return [...state, payload];
    case REMOVE_ALERT:
      // Remove alert by id
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
