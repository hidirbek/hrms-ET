import axios from "axios";

// const API_URL = "https://hrms-et-back.vercel.app/v1/auth";
const API_URL = "http://10.30.0.46:4040/v1/auth";

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

const sendEmailResetCode = (email) => {
  return axios.post(`${API_URL}/send-reset-code`, { email });
};
// Function to send the reset code to the user's email

const verifyResetCode = (email, code) => {
  return axios.post(`${API_URL}/verify-reset-code`, { email, code });
};
// Function to verify the confirmation code

const resetPassword = (email, newPassword) => {
  return axios.post(`${API_URL}/reset-password`, {
    email,
    password: newPassword,
  });
};
// Function to reset the password

const AuthService = {
  register,
  login,
  logout,
  getAccessToken,
  getRefreshToken,
  refreshToken,
  sendEmailResetCode,
  verifyResetCode,
  resetPassword,
};
export default AuthService;
