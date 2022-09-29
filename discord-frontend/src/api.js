import axios from "axios";
import { logout } from "./shared/utils/auth";

//live api
const apiClient = axios.create({
  baseURL: "https://discord-clone-api.onrender.com/api/v1"
  // timeout: 2000,
});

//localhost
// const apiClient = axios.create({
//   baseURL: "http://localhost:5001/api/v1",
//   timeout: 1000,
// });

//host local ipv4
// const apiClient = axios.create({
//   baseURL: "http://192.168.0.108:5001/api/v1",
//   timeout: 1000,
// });

apiClient.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem("user");

    if (userDetails) {
      const token = JSON.parse(userDetails).token;
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// public routes
export const login = async (data) => {
  try {
    console.log(data);
    return await apiClient.post("/auth/login", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const register = async (data) => {
  try {
    console.log(data);

    return await apiClient.post("/auth/register", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

// secure routes
export const sendFriendInvitation = async (data) => {
  try {
    return await apiClient.post('/friend-invitation/invite', data)
  } catch (exception) {
    checkResponseCode(exception)
    return {
      error: true,
      exception,
    };
  }
}

export const acceptFriendInvitation = async (data) => {
  try {
    return await apiClient.post('/friend-invitation/accept', data)
  } catch (exception) {
    checkResponseCode(exception)
    return {
      error: true,
      exception,
    };
  }
}

export const rejectFriendInvitation = async (data) => {
  try {
    return await apiClient.post('/friend-invitation/reject', data)
  } catch (exception) {
    checkResponseCode(exception)
    return {
      error: true,
      exception,
    };
  }
}

const checkResponseCode = (exception) => {
  const responseCode = exception?.response?.status;

  if (responseCode) {
    (responseCode === 401 || responseCode === 403) && logout();
  }
};
