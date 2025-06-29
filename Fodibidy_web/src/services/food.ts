import axiosInstance from "../configs/axiosConfig"

const createDish = async (
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
const restockDish = async (dish: Food, quantity: number) => {
    // Đảm bảo quantity là number và hợp lệ
    if (typeof quantity !== 'number' || isNaN(quantity)) {
        throw new Error('Quantity must be a valid number');
    }

    // Chuyển đổi remainingQuantity thành number
    let remainingQuantity: number;
    if (typeof dish.remainingQuantity === 'string') {
        // Chuyển từ string sang number
        remainingQuantity = parseFloat(dish.remainingQuantity);
        if (isNaN(remainingQuantity)) {
            throw new Error('Invalid remainingQuantity: cannot parse to number');
        }
    } else if (typeof dish.remainingQuantity === 'number' && !isNaN(dish.remainingQuantity)) {
        // Nếu đã là number hợp lệ
        remainingQuantity = dish.remainingQuantity;
    } else {
        // Mặc định là 0 nếu null, undefined, hoặc không hợp lệ
        remainingQuantity = 0;
    }

    // Cập nhật remainingQuantity
    remainingQuantity += quantity;

    // Log để kiểm tra
    console.log('Current remainingQuantity:', remainingQuantity);
    console.log('Type of remainingQuantity:', typeof remainingQuantity);
    console.log('Type of quantity:', typeof quantity);

    // Cập nhật dish.remainingQuantity
    dish.remainingQuantity = remainingQuantity;

    // Tạo FormData để gửi request
    const formData = new FormData();
    formData.append('remainingQuantity', remainingQuantity.toString());

    try {
        const response = await axiosInstance.put(`/dishes/${dish.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        console.error('Error restocking dish:', error);
        throw error;
    }
};

const getAllDish = async () => {
    const res = await axiosInstance.get(`/dishes`)
    return res.data.data as Food[]
}
export { createDish, deleteDishById, updateDish, getMyDish, restockDish, getAllDish }