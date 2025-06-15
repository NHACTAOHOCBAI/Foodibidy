import { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import FoodItem from '@/components/FoodItem';
import { getMyFavouriteFood } from '@/services/favourite';

const BookMark = () => {
    const [favouriteFoods, setFavouriteFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyFavourite = async (page: number) => {
        try {
            console.log('Fetching favourite foods, page:', page);
            const data = await getMyFavouriteFood("FV6KteJ9KjODzkKHA998");
            setFavouriteFoods(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching favourite foods:', error);
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchMyFavourite(1);
            return () => {
                console.log('BookMark tab unfocused');
            };
        }, [])
    );

    const renderHeader = () => (
        <Text className='text-[17px] pt-[62px] pb-[32px] px-[24px]'>
            My Favourite Foods
        </Text>
    );

    const renderItem = ({ item }) => <FoodItem food={item} />;

    return (
        <View className='flex-1 bg-white'>
            <FlatList
                data={favouriteFoods}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={
                    <Text className='text-center text-[16px] text-gray-500'>
                        {loading ? 'Loading...' : 'No favourite foods found'}
                    </Text>
                }
                contentContainerStyle={{ paddingBottom: 20 }}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: 'space-between',
                    paddingHorizontal: 16,
                    marginVertical: 10, // Thêm khoảng cách dọc giữa các hàng
                }}
            />
        </View>
    );
};

export default BookMark;