import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://10.30.0.46:4040/v1";

const apiRequest = axios.create({
  baseURL: BASE_URL,
  headers: {},
  params: {},
});

apiRequest.interceptors.request.use((config) => {
  // console.log(config, "config");
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers["authorization"] = token;
  }
  return config;
});

apiRequest.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    if (err?.response?.status === 401) {
      const navigate = useNavigate();
      navigate("/v1/login");
    } else if (err.message === "Network Error") {
      console.log("Network Error");
    } else {
      console.log("Network error 2");
    }
    return Promise.reject(err);
  }
);

export default apiRequest;
