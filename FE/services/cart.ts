// services/cart.ts
import axiosInstance from "@/configs/axiosConfig"

const addDishToCart = async (idAccount: string, dishId: string, quantity: number) => {
    const res = await axiosInstance.put(`/carts/${idAccount}`, {
        dishId,
        quantity,
    });
    return res.data;
};

const getMyCart = async (idAccount: string, page?: number, limit?: number) => {
    const res = await axiosInstance.get(`/carts/${idAccount}?limit=${limit}&page=${page}`)
}

export { addDishToCart, getMyCart };
