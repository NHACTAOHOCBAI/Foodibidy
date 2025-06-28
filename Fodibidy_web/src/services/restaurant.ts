import axiosInstance from "../configs/axiosConfig"

const getAllRestaurants = async () => {
    const res = await axiosInstance.get('/restaurants')
    return res.data.data as Restaurant[]
}
const deleteRestaurantById = async (id: string) => {
    return axiosInstance.delete(`/restaurants/${id}`)
}
const updateRestaurant = async (id: string, restaurantName: string, address: string, phoneNumber: string, bio: string, restaurantImage?: File) => {
    const formData = new FormData();
    formData.append('restaurantName', restaurantName);
    formData.append('address', address);
    formData.append('bio', bio);
    formData.append('phoneNumber', phoneNumber);
    if (restaurantImage) {
        formData.append('restaurantImage', restaurantImage);
    }
    return axiosInstance.put(`/restaurants/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}
export { getAllRestaurants, deleteRestaurantById, updateRestaurant }