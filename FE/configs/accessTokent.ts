import AsyncStorage from '@react-native-async-storage/async-storage';

// Lưu accessToken
const storeToken = async (token: string) => {
    try {
        await AsyncStorage.setItem('accessToken', token);
    } catch (error) {
        console.error('Lỗi khi lưu token:', error);
    }
};

// Lấy accessToken
const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        return token;
    } catch (error) {
        console.error('Lỗi khi lấy token:', error);
        return null;
    }
};
export { storeToken, getToken }