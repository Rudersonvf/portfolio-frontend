import axios from "axios";
import { BASE_URL, USE_MOCK, MOCK_URL, CLOUDINARY_NAME } from "../config/index";
import { history } from "./history";
import * as authService from "../services/auth-service.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function requestBackend(config) {
  if (USE_MOCK === true) {
    await delay(1000);
  }

  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: "Bearer " + authService.getAccessToken(),
      }
    : config.headers;

  return axios({
    ...config,
    baseURL: USE_MOCK === true ? MOCK_URL : BASE_URL,
    headers,
  });
}

export function requestCloudinary(config) {
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}`;

  return axios({ ...config, baseURL: cloudinaryUrl });
}

//REQUEST INTERCECPTOR
axios.interceptors.request.use(
  function (config) {
    // DO SOMETHING BEFORE REQUEST IS SENT
    return config;
  },
  function (error) {
    // DO SOMETHING WITH REQUEST ERROR
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR
axios.interceptors.response.use(
  function (response) {
    //DO SOMETHING WITH RESPONSE DATA IF STATUS IS 2XX
    return response;
  },
  function (error) {
    // DO SOMETHING WITH REQUEST ERROR
    if (error.response.status === 401) {
      history.push("/login");
    }
    if (error.response.status === 403) {
      history.push("/catalog");
    }

    return Promise.reject(error);
  }
);
