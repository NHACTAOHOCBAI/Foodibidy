
import FoodItem from '@/components/FoodItem';
import LazyFlatList from '@/components/LazyFlatList';
import { getMyFavouriteFood } from '@/services/favourite';

import { Text, View } from 'react-native'

const PAGE_SIZE = 6;
const BookMark = () => {
    const fetchMyFavourite = async (page: number) => {
        return await getMyFavouriteFood("FV6KteJ9KjODzkKHA998", page, PAGE_SIZE)
    };

    const renderHeader = () => (
        <Text className='text-[17px] pt-[62px] pb-[32px] px-[24px]'>My Favourite Foods</Text>
    );

    return (
        <View className='flex-1 bg-white'>
            <LazyFlatList<Food>
                fetchData={fetchMyFavourite}
                pageSize={PAGE_SIZE}
                renderItem={({ item }) => <FoodItem food={item} />}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={renderHeader()}
            />
        </View>
    );
}


export default BookMark

