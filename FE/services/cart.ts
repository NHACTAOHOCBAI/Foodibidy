// services/cart.ts
import axiosInstance from "@/configs/axiosConfig"

const addDishToCart = async (idCart: string, dishId: string, quantity: number) => {
    const res = await axiosInstance.put(`/carts/${idCart}`, {
        dishId,
        quantity,
    });
    return res.data;
};

const getMyCart = async (idCart: string, page?: number, limit?: number) => {
    const res = await axiosInstance.get(`/carts/${idCart}?limit=${limit}&page=${page}`)
}

export { addDishToCart, getMyCart };
