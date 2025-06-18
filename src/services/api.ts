import {
  retrieveLaunchParams,
  retrieveLaunchParams as retrieveLaunchParamsDev,
} from "@tma.js/sdk";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

instance.interceptors.request.use((config) => {
  try {
    const { initDataRaw } = retrieveLaunchParams();
    config.headers.authorization = `Bearer ${initDataRaw}`;
  } catch (error) {
    console.log("Error when init token", error);
    const { initDataRaw } = retrieveLaunchParamsDev();
    config.headers.authorization = `Bearer ${initDataRaw}`;
  }

  return config;
});

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    return Promise.reject(err);
  }
);

export default instance;
