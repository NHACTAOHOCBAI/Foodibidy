// services/cart.ts
import axiosInstance from "@/configs/axiosConfig"

const addDishToCart = async (dishId: string, quantity: number) => {
    const res = await axiosInstance.put(`/carts`, {
        dishId,
        quantity,
    });
    return res.data;
};

const getMyCart = async (page?: number, limit?: number) => {
    const res = await axiosInstance.get(`/carts/myCart?limit=${limit}&page=${page}`)
    console.log("11111111111111111111111111111111111111111111111", res.data.data.dishes)
    return res.data.data.dishes
}

export { addDishToCart, getMyCart };
