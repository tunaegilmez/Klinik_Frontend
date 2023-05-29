import http from "./http";
import ENV from "../env.js";

const login = (email, password) => {
  return http.post(`${ENV.API_URL}/user/login`, {
    email,
    password,
  });
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
  return http.get(`${ENV.API_URL}/user`, { ...data });
};

const updateUserActive = userId => {
  return http.patch(`${ENV.API_URL}/user/updateUserActive/${userId}`, {});
};

const updateUserPayment = userId => {
  return http.patch(`${ENV.API_URL}/user/updateUserPayment/${userId}`, {});
};

const checkType = () => {
  return http.get(`${ENV.API_URL}/user/checkType`);
};

const getEvents = () => {
  return http.get(`${ENV.API_URL}/event`);
};

const addEvent = data => {
  return http.post(`${ENV.API_URL}/event`, data);
};

const deleteEvent = eventId => {
  return http.delete(`${ENV.API_URL}/event/${eventId}`, {});
};

const updateEvent = (eventId, data) => {
  return http.put(`${ENV.API_URL}/event/${eventId}`, {
    event: data,
  });
};

export default {
  login,
  register,
  getUsers,
  updateUserActive,
  updateUserPayment,
  checkType,

  //Event
  getEvents,
  addEvent,
  deleteEvent,
  updateEvent,
};
