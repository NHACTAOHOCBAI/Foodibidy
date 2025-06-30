/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "../configs/axiosConfig"

const getAdminDashboard = async () => {
    const res = await axiosInstance.get('/admin-dashboard')
    return res.data
}
const getRestaurantDashboard = async () => {
    const res = await axiosInstance.get('/restaurant-dashboard')
    return res.data
}

export { getRestaurantDashboard, getAdminDashboard }