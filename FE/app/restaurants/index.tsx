
import LazyFlatList from '@/components/LazyFlatList';
import RestaurantItem from '@/components/RestaurantItem';
import { getRestaurant } from '@/services/restaurant';
import { Text, View } from 'react-native'

const PAGE_SIZE = 4;
const AllRestaurants = () => {
    const fetchRestaurants = async (page: number) => {
        return await getRestaurant(page, PAGE_SIZE);
    };
    const renderHeader = () => (
        <Text className="text-[#32343E] text-[20px] mb-4 pt-[100px] px-[24px]">Popular Restaurants</Text>
    );

    return (
        <View className='flex-1 bg-white'>
            <LazyFlatList<Restaurant>
                numColumns={1}
                fetchData={fetchRestaurants}
                pageSize={PAGE_SIZE}
                renderItem={({ item }) => <RestaurantItem restaurant={item} />}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={renderHeader()}
            />
        </View>
    );
}
export default AllRestaurants