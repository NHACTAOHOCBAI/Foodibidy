import axiosInstance from "@/configs/axiosConfig"

const getDish = async (page?: number, limit?: number) => {
    const res = await axiosInstance.get(`/dishes?limit=${limit}&page=${page}`)
    return res.data
}
const getDishByCategory = async (idCategory: string, page?: number, limit?: number) => {
    const res = await axiosInstance.get(`/dishes/category/${idCategory}?limit=${limit}&page=${page}`)
    return res.data
}
const getDishByRestaurant = async (idRestaurant: string, page?: number, limit?: number) => {
    const res = await axiosInstance.get(`/dishes/restaurant/${idRestaurant}?limit=${limit}&page=${page}`)
    return res.data
}
export { getDish, getDishByCategory, getDishByRestaurant }
