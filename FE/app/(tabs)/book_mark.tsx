import { useCallback, useRef } from 'react';
import { Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import FoodItem from '@/components/FoodItem';
import LazyFlatList from '@/components/LazyFlatList';
import { getMyFavouriteFood } from '@/services/favourite';

const PAGE_SIZE = 4; // Define page size for pagination

const BookMark = () => {
    // Fetch function for lazy loading
    const fetchMyFavourite = async (page: number) => {
        return await getMyFavouriteFood(page); // Assume getMyFavouriteFood accepts page param
    };

    // useFocusEffect to refetch on screen focus
    useFocusEffect(
        useCallback(() => {
            // Call loadInitial from LazyFlatList
            loadInitialRef.current();
        }, [])
    );

    // Ref to call loadInitial from LazyFlatList
    const loadInitialRef = useRef(() => { });

    const renderHeader = () => (
        <Text className='text-[17px] pt-[62px] pb-[32px] px-[24px]'>
            My Favourite Foods
        </Text>
    );

    return (
        <View className='flex-1 bg-white'>
            <LazyFlatList
                numColumns={2}
                fetchData={fetchMyFavourite}
                pageSize={PAGE_SIZE}
                renderItem={({ item }: { item: Food }) => <FoodItem food={item} />}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={renderHeader()}
                setLoadInitialRef={(ref) => (loadInitialRef.current = ref)}
            />
        </View>
    );
};

export default BookMark;