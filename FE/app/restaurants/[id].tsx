import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from 'react-native'
import { icons } from '@/constants/icons';
import SuggestedItem from '@/components/SuggestedItem';
import { useState } from 'react';
import FoodItem from '@/components/FoodItem';
import { useData } from '@/context/DataContext';
const PAGE_SIZE = 4;
const RestaurantDetail = () => {
    const { foods } = useData();
    return (
        <ScrollView
            className="bg-white"
            contentContainerStyle={{
                paddingBottom: 400
            }}
        >
            <Image
                source={{ uri: restaurantData.image !== "" ? restaurantData.image : undefined }}
                className='bg-accent w-full h-[400px] rounded-[20px]'
                resizeMode="cover" />
            <View className='p-[24px]'>
                <Text
                    numberOfLines={1}
                    className='font-bold text-[20px] w-full'>
                    {restaurantData.name}
                </Text>

                <Text
                    style={{
                        lineHeight: 24,
                        marginTop: 15,
                        marginBottom: 35,
                    }}
                    className=' text-[14px] text-[#A0A5BA]' >{restaurantData.description}</Text>

                <View className='flex-row items-center gap-[24px]'>
                    <View className='flex-row items-center gap-[4px]'>
                        <Image
                            resizeMode='contain'
                            source={icons.star}
                            className='size-6'
                        />
                        <Text className='font-bold text-[16px]'>{restaurantData.rate}</Text>
                    </View>
                    <View className='flex-row items-center gap-[9px]'>
                        <Image
                            resizeMode='contain'
                            source={icons.delivery}
                            className='size-6'
                        />
                        <Text className='text-[14px]'>Free</Text>
                    </View>
                </View>
            </View>

            <FlatList className='py-[24px] '
                data={restaurantData.categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    gap: 10,
                    paddingLeft: 24,
                    paddingRight: 40,
                }}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <SuggestedItem
                        type="categories"
                        categories={item}
                    />
                )}
            />

            {/* data */}
            <Foods foods={foods} />
        </ScrollView>
    )
}

const Foods = ({ foods }: { foods: Food[] }) => {
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
        <View className="mt-[12px] px-[24px]">
            <Text className="text-[#32343E] text-[20px]">Popular Foods</Text>

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
        </View>
    );
};

export default RestaurantDetail

const restaurantData: Restaurant = {
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
    reviews: 1534,
    status: "hoat_dong"
}