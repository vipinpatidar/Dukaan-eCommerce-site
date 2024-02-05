import axios from "axios";

axios.defaults.withCredentials = true;

// Create a function to retrieve the token from sessionStorage
const getToken = () => {
  const persistedStateString = localStorage.getItem("persist:root");
  // console.log(persistedStateString);

  if (persistedStateString) {
    const persistedState = JSON.parse(persistedStateString);

    if (persistedState && persistedState.user) {
      const userObject = JSON.parse(persistedState.user);

      if (userObject && userObject.token) {
        return userObject.token;
      }
    }
  }

  return null;
};

// Create a function to make requests with the Authorization header
export const token = () => {
  const tokenValue = getToken();

  const headers = {
    "Content-Type": "application/json",
  };

  // Add Authorization header if a token is available
  if (tokenValue) {
    headers.Authorization = `Bearer ${tokenValue}`;
  }

  return headers;
};

// console.log(token());

export const makeUserRequest = axios.create({
  baseURL: "http://localhost:8080/api/",
  withCredentials: true,
  headers: token(),
  signal: new AbortController().signal,
});

// headers: { token: `Bearer ${TOKEN}` },

export const makePublicRequest = axios.create({
  baseURL: "http://localhost:8080/api/",
});
