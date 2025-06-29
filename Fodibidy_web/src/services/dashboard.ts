/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "../configs/axiosConfig"

const getRestaurantDashboard = async (range: 'today' | 'week' | 'month') => {
    console.log(range)
}
const getAdminDashboard = async (range: 'today' | 'week' | 'month') => {
    console.log(range)
}

export { getRestaurantDashboard, getAdminDashboard }