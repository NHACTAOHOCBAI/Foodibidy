import axiosInstance from "@/configs/axiosConfig"

const getOngoingOrders = async (accountId: string, page?: number, limit?: number) => {
    const res = await axiosInstance.get(`/orders/Ongoing/${accountId}?limit=${limit}&page=${page}`)
    return res.data
}
const getHistoryOrders = async (accountId: string, page?: number, limit?: number) => {
    const res = await axiosInstance.get(`/orders/history/${accountId}?limit=${limit}&page=${page}`)
    return res.data
}
export { getOngoingOrders, getHistoryOrders }