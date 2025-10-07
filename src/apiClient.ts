import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/v1",
  timeout: 5000,
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    const reason = error instanceof Error ? error : new Error(String(error));
    console.error("Request Error:", reason.message);
    return Promise.reject(reason);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const reason = error instanceof Error ? error : new Error(String(error));
    console.error("Request Error:", reason.message);
    return Promise.reject(reason);
  }
);

export default apiClient;
