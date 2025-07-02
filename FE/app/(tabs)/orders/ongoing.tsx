import Button from '@/components/Button';
import LazyFlatList from '@/components/LazyFlatList';
import { getMyOngoingOrders } from '@/services/order';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { View, ScrollView, FlatList, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'

const PAGE_SIZE = 4;
const Ongoing = () => {
    const fetchOngoingOrders = async (page: number) => {
        return await getMyOngoingOrders(page);
    };

    const renderHeader = () => (
        <View className='mt-[20px]' />
    );

    // Thêm useFocusEffect để refetch khi focus
    useFocusEffect(
        useCallback(() => {
            // Gọi lại loadInitial từ LazyFlatList
            loadInitialRef.current(); // Sử dụng ref để gọi hàm loadInitial
        }, [])
    );

    // Tạo ref để gọi loadInitial từ LazyFlatList
    const loadInitialRef = useRef(() => { });

    return (
        <View className='flex-1 bg-white'>
            <LazyFlatList<Order>
                numColumns={1}
                fetchData={fetchOngoingOrders}
                pageSize={PAGE_SIZE}
                renderItem={({ item }) => <OrderItem order={item} />}
                keyExtractor={(item) => item.restaurant.id}
                ListHeaderComponent={renderHeader()}
                // Truyền ref để gọi loadInitial
                setLoadInitialRef={(ref) => (loadInitialRef.current = ref)}
            />
        </View>
    );
};
interface Order {
    address: string;
    id: number;
    user: Pick<Account, 'id' | 'fullName'>;
    restaurant: Pick<Restaurant, 'id' | 'restaurantName'>;
    status: 'pending' | 'preparing' | 'delivered' | 'cancelled';
    deliveryPhone?: string;
    items: {
        dish: Pick<Food, 'id' | 'dishName' | 'price' | 'dishImage'>;
        quantity: number;
    }[]
    createdAt: string
}
const OrderItem = ({ order }: { order: Order }) => {
    const router = useRouter();
    const [isCancelling, setIsCancelling] = useState(false);

    // Tính tổng giá
    const totalPrice = order.items.reduce(
        (sum, item) => sum + item.dish.price * item.quantity,
        0
    );

    // Tạo tiêu đề đơn hàng (giới hạn 2 món, thêm "..." nếu có nhiều hơn)
    const orderTitle = order.items
        .slice(0, 2)
        .map((value) => `${value.dish.dishName} (${value.quantity})`)
        .join(', ') + (order.items.length > 2 ? '...' : '');

    // Tính tổng số lượng món
    const orderQuantity = order.items.reduce((total, value) => total + value.quantity, 0);

    // Xử lý hủy đơn hàng
    // const handleCancel = async () => {
    //     if (order.status !== 'pending' && order.status !== 'preparing') {
    //         showErrorToast('Cannot cancel order: Already delivered or cancelled');
    //         return;
    //     }
    //     setIsCancelling(true);
    //     try {
    //         await cancelOrder(order.id);
    //         showSuccessToast('Order cancelled successfully');
    //     } catch {
    //         showErrorToast('Error cancelling order');
    //     } finally {
    //         setIsCancelling(false);
    //     }
    // };

    // Xử lý theo dõi đơn hàng
    const handleTrackOrder = () => {

    };

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => router.push(`/orders/${order.id}`)} // Sửa route từ /foods sang /orders
            disabled={order.status === 'cancelled'} // Vô hiệu hóa nếu đơn đã hủy
        >
            <View className='pb-[16px] border-b-[1px] border-b-gray-100'>
                <Text className='text-[14px] font-medium'>{order.restaurant.restaurantName}</Text>
                <Text className='text-[12px] text-gray-500'>{order.createdAt}</Text>
            </View>

            <View className='mt-[16px] flex-row items-center'>
                {order.items.length > 0 ? (
                    <Image
                        source={{ uri: order.items[0].dish.dishImage || 'https://via.placeholder.com/150' }}
                        className='w-[60px] h-[60px] rounded-[8px] border-[1px] border-gray-200'
                    />
                ) : (
                    <View className='w-[60px] h-[60px] rounded-[8px] bg-gray-200' />
                )}

                <View className='ml-[14px] flex-1 gap-[10px]'>
                    <View className='flex-row justify-between'>
                        <Text className='text-[14px] font-medium' numberOfLines={2}>
                            {orderTitle || 'No items'}
                        </Text>
                    </View>
                    <View className='flex-row gap-[14px]'>
                        <Text className='text-[14px] font-bold'>${totalPrice.toFixed(2)}</Text>
                        <View className='w-[1px] h-full bg-gray-100' />
                        <Text className='text-[14px] text-[#6B6E82]'>{`${orderQuantity} Item${orderQuantity !== 1 ? 's' : ''}`}</Text>
                    </View>
                    <Text className='text-[12px] text-gray-500 capitalize'>
                        {order.status}|{order.deliveryPhone}</Text>
                </View>
            </View>

            <View className='flex-row justify-between mt-[24px]'>
                <Button
                    title='Track Order'
                    size='small'
                    onPress={handleTrackOrder}

                />
                <Button
                    title='Cancel'
                    size='small'
                    outline={true}
                    // onPress={handleCancel}
                    loading={isCancelling}

                />
            </View>
        </TouchableOpacity>
    );
};


export default Ongoing