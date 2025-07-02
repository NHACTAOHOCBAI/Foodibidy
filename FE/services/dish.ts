import axiosInstance from "@/configs/axiosConfig"

const getDish = async (page?: number, limit?: number, filter?: string) => {
    let url = `/dishes?limit=${limit}&page=${page}`
    if (filter)
        url += `&filter=${filter}`
    const res = await axiosInstance.get(url)
    return res.data.data
}
const getDishByCategory = async (idCategory: string, page?: number, limit?: number) => {
    const res = await axiosInstance.get(`/dishes/category/${idCategory}?limit=${limit}&page=${page}`)
    return res.data.data
}
const getDishByRestaurant = async (idRestaurant: string, page?: number, limit?: number) => {
    const res = await axiosInstance.get(`/dishes/restaurant/${idRestaurant}?limit=${limit}&page=${page}`)
    return res.data.data
}
export { getDish, getDishByCategory, getDishByRestaurant }
