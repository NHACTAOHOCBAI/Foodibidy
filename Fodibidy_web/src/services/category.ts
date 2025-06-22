import axiosInstance from "../configs/axiosConfig"

const getAllCategories = async () => {
    const res = await axiosInstance.get('/categories')
    return res.data
}
const deleteCategoryById = async (id: string) => {
    return axiosInstance.delete(`/categories/${id}`)
}
const updateCategory = async (id: string, value: { image?: File, name: string, description: string }) => {
    console.log(id, value)
}
const createCategory = async (value: { image?: File, name: string, description: string }) => {
    console.log(value)
}
export { getAllCategories, updateCategory, deleteCategoryById, createCategory }