import axios from "axios";

import { BASE_URL, CLOUDINARY_NAME, MOCK_URL, USE_MOCK } from "../config/index";
import * as authService from "../services/auth-service";

import { history } from "./history";

// Criar uma instância personalizada do Axios
const api = axios.create({
  baseURL: USE_MOCK === false ? MOCK_URL : BASE_URL,
  timeout: 5000, // Timeout
});

// Adicionar interceptor de requisição para incluir headers, como autenticação
api.interceptors.request.use(
  (config) => {
    if (config.withCredentials) {
      const token = authService.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de resposta para lidar com erros globais, como 401 ou 403
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response || {};
    if (status === 401 || status === 403) {
      history.push("/forbidden");
    }
    return Promise.reject(error);
  }
);

// Função genérica para simular atraso em ambientes de mock
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Função para requisições gerais
export async function requestBackend(config) {
  if (USE_MOCK === true) {
    await delay(1000); // Atraso para mock
  }
  return api(config); // Usa a instância personalizada do Axios
}

// Requisições para Cloudinary
export function requestCloudinary(config) {
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}`;
  return axios({ ...config, baseURL: cloudinaryUrl });
}

export default api;
