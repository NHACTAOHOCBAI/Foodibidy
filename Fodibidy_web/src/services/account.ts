import axiosInstance from "../configs/axiosConfig"

const getAllAccounts = async () => {
    const res = await axiosInstance.get('/users')
    return res.data.data as Account[]
}
const deleteAccountById = async (id: string) => {
    return axiosInstance.delete(`/users/${id}`)
}
const updateAccount = async (id: string, value: { fullName: string, phoneNumber: string, avatar?: File }) => {
    console.log(id, value)
}
const createAccount = async (value: { email: string, fullName: string, phoneNumber: string, avatar?: File, role: string, password: string }) => {
    console.log(value)
};

export { getAllAccounts, deleteAccountById, updateAccount, createAccount }