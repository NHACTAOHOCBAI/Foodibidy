import axiosInstance from "@/configs/axiosConfig"

const getRestaurant = async (page?: number, limit?: number) => {
    const res = await axiosInstance.get(`/restaurants?limit=${limit}&page=${page}`)
    return res.data.data
}

export { getRestaurant }