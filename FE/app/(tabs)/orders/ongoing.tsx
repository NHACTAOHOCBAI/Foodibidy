import Button from '@/components/Button';
import LazyFlatList from '@/components/LazyFlatList';
import { getOngoingOrders } from '@/services/order';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { View, ScrollView, FlatList, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'

const PAGE_SIZE = 4;
const Ongoing = () => {
    const fetchOngoingOrders = async (page: number) => {
        return await getOngoingOrders("FV6KteJ9KjODzkKHA998", page);
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


export default Ongoing