import axiosInstance from "@/configs/axiosConfig"

const getMyFavouriteFood = async (page?: number, limit?: number) => {
    const res = await axiosInstance.get(`/userDish/myFavoriteDishes`)
    console.log(res.data)
    return res.data.data
}

const addFavouriteFood = async (dishId: string) => {
    const res = await axiosInstance.post(`/userDish?`, { dishId })
    console.log(res.data)
    return res.data
}

const checkFavouriteFood = async (dishId: string) => {
    const res = await axiosInstance.post(`/userDish/checkDish`, { dishId })
    console.log(res.data)
    if (res.data.message === "User_dish not found")
        return false;
    return true;
}
export { getMyFavouriteFood, addFavouriteFood, checkFavouriteFood }