import http from "./http";
import ENV from "../env.js";

const login = (email, password) => {
  return http.post(`${ENV.API_URL}/user/login`, { email, password });
};

export default {
  login,
};
