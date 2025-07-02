import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, TextInput, View, Text, ActivityIndicator, Image } from 'react-native';
import { debounce } from 'lodash';
import FoodItem from '@/components/FoodItem';
import { getDish } from '@/services/dish';
import { icons } from '@/constants/icons';

const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [foods, setFoods] = useState<Food[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchDishes = useCallback(async (query: string, pageNum: number) => {
        if (!hasMore && pageNum !== 1) return;

        try {
            setIsLoading(true);
            const data = await getDish(pageNum, 10, query);
            setFoods(prev => pageNum === 1 ? data : [...prev, ...data]);
            setHasMore(data.length === 10);
        } catch (error) {
            console.error('Error fetching dishes:', error);
        } finally {
            setIsLoading(false);
        }
    }, [hasMore]);

    const debouncedSearch = useCallback(
        debounce((query: string) => {
            setPage(1);
            fetchDishes(query, 1);
        }, 500),
        [fetchDishes]
    );

    useEffect(() => {
        debouncedSearch(searchQuery);
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchQuery, debouncedSearch]);

    const handleLoadMore = () => {
        if (!isLoading && hasMore) {
            setPage(prev => prev + 1);
            fetchDishes(searchQuery, page + 1);
        }
    };

    const renderItem = ({ item }: { item: Food }) => <FoodItem food={item} />;

    return (
        <View className="flex-1 bg-white p-4 pt-[120px]">
            <View
                className={`rounded-[10px] gap-[12px] px-[20px] w-full h-[65px] bg-[#F6F6F6] flex-row items-center `}>
                <Image
                    tintColor="#A0A5BA"
                    source={icons.search}
                    resizeMode="contain"
                    className="w-[15px] h-[15px]"
                />
                <TextInput

                    placeholder="Search for dishes..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            {isLoading && page === 1 ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#FF7622" />
                </View>
            ) : foods.length === 0 ? (
                <View className="flex-1 justify-center items-center">
                    <Text className="text-gray-500">No dishes found</Text>
                </View>
            ) : (
                <FlatList
                    className='mt-[10px]'
                    data={foods}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        isLoading && page > 1 ? (
                            <ActivityIndicator size="small" color="#FF7622" />
                        ) : null
                    }
                />
            )}
        </View>
    );
};

export default SearchScreen;