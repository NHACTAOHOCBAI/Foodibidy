import axiosInstance from "@/configs/axiosConfig"

const getMyHistoryOrders = async (page?: number, limit?: number) => {
    const res = await axiosInstance.get(`/orders/myHistoryOrders?limit=${limit}&page=${page}`)
    return res.data.data
}
const getMyOngoingOrders = async (page?: number, limit?: number) => {
    const res = await axiosInstance.get(`/orders/myOngoingOrders?limit=${limit}&page=${page}`)
    return res.data.data
}
const placeOrder = async (address: string, order: any) => {
    const res = await axiosInstance.post(`/orders`, { address, order })
    return res.data
}
export { getMyOngoingOrders, getMyHistoryOrders, placeOrder }