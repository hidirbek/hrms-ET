import axios from "axios";
import authService from "./AuthService";

const apiClient = axios.create({
  baseURL: "http://10.30.0.46:4040/v1/auth/",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = authService.getAccessToken();
    console.log(token);
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const response = await authService.refreshToken();
      if (response.accessToken) {
        apiClient.defaults.headers.Authorization = response.accessToken;
        originalRequest.headers.Authorization = response.accessToken;
        return apiClient(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
