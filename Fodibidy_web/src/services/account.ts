import axiosInstance from "../configs/axiosConfig"

const getAllAccounts = async () => {
    const res = await axiosInstance.get('/users')
    return res.data.data as Account[]
}
const deleteAccountById = async (id: string) => {
    return axiosInstance.delete(`/users/${id}`)
}
const updateAccount = async (id: string, value: { fullName: string, phoneNumber: string, avatar?: File }) => {
    const formData = new FormData();
    formData.append('fullName', value.fullName);
    formData.append('phoneNumber', value.phoneNumber);
    if (value.avatar) {
        formData.append('avatar', value.avatar);
    }
    return axiosInstance.put(`/users/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}
const createAccount = async (value: { email: string, fullName: string, phoneNumber: string, avatar?: File, role: string, password: string }) => {
    const formData = new FormData();
    formData.append('email', value.email);
    formData.append('fullName', value.fullName);
    formData.append('phoneNumber', value.phoneNumber);
    if (value.avatar) {
        formData.append('avatar', value.avatar);
    }
    formData.append('role', value.role);
    formData.append('password', value.password);
    return axiosInstance.post(`/users`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export { getAllAccounts, deleteAccountById, updateAccount, createAccount }