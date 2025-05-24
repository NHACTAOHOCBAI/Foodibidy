import axiosInstance from "@/configs/axiosConfig"

const getCategory = async (page?: number, limit?: number) => {
    const res = await axiosInstance.get(`/categories?limit=${limit}&page=${page}`)
    return res.data
}
const getCategoryByRestaurant = async (restaurantId: string, page?: number, limit?: number) => {
    const res = await axiosInstance.get(`/categories/restaurantId/${restaurantId}?limit=${limit}&page=${page}`)
    return res.data
}
export { getCategory, getCategoryByRestaurant }