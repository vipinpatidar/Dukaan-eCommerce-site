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
// export const token = () => {
//   const tokenValue = getToken();

//   const headers = {
//     "Content-Type": "application/json",
//   };

//   // Add Authorization header if a token is available
//   if (tokenValue) {
//     headers.Authorization = `Bearer ${tokenValue}`;
//   }

//   return headers;
// };

// console.log(token());

export const makeUserRequest = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api/`,
  withCredentials: true,
  // headers: token(),
  signal: new AbortController().signal,
});

makeUserRequest.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    config.headers["Content-Type"] = "application/json";

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// headers: { token: `Bearer ${TOKEN}` },

export const makePublicRequest = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api/`,
  headers: { "Content-Type": "application/json" },
  signal: new AbortController().signal,
});
