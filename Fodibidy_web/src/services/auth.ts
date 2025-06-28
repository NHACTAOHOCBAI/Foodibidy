
import axiosInstance from "../configs/axiosConfig"

const getMyProfile = async () => {
    const res = await axiosInstance.get('/auth/profile')
    console.log(res.data)
    return res.data
}

const login = async (email: string, password: string) => {
    const res = await axiosInstance.post('/auth/login', { email, password })
    return res.data
}

const logout = async () => {
    return await axiosInstance.post('/auth/logout')
}

const register = async (email: string, password: string, fullName: string) => {
    return await axiosInstance.post('/auth/register', { email, password, fullName })
}

const registerRestaurant = async (account: { email: string, password: string, fullName: string }, restaurant: { restaurantName: string, address: string, phoneNumber: string, bio: string }) => {
    const formData = new FormData();
    formData.append('restaurant', JSON.stringify(restaurant));
    formData.append('account', JSON.stringify(account));
    return await axiosInstance.post('/auth/registerRestaurantOwner', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}
export { login, logout, register, registerRestaurant, getMyProfile }