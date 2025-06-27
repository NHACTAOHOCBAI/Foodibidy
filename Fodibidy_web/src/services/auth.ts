import axios from "axios";
import axiosInstance from "../configs/axiosConfig"


const login = async (email: string, password: string) => {
    const returnSecureToken = true;
    const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAVILF-mEhw1cJdCpRGVBavDusJtBrB_xQ', { email, password, returnSecureToken })
    return res
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
export { login, logout, register, registerRestaurant }