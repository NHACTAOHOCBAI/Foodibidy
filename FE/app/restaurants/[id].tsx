import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from 'react-native'
import { icons } from '@/constants/icons';
import SuggestedItem from '@/components/SuggestedItem';
import { useState } from 'react';
import FoodItem from '@/components/FoodItem';
import { useLocalSearchParams } from 'expo-router';
import { useGetCatgoryByRestaurant } from '@/hooks/useCategory';
import { getDishByRestaurant } from '@/services/dish';
import LazyFlatList from '@/components/LazyFlatList';

const PAGE_SIZE = 4;
const RestaurantDetail = () => {
    const { data } = useLocalSearchParams();
    const restaurant = JSON.parse(data as string) as Restaurant;
    const { data: categories } = useGetCatgoryByRestaurant(restaurant.id)
    const fetchFoodsByRestaurant = async (page: number) => {
        return await getDishByRestaurant(restaurant.id, page, PAGE_SIZE);
    };

    const renderHeader = () => (
        <View
            className="bg-white"
        >
            <Image
                source={{ uri: restaurant.restaurantImage !== "" ? restaurant.restaurantImage : undefined }}
                className='bg-accent w- h-[400px] rounded-[20px]'
                resizeMode="cover" />
            <View className='p-[24px]'>
                <Text
                    numberOfLines={1}
                    className='font-bold text-[20px] w-full'>
                    {restaurant.restaurantName}
                </Text>

                <Text
                    style={{
                        lineHeight: 24,
                        marginTop: 15,
                        marginBottom: 35,
                    }}
                    className=' text-[14px] text-[#A0A5BA]' >{restaurant.bio}</Text>

                <View className='flex-row items-center gap-[24px]'>
                    <View className='flex-row items-center gap-[4px]'>
                        <Image
                            resizeMode='contain'
                            source={icons.star}
                            className='size-6'
                        />
                        <Text className='font-bold text-[16px]'>{restaurant.rating}</Text>
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
                data={categories}
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
            <Text className="text-[#32343E] text-[20px] px-[24px]">Popular Foods</Text>
        </View>
    );

    return (
        <LazyFlatList<Food>
            fetchData={fetchFoodsByRestaurant}
            pageSize={PAGE_SIZE}
            renderItem={({ item }) => <FoodItem food={item} />}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={renderHeader()}
        />
    );
}


export default RestaurantDetail
