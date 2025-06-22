import axiosInstance from "../configs/axiosConfig"

const getDishByRestaurant = async (idRestaurant: string, page?: number, limit?: number) => {
    const res = await axiosInstance.get(`/dishes/restaurant/${idRestaurant}?limit=${limit}&page=${page}`)
    return res.data as Food[]
}
const createDish = async (
    restaurant: { id: string; restaurantName: string },
    category: { id: string; name: string },
    dishName: string,
    description: string,
    price: number,
    dishImage: File
) => {
    const formData = new FormData();
    formData.append('restaurant', JSON.stringify(restaurant));
    formData.append('category', JSON.stringify(category));
    formData.append('dishName', dishName);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('dishImage', dishImage);
    return axiosInstance.post('/dishes', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
const updateDish = async (
    id: string,
    restaurant: { id: string; restaurantName: string },
    category: { id: string; name: string },
    dishName: string,
    description: string,
    price: number,
    dishImage: File
) => {
    console.log(id, restaurant, category, dishImage, dishName, description, price)
};
const deleteDishById = async (id: string) => {
    return axiosInstance.delete(`/dishes/${id}`)
}
export { getDishByRestaurant, createDish, deleteDishById, updateDish }