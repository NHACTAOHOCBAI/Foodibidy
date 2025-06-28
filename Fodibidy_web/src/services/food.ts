import axiosInstance from "../configs/axiosConfig"

const createDish = async (
    category: { id: string; name: string },
    dishName: string,
    description: string,
    price: number,
    dishImage: File,
    remainingQuantity: number
) => {
    console.log(description)
    const formData = new FormData();
    formData.append('category', JSON.stringify(category));
    formData.append('dishName', dishName);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('dishImage', dishImage);
    formData.append('remainingQuantity', remainingQuantity.toString());
    return axiosInstance.post('/dishes', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
const updateDish = async (
    id: string,
    category: { id: string; name: string },
    dishName: string,
    description: string,
    price: number,
    dishImage: File,
    remainingQuantity: number
) => {
    const formData = new FormData();
    formData.append('category', JSON.stringify(category));
    formData.append('dishName', dishName);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('dishImage', dishImage);
    formData.append('remainingQuantity', remainingQuantity.toString());
    return axiosInstance.put(`/dishes/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

const deleteDishById = async (id: string) => {
    return axiosInstance.delete(`/dishes/${id}`)
}

const getMyDish = async () => {
    const res = await axiosInstance.get(`/dishes/myDishes`)
    return res.data.data as Food[]
}

export { createDish, deleteDishById, updateDish, getMyDish }