import Button from '@/components/Button';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, ScrollView, FlatList, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import moment from 'moment'
import { useData } from '@/context/DataContext';
const PAGE_SIZE = 4;
const History = () => {
    const { detailOrders } = useData();
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [loadingMore, setLoadingMore] = useState(false);

    // Hàm load thêm dữ liệu
    const handleLoadMore = () => {
        if (visibleCount >= detailOrders.length || loadingMore) return;

        setLoadingMore(true);

        // Mô phỏng delay tải dữ liệu (API call)
        setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, detailOrders.length));
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
                    data={detailOrders.slice(0, visibleCount)} // Chỉ hiển thị phần tử từ 0 đến visibleCount
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ gap: 28 }}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <OrderItem detailItem={item} />}

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

const OrderItem = ({ detailItem }: { detailItem: DetailOrder }) => {
    const router = useRouter();
    const receivedAt = moment(detailItem.receivedAt).format('DD MMM, HH:mm');


    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => router.push(`/foods/${detailItem.id}`)}
        >
            <View className='flex-row gap-[28px] pb-[16px] border-b-[1px] border-b-gray-100'>
                <Text className='text-[14px]'>
                    {detailItem.category}
                </Text>
                <Text className={`text-[14px] font-bold ${detailItem.status === "Canceled" ? "text-[#FF0000]" : "text-[#059C6A]"}`}>
                    {detailItem.status}
                </Text>
            </View>

            <View className='mt-[16px] flex-row items-center '>
                <Image
                    className='bg-accent w-[60px] h-[60px] rounded-[8px]'
                />

                <View className='ml-[14px] flex-1 gap-[10px]'>
                    <View className='flex-row justify-between' >
                        <Text className='text-[14px] font-bold'>{detailItem.foodName}</Text>
                        <Text className='text-[#6B6E82] underline'>{`#${detailItem.id}`}</Text>
                    </View>
                    <View className='flex-row gap-[14px]'>
                        <Text className='text-[14px] font-bold'>{`$${detailItem.price}`}</Text>
                        <View className='w-[1px] h-full bg-gray-100'></View>
                        <Text className='text-[14px] text-[#6B6E82]'>{receivedAt}</Text>
                        <View className='w-[1px] h-full bg-gray-100'></View>
                        <Text className='text-[14px] text-[#6B6E82]'>{`${detailItem.quantity} Items`}</Text>
                    </View>
                </View>
            </View>

            <View className='flex-row justify-between mt-[24px]'>
                <Button
                    title='Rate'
                    size='small'
                    outline={true}
                />
                <Button
                    title='Re-Order'
                    size='small'
                />
            </View>
        </TouchableOpacity>
    )
}

export default History