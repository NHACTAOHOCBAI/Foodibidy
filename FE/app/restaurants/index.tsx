
import RestaurantItem from '@/components/RestaurantItem';

import { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, Text, View } from 'react-native'
const PAGE_SIZE = 6;
const AllRestaurants = () => {
    const { restaurants } = useData();
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [loadingMore, setLoadingMore] = useState(false);

    // Hàm load thêm dữ liệu
    const handleLoadMore = () => {
        if (visibleCount >= restaurants.length || loadingMore) return;

        setLoadingMore(true);

        // Mô phỏng delay tải dữ liệu (API call)
        setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, restaurants.length));
            setLoadingMore(false);
        }, 2000);
    };

    return (
        <View className='pt-[120px] bg-white flex-1'>
            <ScrollView
                className='flex-1 z-[1] mt-[12px] px-[24px]'
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 400
                }}
            >
                <Text className="text-[#32343E] text-[20px]">Popular Restaurants</Text>

                <FlatList
                    className="py-[20px]"
                    data={restaurants.slice(0, visibleCount)} // Chỉ hiển thị phần tử từ 0 đến visibleCount
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ gap: 28 }}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <RestaurantItem
                            restaurant={item}
                        />
                    )}

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
    );
}
export default AllRestaurants