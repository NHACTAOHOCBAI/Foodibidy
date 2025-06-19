
import Button from '@/components/Button';
import { useOrder } from '@/context/OrderContext';
import { useRouter } from 'expo-router';
import { View, Text, Image, FlatList } from 'react-native';
interface MockDataFood {
    id: string
    dishImage: string;
    dishName: string;
    quantity: number;
    price: number;
}

interface MockData {
    id: string
    restaurantName: string;
    foods: MockDataFood[];
}
export const convertOrdersToMockData = (initialOrders: Food[]): MockData[] => {
    // Handle empty input
    if (!initialOrders || initialOrders.length === 0) {
        return [];
    }

    // Group foods by restaurant.id
    const groupedByRestaurant: Record<string, { restaurantName: string; foods: MockDataFood[] }> = initialOrders.reduce(
        (acc, food) => {
            const restaurantId = food.restaurant.id;
            const foodItem: MockDataFood = {
                id: food.id,
                dishImage: food.dishImage,
                dishName: food.dishName,
                quantity: 1, // Default quantity as per mockData example
                price: food.price,
            };

            if (!acc[restaurantId]) {
                acc[restaurantId] = {
                    restaurantName: food.restaurant.restaurantName,
                    foods: [],
                };
            }
            acc[restaurantId].foods.push(foodItem);
            return acc;
        },
        {} as Record<string, { restaurantName: string; foods: MockDataFood[] }>
    );

    // Convert grouped data to MockData format
    return Object.entries(groupedByRestaurant).map(([id, { restaurantName, foods }]) => ({
        id,
        restaurantName,
        foods,
    }));
};
const DetailOrder = () => {
    const { orders, setOrders } = useOrder();
    const router = useRouter();

    const mockData = convertOrdersToMockData(orders);
    const totalPrice = mockData.reduce(
        (sum, restaurant) =>
            sum + restaurant.foods.reduce((subSum, food) => subSum + food.price * food.quantity, 0),
        0
    );

    const orderData = {
        location: 'KTX Đại Học Quốc Gia TP.HCM - Khu B | Tô Vĩnh Diện, P.Định Hò, Đi An, Bình Dương',
        recipient: 'Phúc Nguyễn',
        phone: '0838609516',
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
            <FlatList
                data={mockData}
                renderItem={renderRestaurantItem}
                keyExtractor={(item) => item.restaurantName}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                ListFooterComponent={() => <TotalPrice totalPrice={totalPrice} />}
            />
            <View className='mb-[100px]'>
                <Button
                    // onPress={handlePlaceOrder}
                    title='Place order'
                    size='large'
                />
            </View>
        </View>
    );
};
const TotalPrice = ({ totalPrice }: { totalPrice: number }) => <View className="flex-row justify-between items-center p-2.5 bg-gray-100 rounded-lg mt-5 mb-[200px]">
    <Text className="text-base text-gray-700">Total price:</Text>
    <Text className="text-base font-bold text-orange-600">
        {totalPrice.toLocaleString()} đ
    </Text>
</View>
const renderRestaurantItem = ({ item }: { item: MockData }) => (
    <View className="mb-5">
        <Text className="text-lg font-bold mb-2.5 text-gray-800">{item.restaurantName}</Text>
        {item.foods.map((food, index) => (
            <View key={index} className="flex-row items-center mb-2.5">
                <Image
                    source={{ uri: food.dishImage }}
                    className="w-12 h-12 bg-gray-300 rounded-lg mr-2.5"
                />
                <View className="flex-1">
                    <Text className="text-base text-gray-700">{food.dishName} x{food.quantity}</Text>
                    <Text className="text-base font-bold text-orange-600">
                        {(food.price * food.quantity).toLocaleString()} đ
                    </Text>
                </View>
            </View>
        ))}
    </View>
);
export default DetailOrder;