import axiosInstance from "../configs/axiosConfig"

const getDishByRestaurant = async (idRestaurant: string, page?: number, limit?: number) => {
    const res = await axiosInstance.get(`/dishes/restaurant/${idRestaurant}?limit=${limit}&page=${page}`)
    return res
}
const createDish = (restaurant: { id: string, restaurantName: string, }, category: { id: string, name: string, }, dishName: string, description: string, price: string, dishImage?: string) => {
    axiosInstance.post('/dishes', {
        restaurant,
        category,
        dishName,
        description,
        price,
        dishImage
    })
}
export { getDishByRestaurant, createDish }