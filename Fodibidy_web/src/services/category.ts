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
    const formData = new FormData();
    formData.append('name', value.name);
    formData.append('description', value.description);

    if (value.image) {
        formData.append('cateImage', value.image);
    }
    const response = await axiosInstance.post('/categories', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response
};

export { getAllCategories, updateCategory, deleteCategoryById, createCategory }