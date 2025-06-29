import axiosInstance from "../configs/axiosConfig"

const getMyOrder = async () => {
    const res = await axiosInstance.get(`/orders/myOrders`)
    return res.data.data as Order[]
}
const updateOrder = async (id: string, value: { status: string; shipperName?: string; shipperPhone?: string }) => {
    const res = await axiosInstance.put(`/orders/${id}`, value)
    return res.data as Order[]
}
const geAllOrder = async () => {
    const res = await axiosInstance.get(`/orders`)
    return res.data.data as Order[]
}
const deleteOrder = async (id: string) => {
    const res = await updateOrder(id, { status: "cancelled" })
    return res
}
export { getMyOrder, updateOrder, geAllOrder, deleteOrder }