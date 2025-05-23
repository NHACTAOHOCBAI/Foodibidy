import axiosInstance from "@/configs/axiosConfig"

const getDish = async (page?: number, limit?: number) => {
    const res = await axiosInstance.get(`/dishes?limit=${limit}&page=${page}`)
    return res.data
}
const getDishByCategory = async (idCategory: string, page?: number, limit?: number) => {
    const res = await axiosInstance.get(`/dishes/category/${idCategory}?limit=${limit}&page=${page}`)
    console.log("getDishByCategory", res)
    return res.data
}
export { getDish, getDishByCategory }
