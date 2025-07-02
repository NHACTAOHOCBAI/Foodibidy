import axios from "axios";
import { getToken } from "@/configs/accessTokent";

const BASE_URL = "http://10.0.116.0:3000/api/v1"; // Sửa lại IP này

const axiosInstance = axios.create({
  baseURL: BASE_URL, // URL gốc của API
  timeout: 10000, // Timeout sau 10 giây
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // Lấy accessToken từ AsyncStorage
    const token = await getToken();
    console.log(token);
    if (token) {
      // Thêm accessToken vào header Authorization
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Xử lý lỗi request
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Trả về dữ liệu từ response
    return response;
  },
  (error) => {
    // Xử lý lỗi response
    return Promise.reject(error.response ? error.response.data : error);
  }
);

export default axiosInstance;
