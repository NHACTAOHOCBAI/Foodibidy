import SearchInput from '@/components/SearchInput'
import SuggestedItem from '@/components//SuggestedItem'
import { icons } from '@/constants/icons'
import { FlatList, ScrollView, Text, View, Image, ActivityIndicator, Pressable } from 'react-native'
import { useState } from 'react'
import FoodItem from '@/components/FoodItem'
import { Link, useRouter } from 'expo-router'
import { useGetRestaurant } from '@/hooks/useRestaurants'
const PAGE_SIZE = 4;
const SearchScreen = () => {
    const { data: restaurants } = useGetRestaurant()
    const handleSearch = (value: string) => {
        console.log(value)
    }
    return (
        <View className="bg-slate-300 flex-1">
            {/* <Header /> */}
            <Header
                handleSearch={handleSearch}
            />
            <ScrollView
                className='bg-white flex-1 z-[1]'
                contentContainerStyle={{
                    paddingBottom: 400
                }}>
                <RecentKeyword />
                <SuggestedRestaurant
                    restaurants={restaurants}
                /> *
                {/* <Foods foods={foods} />  */}
            </ScrollView>
        </View>
    )
}

const Header = ({ handleSearch }: any) => (
    <View className='pt-[123px] px-[24px] pb-[10px] bg-white'>
        <SearchInput
            handleSubmit={handleSearch}
            autoFocus={true}
            placeholder=' Search for food, groceries, drinks...' />
    </View>
)

const RecentKeyword = () => (
    <View className='pt-[24px]'>
        <Text className='text-[#32343E] text-[20px] px-[24px]'>Recent Keywords</Text>
        <FlatList className='py-[12px] '
            data={recentKeywords}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                gap: 10,
                paddingLeft: 24,
                paddingRight: 40,
            }}
            renderItem={({ item }) => (
                <SuggestedItem
                    type='recentKeywords'
                    recentKeywords={item}
                />
            )}
        />
    </View>
)

const SuggestedRestaurant = ({ restaurants }: { restaurants: Restaurant[] }) => (
    <View className='pt-[20px]  px-[24px]'>
        <Text className='text-[#32343E] text-[20px]'>Suggested Restaurants</Text>
        <FlatList className='py-[20px]'
            data={restaurants}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                gap: 14,
            }}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <SuggestedRestaurantItem
                    item={item}
                />
            )}
        />
    </View>
)

const SuggestedRestaurantItem = ({ item }: { item: Restaurant }) => {
    const router = useRouter();
    const onPress = () => router.push({
        pathname: '/restaurants/[id]',
        params: {
            id: item.id,
            data: JSON.stringify(item),
        },
    })
    return (
        <Pressable onPress={onPress}>
            <View className='flex-row gap-[10px] pb-[14px] w-full border-b-[1px] border-b-[#EBEBEB]'>
                <Image
                    className='bg-accent w-[60px] h-[50px] rounded-[8px]'
                />
                <View className='gap-[6px] flex-1' >
                    <Text
                        numberOfLines={1}
                        className='text-[16px]'>
                        {item.restaurantName}
                    </Text>
                    <View className='flex-row gap-[2px] items-center'>
                        <Image
                            resizeMode='contain'
                            source={icons.star}
                            className='w-7 h-5'
                        />
                        <Text className='text-[16px]'>{item.rating}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

// const Foods = ({ foods }: { foods: Food[] }) => {
//     const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
//     const [loadingMore, setLoadingMore] = useState(false);

//     // Hàm load thêm dữ liệu
//     const handleLoadMore = () => {
//         if (visibleCount >= foods.length || loadingMore) return;

//         setLoadingMore(true);

//         // Mô phỏng delay tải dữ liệu (API call)
//         setTimeout(() => {
//             setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, foods.length));
//             setLoadingMore(false);
//         }, 2000);
//     };

//     return (
//         <View className="mt-[12px] px-[24px]">
//             <Text className="text-[#32343E] text-[20px]">Popular Foods</Text>

//             <FlatList
//                 className="py-[20px]"
//                 data={foods.slice(0, visibleCount)} // Chỉ hiển thị phần tử từ 0 đến visibleCount
//                 scrollEnabled={false}
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={{ gap: 28 }}
//                 columnWrapperStyle={{ justifyContent: 'space-between' }}
//                 numColumns={2}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => <FoodItem food={item} />}

//                 // Lazy loading props
//                 onEndReached={handleLoadMore} // Gọi khi cuộn tới cuối danh sách
//                 onEndReachedThreshold={0.8} // Khi cuộn đến 50% cuối danh sách
//                 initialNumToRender={PAGE_SIZE} // Render ban đầu
//                 maxToRenderPerBatch={PAGE_SIZE} // Tối đa render mỗi batch

//                 ListFooterComponent={loadingMore ? (
//                     <ActivityIndicator size="small" color="#999" style={{ marginVertical: 10 }} />
//                 ) : null} // Hiển thị loader khi đang tải thêm
//             />
//         </View>
//     );
// };
export default SearchScreen
// data
const recentKeywords = [
    "Burger",
    "Sandwich",
    "Pizza",
    "Burger",
    "Sandwich",
    "Pizza",
    "Burger",
    "Sandwich",
    "Pizza"
]

