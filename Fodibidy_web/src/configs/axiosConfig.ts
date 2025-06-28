/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1";
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
});

// Flag để tránh gọi refresh nhiều lần song song
let isRefreshing = false;
let failedQueue: any[] = [];

// Hàm xử lý queue retry
const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Gắn accessToken nếu có
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Xử lý tự động refresh token nếu 401
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;

        // Kiểm tra lỗi 401 và chưa retry
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Nếu đang refresh, push promise vào queue
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers.Authorization = "Bearer " + token;
                        return axiosInstance(originalRequest);
                    })
                    .catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            // Gọi API refresh token
            return new Promise((resolve, reject) => {
                axios
                    .post(`${BASE_URL}/auth/refresh`, null, {
                        headers: {
                            // Ví dụ bạn lưu refreshToken trong localStorage
                            Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
                        },
                    })
                    .then(({ data }) => {
                        const newAccessToken = data.accessToken;
                        // Lưu lại accessToken mới
                        localStorage.setItem("accessToken", newAccessToken);

                        // Gửi lại các request đang chờ
                        processQueue(null, newAccessToken);

                        // Retry request ban đầu
                        originalRequest.headers.Authorization = "Bearer " + newAccessToken;
                        resolve(axiosInstance(originalRequest));
                    })
                    .catch(err => {
                        processQueue(err, null);
                        reject(err);
                    })
                    .finally(() => {
                        isRefreshing = false;
                    });
            });
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
