import api from "./api"; // import your custom axios instance

const setAuthToken = (token) => {
  if (token) {
    // attach token to every request from our custom instance
    api.defaults.headers.common["x-auth-token"] = token;
  } else {
    // remove it if no token
    delete api.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
