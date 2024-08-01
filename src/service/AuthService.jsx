import axios from "axios";

const API_URL = "http://10.30.0.46:4040/v1/auth/";

const register = (username, password) => {
  return axios.post(`${API_URL}/register`, { username, password });
};

const login = (username, password) => {
  return axios
    .post(`${API_URL}/login`, { username, password })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

const refreshToken = () => {
  return axios
    .post(`${API_URL}/token`, { token: getRefreshToken() })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
      }
      return response.data;
    });
};

const AuthService = {
  register,
  login,
  logout,
  getAccessToken,
  getRefreshToken,
  refreshToken,
};
export default AuthService;
