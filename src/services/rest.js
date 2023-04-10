import http from "./http";
import ENV from "../env.js";

const login = (email, password) => {
  return http.post(`${ENV.API_URL}/user/login`, { email, password });
};

const register = (fullName, email, password) => {
  return http.post(`${ENV.API_URL}/user/signup`, {
    fullName,
    email,
    password,
  });
};

const getUsers = (limit, skip) => {
  let data = {};
  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }
  console.log(data, "Rest.js Data");
  return http.get(`${ENV.API_URL}/user`, { ...data });
};

const updateUserActive = userId => {
  console.log("updateUserActive service", userId);
  return http.patch(`${ENV.API_URL}/user/updateUserActive/${userId}`, {});
};

export default {
  login,
  register,
  getUsers,
  updateUserActive,
};
