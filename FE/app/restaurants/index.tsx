
import RestaurantItem from '@/components/RestaurantItem';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, Text, View } from 'react-native'
const PAGE_SIZE = 6;
const AllRestaurants = () => {
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
const restaurants: Restaurant[] = [
    {
        id: 1,
        name: 'Burger King',
        ownerName: 'John Smith',
        address: '123 King St, New York, NY',
        image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Burger_King_Logo.svg',
        rate: 4.5,
        categories: [
            { id: 1, name: 'Burger' },
            { id: 2, name: 'Fast Food' }
        ],
        description: 'Popular American fast food chain known for its flame-grilled burgers.',
        reviews: 1534
    },
    {
        id: 2,
        name: 'Sushi World',
        ownerName: 'Akira Tanaka',
        address: '88 Tokyo Ave, San Francisco, CA',
        image: 'https://images.unsplash.com/photo-1576402187875-4cd7e6fdb9f5',
        rate: 4.8,
        categories: [
            { id: 3, name: 'Sushi' },
            { id: 4, name: 'Japanese' }
        ],
        description: 'Authentic Japanese restaurant offering premium sushi and sashimi.',
        reviews: 987
    },
    {
        id: 3,
        name: 'Pizza Paradise',
        ownerName: 'Mario Rossi',
        address: '456 Pizza Rd, Chicago, IL',
        image: 'https://images.unsplash.com/photo-1601924582975-df24e517bbf8',
        rate: 4.2,
        categories: [
            { id: 5, name: 'Pizza' },
            { id: 6, name: 'Italian' }
        ],
        description: 'Serving classic Italian-style pizzas with a modern twist.',
        reviews: 746
    }
];
export default AllRestaurants