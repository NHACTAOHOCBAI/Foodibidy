
import FoodItem from '@/components/FoodItem';
import { useState } from 'react';

import { ActivityIndicator, FlatList, ScrollView, Text, View } from 'react-native'

const PAGE_SIZE = 6;
const BookMark = () => {
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [loadingMore, setLoadingMore] = useState(false);

    // Hàm load thêm dữ liệu
    const handleLoadMore = () => {
        if (visibleCount >= foods.length || loadingMore) return;

        setLoadingMore(true);

        // Mô phỏng delay tải dữ liệu (API call)
        setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, foods.length));
            setLoadingMore(false);
        }, 2000);
    };
    return (
        <View className=' bg-slate-100'>
            <Text className='text-[17px] bg-white px-[24px] pt-[62px] pb-[24px]'>Favorite Foods</Text>
            <ScrollView
                className='bg-white w-full h-full z-[1]'
                contentContainerStyle={{
                    paddingBottom: 400,
                    paddingHorizontal: 24
                }}>
                <FlatList
                    className="py-[20px]"
                    data={foods.slice(0, visibleCount)} // Chỉ hiển thị phần tử từ 0 đến visibleCount
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ gap: 28 }}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    numColumns={2}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <FoodItem food={item} />}

                    // Lazy loading props
                    onEndReached={handleLoadMore} // Gọi khi cuộn tới cuối danh sách
                    onEndReachedThreshold={0.8} // Khi cuộn đến 50% cuối danh sách
                    initialNumToRender={PAGE_SIZE} // Render ban đầu
                    maxToRenderPerBatch={PAGE_SIZE} // Tối đa render mỗi batch

                    ListFooterComponent={loadingMore ? (
                        <ActivityIndicator size="small" color="#999" style={{ marginVertical: 10 }} />
                    ) : null} // Hiển thị loader khi đang tải thêm
                />
            </ScrollView >
        </View >
    )
}


export default BookMark

