import Button from '@/components/Button';
import { showSuccessToast } from '@/components/Toast';
import { db } from '@/configs/firebaseConfig';
import { useMyAccount } from '@/context/MyAccountContext';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';

import { formatTimestamp } from '@/utils/formatTime';

const History = () => {
    const router = useRouter();
    const { id: userID } = useMyAccount();
    const [ordersData, setOrdersData] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Firestore real-time listener
    useEffect(() => {
        if (!userID) return; // Prevent query if userID is undefined
        setIsLoading(true);

        const ordersRef = collection(db, 'Order_details');
        console.log('User ID:', userID);

        const q = query(
            ordersRef,
            where('user.id', '==', userID),
            where('status', 'in', ['delivered', 'cancelled']) // Fixed 'cancel' to 'cancelled'
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const orders = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        ...data,
                        id: doc.id,
                        createdAt: formatTimestamp(data.createdAt), // Convert Timestamp to string
                        totalPrice: data.totalPrice || 0, // Use Firestore totalPrice if available
                    } as Order;
                });
                setOrdersData(orders);
                console.log('Orders Data:', orders);
                if (isLoading) {
                    showSuccessToast('Orders fetched successfully');
                }
                setIsLoading(false);
                setIsRefreshing(false);
            },
            (error) => {
                console.error('Error fetching orders:', error);
                setIsLoading(false);
                setIsRefreshing(false);
            }
        );

        return () => unsubscribe();
    }, [userID]);

    // Handle pull-to-refresh
    const onRefresh = useCallback(() => {
        setIsRefreshing(true);
        // Data will refresh automatically via onSnapshot
    }, []);

    // Refresh data when screen is focused
    useFocusEffect(
        useCallback(() => {
            // onSnapshot handles real-time updates, no need to refetch
        }, [])
    );

    const renderHeader = () => <View className="mt-[20px]" />;

    return (
        <View className="flex-1 bg-white">
            {isLoading && !ordersData.length ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={ordersData}
                    numColumns={1}
                    renderItem={({ item }) => <OrderItem order={item} />}
                    keyExtractor={(item) => item.id}
                    ListHeaderComponent={renderHeader()}
                    ListEmptyComponent={<Text className="text-center text-gray-500">No orders found.</Text>}
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                />
            )}
        </View>
    );
};

const OrderItem = ({ order }: { order: Order }) => {
    const router = useRouter();

    const orderTitle = order.items
        .slice(0, 2)
        .map((value) => `${value.dish.dishName} (${value.quantity})`)
        .join(', ') + (order.items.length > 2 ? '...' : '');

    const orderQuantity = order.items.reduce((total, value) => total + value.quantity, 0);

    const totalPrice = order.totalPrice || // Use Firestore totalPrice if available
        order.items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);

    const handleRebuy = () => {
        // Implement rebuy logic, e.g., create a new order with the same items
        console.log('Rebuy order:', order.id);
        // Example: router.push(`/create-order?orderId=${order.id}`);
    };

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => router.push(`/orders/${order.id}`)} // Aligned with Ongoing route
        >
            <View className="pb-[16px] border-b-[1px] border-b-gray-100">
                <Text className="text-[14px] font-medium">{order.restaurant.restaurantName}</Text>
                <Text className="text-[12px] text-gray-500">{order.createdAt}</Text>
            </View>

            <View className="mt-[16px] flex-row items-center">
                <View>
                    {order.items.length > 1 && (
                        <Image
                            source={{ uri: order.items[1].dish.dishImage || 'https://via.placeholder.com/150' }}
                            className="bg-blue-200 absolute w-[60px] h-[60px] border-[1px] rounded-[8px] rotate-12"
                        />
                    )}
                    <Image
                        source={{ uri: order.items[0]?.dish.dishImage || 'https://via.placeholder.com/150' }}
                        className="bg-accent w-[60px] h-[60px] rounded-[8px] border-[1px]"
                    />
                </View>

                <View className="ml-[14px] flex-1 gap-[10px]">
                    <View className="flex-row justify-between">
                        <Text className="text-[14px] font-medium" numberOfLines={2}>
                            {orderTitle || 'No items'}
                        </Text>
                    </View>
                    <View className="flex-row gap-[14px]">
                        <Text className="text-[14px] font-bold">${totalPrice.toFixed(2)}</Text>
                        <View className="w-[1px] h-full bg-gray-100" />
                        <Text className="text-[14px] text-[#6B6E82]">{`${orderQuantity} Item${orderQuantity !== 1 ? 's' : ''
                            }`}</Text>
                    </View>
                    <Text className="text-[12px] text-gray-500 capitalize">
                        {order.status} | {order.deliveryPhone || 'No phone'}
                    </Text>
                </View>
            </View>

            <View className="flex-row justify-between mt-[24px]">
                <Button title="Rebuy" size="small" outline={true} onPress={handleRebuy} />
            </View>
        </TouchableOpacity>
    );
};

interface Order {
    address: string;
    id: string; // Changed to string to match Firestore document ID
    user: Pick<Account, 'id' | 'fullName'>;
    restaurant: Pick<Restaurant, 'id' | 'restaurantName'>;
    status: 'pending' | 'preparing' | 'delivered' | 'cancelled';
    deliveryPhone?: string;
    items: {
        dish: Pick<Food, 'id' | 'dishName' | 'price' | 'dishImage'>;
        quantity: number;
    }[];
    totalPrice?: number; // Made optional to handle cases where it's not in Firestore
    createdAt: string;
}

interface Account {
    id: string;
    fullName: string;
}

interface Restaurant {
    id: string;
    restaurantName: string;
}

interface Food {
    id: string;
    dishName: string;
    price: number;
    dishImage: string;
}

export default History;