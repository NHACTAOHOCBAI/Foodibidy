// services/cart.ts
import axiosInstance from "@/configs/axiosConfig"

const login = async (email: string, password: string) => {
    const res = await axiosInstance.post('/auth/login', {
        email,
        password,
    });
    return res.data;
};

const logout = async () => {
    const res = await axiosInstance.post('/auth/logout');
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


interface ImageFile {
    uri: string;
    name: string;
    type: string;
}

interface Address {
    typeName: string,
    addressName: string
}

const updateProfile = async ({
    fullName,
    phoneNumber,
    avatar,
    address,
}: {
    fullName?: string;
    phoneNumber?: string;
    avatar?: ImageFile;
    address?: Address[];
}) => {
    const formData = new FormData();
    if (fullName) {
        formData.append('fullName', fullName);
    }
    if (phoneNumber) {
        formData.append('phoneNumber', phoneNumber);
    }
    if (avatar) {
        formData.append('avatar', {
            uri: avatar.uri,
            name: avatar.name,
            type: avatar.type,
        } as any); // Ép kiểu để tương thích với FormData
    }
    if (address) {
        console.log(address)
        formData.append('address', JSON.stringify(address));
    }
    return await axiosInstance.put('auth/profile', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export { login, register, updateProfile, logout };
