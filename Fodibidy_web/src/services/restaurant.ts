import axiosInstance from "../configs/axiosConfig"

const getAllRestaurants = async () => {
    const res = await axiosInstance.get('/restaurants')
    return res.data as Restaurant[]
}
const deleteRestaurantById = async (id: string) => {
    return axiosInstance.delete(`/restaurants/${id}`)
}
const createRestaurant = async (
    account: {
        email: string,
        password: string,
        fullName: string,
        phoneNumber: string
    },
    restaurant: {
        restaurantName: string,
        address: string,
        restaurantImage?: File,
        phoneNumber: string,
        bio: string
    }
) => {
    console.log(account, restaurant)
}
const updateRestaurant = async (id: string,
    restaurant: {
        restaurantName: string,
        address: string,
        restaurantImage?: File,
        phoneNumber: string,
        bio: string
    }) => {
    console.log(id, restaurant)
}
export { getAllRestaurants, deleteRestaurantById, createRestaurant, updateRestaurant }