import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/v1",
  timeout: 5000,
});

apiClient.interceptors.request.use(
  (config) => {
    console.log("Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("Request Error:", error.message);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log("Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error(" Response Error:", error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
