import axiosInstance from "../configs/axiosConfig"

const getDishByRestaurant = async (idRestaurant: string, page?: number, limit?: number) => {
    const res = await axiosInstance.get(`/dishes/restaurant/${idRestaurant}?limit=${limit}&page=${page}`)
    return res
}
export { getDishByRestaurant }