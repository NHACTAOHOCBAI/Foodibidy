import Button from '@/components/Button';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, ScrollView, FlatList, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'

const PAGE_SIZE = 4;
const ongoing = () => {
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [loadingMore, setLoadingMore] = useState(false);

    // Hàm load thêm dữ liệu
    const handleLoadMore = () => {
        if (visibleCount >= orders.length || loadingMore) return;

        setLoadingMore(true);

        // Mô phỏng delay tải dữ liệu (API call)
        setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, orders.length));
            setLoadingMore(false);
        }, 2000);
    };
    return (
        <View className='bg-white flex-1'>
            <ScrollView
                showsVerticalScrollIndicator={false}
                className='z-[1] px-[24px]'
                contentContainerStyle={{
                    paddingBottom: 400
                }}>
                <FlatList
                    className="py-[20px]"
                    data={orders.slice(0, visibleCount)} // Chỉ hiển thị phần tử từ 0 đến visibleCount
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ gap: 28 }}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <OrderItem order={item} />}

                    // Lazy loading props
                    onEndReached={handleLoadMore} // Gọi khi cuộn tới cuối danh sách
                    onEndReachedThreshold={0.8} // Khi cuộn đến 50% cuối danh sách
                    initialNumToRender={PAGE_SIZE} // Render ban đầu
                    maxToRenderPerBatch={PAGE_SIZE} // Tối đa render mỗi batch

                    ListFooterComponent={loadingMore ? (
                        <ActivityIndicator size="small" color="#999" style={{ marginVertical: 10 }} />
                    ) : null} // Hiển thị loader khi đang tải thêm
                />
            </ScrollView>
        </View>
    )
}

const OrderItem = ({ order }: { order: Order }) => {
    const router = useRouter();
    const orderTitle = order.food.map((value) => (
        `${value.foodName} (${value.quantity})`
    )).join(',')
    const orderQuantity = order.food.reduce((total, value) => (
        total + value.quantity
    ), 0)
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => router.push(`/foods/${order.id}`)}
        >
            <View className='pb-[16px] border-b-[1px] border-b-gray-100'>
                <Text className='text-[14px]'>
                    {order.restaurantName}
                </Text>
            </View>

            <View className='mt-[16px] flex-row items-center '>
                <View>
                    {order.food.length > 1 && <Image
                        source={{ uri: order.food[1].image ? order.food[1].image : undefined }}
                        className='bg-blue-200 absolute w-[60px] h-[60px] border-[1px] rounded-[8px] rotate-12'
                    />}
                    <Image
                        source={{ uri: order.food[0].image ? order.food[0].image : undefined }}
                        className='bg-accent w-[60px] h-[60px] rounded-[8px] border-[1px]'
                    />
                </View>

                <View className='ml-[14px] flex-1 gap-[10px]'>
                    <View className='flex-row justify-between' >
                        <Text className='text-[14px] font-medium'>{orderTitle}</Text>
                        <Text className='text-[#6B6E82] underline'>{`#${order.id}`}</Text>
                    </View>
                    <View className='flex-row gap-[14px]'>
                        <Text className='text-[14px] font-bold'>{`$${order.price}`}</Text>
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


export default ongoing