
import { useRouter } from 'expo-router';
import { View, Text, Image } from 'react-native';

const DetailOrder = () => {
    // Dữ liệu mẫu (có thể thay bằng state hoặc API)
    const orderData = {
        location: 'KTX Đại Học Quốc Gia TP.HCM - Khu B | Tô Vĩnh Diện, P.Định Hò, Đi An, Bình Dương',
        recipient: 'Phúc Nguyễn',
        phone: '0838609516',
        items: [
            {
                name: 'Bún Đậu Mắm Tôm Phỉ - Phổ Ám Thức Làng Vũ Đại',
                quantity: 2,
                price: 169000,
                image: 'https://via.placeholder.com/50', // Placeholder image, thay bằng URL thực tế
            },
        ],
        totalPrice: 169000,
    };

    return (
        <View className="flex-1 bg-white p-4 mt-[100px]">
            {/* Section: Thông tin địa chỉ */}
            <View className="flex-row items-center mb-5 bg-gray-100 p-2.5 rounded-lg">
                <View className="w-6 h-6 justify-center items-center mr-2.5">
                    <Text className="text-base">📍</Text>
                </View>
                <View className="flex-1">
                    <Text className="text-base text-gray-700">{orderData.location}</Text>
                    <Text className="text-sm text-gray-500">{orderData.recipient} | {orderData.phone}</Text>
                </View>
            </View>

            {/* Section: Thông tin món ăn */}
            <View className="mb-5">
                <Text className="text-lg font-bold mb-2.5 text-gray-800">
                    {orderData.items[0].name}
                </Text>
                <View className="flex-row items-center">
                    <Image
                        source={{ uri: orderData.items[0].image }}
                        className="w-12 h-12 bg-gray-300 rounded-lg mr-2.5"
                    />
                    <View className="flex-1">
                        <Text className="text-base text-gray-700">
                            Tên đổi ăn x{orderData.items[0].quantity}
                        </Text>
                        <Text className="text-base font-bold text-orange-600">
                            {orderData.items[0].price.toLocaleString()} đ
                        </Text>
                    </View>
                </View>
            </View>

            {/* Section: Tổng giá tiền */}
            <View className="flex-row justify-between items-center p-2.5 bg-gray-100 rounded-lg">
                <Text className="text-base text-gray-700">Total price:</Text>
                <Text className="text-base font-bold text-orange-600">
                    {orderData.totalPrice.toLocaleString()} đ
                </Text>
            </View>
        </View>
    );
};

export default DetailOrder;