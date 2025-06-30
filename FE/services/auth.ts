// services/cart.ts
import axiosInstance from "@/configs/axiosConfig"

const login = async (email: string, password: string) => {
    const res = await axiosInstance.post('/auth/login', {
        email,
        password,
    });
    return res.data;
};

const register = async (email: string, password: string, fullName: string) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('fullName', fullName);
    console.log(formData)
    return await axiosInstance.post('/auth/register', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export { login, register };
