import { writable } from "svelte/store";

export const users = writable([]);

const _user =
  localStorage.getItem("user") && localStorage.getItem("user") != "null"
    ? JSON.parse(localStorage.getItem("user"))
    : null;
export const user = writable(_user);
user.subscribe(value => {
  localStorage.setItem("user", JSON.stringify(value));
});

export const modal = writable(null);

export default {
  users,
};
