import Button from '@/components/Button';
import { showErrorToast, showSuccessToast } from '@/components/Toast';
import { useMyAccount } from '@/context/MyAccountContext';
import { placeOrder } from '@/services/order';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Image, FlatList } from 'react-native';
import { useState } from 'react';

interface Address {
    typeName: string;
    addressName: string;
}

interface Order {
    dish: Food;
    quantity: number;
}

interface Food {
    id: string;
    dishName: string;
    dishImage?: string;
    price: number;
    restaurant: {
        id: string;
        restaurantName: string;
    };
}

interface MockData {
    restaurantId: string;
    restaurantName: string;
    foods: { dishId: string; dishName: string; price: number; quantity: number; dishImage: string }[];
}

const DetailOrder = () => {
    const { fullName, phoneNumber } = useMyAccount();
    const { data, deliveryAddress } = useLocalSearchParams();
    const orders = JSON.parse(data as string) as Order[];
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Convert orders to mock data for display
    const convertOrdersToMockData = (orders: Order[]): MockData[] => {
        const groupedByRestaurant = orders.reduce((acc, order) => {
            const { id: restaurantId, restaurantName } = order.dish.restaurant;
            if (!acc[restaurantId]) {
                acc[restaurantId] = {
                    restaurantId,
                    restaurantName,
                    foods: []
                };
            }
            acc[restaurantId].foods.push({
                dishId: order.dish.id,
                dishName: order.dish.dishName,
                price: order.dish.price,
                quantity: order.quantity,
                dishImage: order.dish.dishImage ?? ''
            });
            return acc;
        }, {} as Record<string, MockData>);

        return Object.values(groupedByRestaurant);
    };

    const mockData = convertOrdersToMockData(orders);
    const totalPrice = mockData.reduce(
        (sum, restaurant) =>
            sum + restaurant.foods.reduce((subSum, food) => subSum + food.price * food.quantity, 0),
        0
    );

    const orderData = {
        location: (JSON.parse(deliveryAddress as string) as Address).addressName,
        recipient: fullName,
        phone: phoneNumber,
    };

    const handlePlaceOrder = async () => {
        setIsLoading(true);
        const convertedData = mockData.map(restaurant => ({
            restaurant: {
                id: restaurant.restaurantId,
                restaurantName: restaurant.restaurantName
            },
            items: restaurant.foods.map(food => ({
                dish: {
                    id: food.dishId,
                    dishName: food.dishName,
                    price: food.price // Use individual price, not multiplied
                },
                quantity: food.quantity
            }))
        }));

        try {
            await placeOrder(orderData.location, convertedData);
            showSuccessToast('Order has been placed successfully!');
            router.push('/(tabs)'); // Redirect to home or another screen after success
        } catch {
            showErrorToast('Error when placing order');
        } finally {
            setIsLoading(false);
        }
    };

    const renderRestaurantItem = ({ item }: { item: MockData }) => (
        <View className="mb-5">
            <Text className="text-lg font-bold mb-2.5 text-gray-800">{item.restaurantName}</Text>
            {item.foods.map((food) => (
                <View key={food.dishId} className="flex-row items-center mb-2.5">
                    <Image
                        source={{ uri: food.dishImage || 'https://via.placeholder.com/150' }}
                        className="w-12 h-12 bg-gray-300 rounded-lg mr-2.5"
                    />
                    <View className="flex-1">
                        <Text className="text-base text-gray-700">{food.dishName} x{food.quantity}</Text>
                        <Text className="text-base font-bold text-orange-600">
                            ${(food.price * food.quantity).toFixed(2)}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    );

    return (
        <View className="flex-1 bg-white p-4 mt-[100px]">
            {/* Section: Delivery Address */}
            <View className="flex-row items-center mb-5 bg-gray-100 p-2.5 rounded-lg">
                <View className="w-6 h-6 justify-center items-center mr-2.5">
                    <Text className="text-base">📍</Text>
                </View>
                <View className="flex-1">
                    <Text className="text-base text-gray-700">{orderData.location}</Text>
                    <Text className="text-sm text-gray-500">{orderData.recipient} | {orderData.phone}</Text>
                </View>
            </View>

            {/* Section: Order Items */}
            <FlatList
                data={mockData}
                renderItem={renderRestaurantItem}
                keyExtractor={(item) => item.restaurantId}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                ListFooterComponent={() => <TotalPrice totalPrice={totalPrice} />}
            />
            <View className='mb-[100px]'>
                <Button
                    onPress={handlePlaceOrder}
                    title='Place Order'
                    size='large'
                    loading={isLoading}
                />
            </View>
        </View>
    );
};

const TotalPrice = ({ totalPrice }: { totalPrice: number }) => (
    <View className="flex-row justify-between items-center p-2.5 bg-gray-100 rounded-lg mt-5 mb-[200px]">
        <Text className="text-base text-gray-700">Total:</Text>
        <Text className="text-base font-bold text-orange-600">
            ${totalPrice.toFixed(2)}
        </Text>
    </View>
);

export default DetailOrder;