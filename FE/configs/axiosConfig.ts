import axios from 'axios';
const BASE_URL = "http://186.186.24.85:3000";  // Sửa lại IP này
const axiosInstance = axios.create({
    baseURL: BASE_URL,  // URL gốc của API
    timeout: 10000,
    withCredentials: true,                   // Timeout sau 10 giây
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});
// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error.response.data);
});

export default axiosInstance;
