import axiosInstance from "@/configs/axiosConfig"

const getMyFavouriteFood = async (accountId: string, page?: number, limit?: number) => {
    const res = await axiosInstance.get(`/userDish/${accountId}`)
    console.log(res.data)
    return res.data
}

const addFavouriteFood = async (userId: string, dishId: string) => {
    const res = await axiosInstance.post(`/userDish?`, { userId, dishId })
    return res.data
}
export { getMyFavouriteFood, addFavouriteFood }