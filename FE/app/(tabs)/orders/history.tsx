import Button from '@/components/Button';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useRef } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { getMyHistoryOrders } from '@/services/order';
import LazyFlatList from '@/components/LazyFlatList';
interface DetailOrder {
    id: string;
    foodName: string;
    price: number;
    quantity: number;
    status: string;
    receivedAt: string;
}
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
    totalPrice: number;
    createdAt: string
}

const PAGE_SIZE = 4;
const History = () => {
    const fetchHistoryOrders = async (page: number) => {
        return await getMyHistoryOrders(page); // Assume getHistoryOrders supports pagination
    };

    const renderHeader = () => (
        <View className='mt-[20px]' /> // Consistent with Ongoing's header
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
                fetchData={fetchHistoryOrders}
                pageSize={PAGE_SIZE} // Assume PAGE_SIZE is defined elsewhere
                renderItem={({ item }) => <OrderItem order={item} />} // Assume OrderItem accepts order prop
                keyExtractor={(item) => item.id.toString()} // Adjust keyExtractor to use order id
                ListHeaderComponent={renderHeader()}
                setLoadInitialRef={(ref) => (loadInitialRef.current = ref)}
            />
        </View>
    );
};

const OrderItem = ({ order }: { order: Order }) => {
    const router = useRouter();
    const orderTitle = order.items.map((value) => (
        `${value.dish.dishName} (${value.quantity})`
    )).join(',')
    const orderQuantity = order.items.reduce((total, value) => (
        total + value.quantity
    ), 0)
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => router.push(`/foods/${order.id}`)}
        >
            <View className='pb-[16px] border-b-[1px] border-b-gray-100'>
                <Text className='text-[14px]'>
                    {order.restaurant.restaurantName}
                </Text>
            </View>

            <View className='mt-[16px] flex-row items-center '>
                <View>
                    {order.items.length > 1 && <Image
                        source={{ uri: order.items[1].dish.dishImage ? order.items[1].dish.dishImage : undefined }}
                        className='bg-blue-200 absolute w-[60px] h-[60px] border-[1px] rounded-[8px] rotate-12'
                    />}
                    <Image
                        source={{ uri: order.items[0].dish.dishImage ? order.items[0].dish.dishImage : undefined }}
                        className='bg-accent w-[60px] h-[60px] rounded-[8px] border-[1px]'
                    />
                </View>

                <View className='ml-[14px] flex-1 gap-[10px]'>
                    <View className='flex-row justify-between' >
                        <Text className='text-[14px] font-medium'>{orderTitle}</Text>
                    </View>
                    <View className='flex-row gap-[14px]'>
                        <Text className='text-[14px] font-bold'>{`$${order.totalPrice}`}</Text>
                        <View className='w-[1px] h-full bg-gray-100'></View>
                        <Text className='text-[14px] text-[#6B6E82]'>{`${orderQuantity} Items`}</Text>
                    </View>
                </View>
            </View>

            <View className='flex-row justify-between mt-[24px]'>
                <Button
                    title='Track Order'
                    size='small'
                />
                <Button
                    title='Cancel'
                    size='small'
                    outline={true}
                />
            </View>
        </TouchableOpacity>
    )
}

export default History