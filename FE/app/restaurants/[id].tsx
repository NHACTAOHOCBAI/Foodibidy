import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, Text, View } from 'react-native'
import { icons } from '@/constants/icons';
import SuggestedItem from '@/components/SuggestedItem';
import { useState } from 'react';
import FoodItem from '@/components/FoodItem';
import { useLocalSearchParams } from 'expo-router';
import { useGetCatgoryByRestaurant } from '@/hooks/useCategory';
import { getDishByRestaurant } from '@/services/dish';
import LazyFlatList from '@/components/LazyFlatList';
import { MotiView } from 'moti';

const PAGE_SIZE = 4;
const RestaurantDetail = () => {
    const { data } = useLocalSearchParams();
    const restaurant = JSON.parse(data as string) as Restaurant;
    const { data: categories } = useGetCatgoryByRestaurant(restaurant.id, 1, 10)
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
                    className='font-bold text-[20px] w-full mb-[15px]'>
                    {restaurant.restaurantName}
                </Text>

                {restaurant.bio !== ""
                    ? <Text
                        style={{
                            lineHeight: 24,
                            marginBottom: 35,
                        }}
                        className=' text-[14px] text-[#A0A5BA]' >{restaurant.bio}</Text>
                    : ""}

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

            <FlatList className='pb-[24px]'
                data={categories as Category[]}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    gap: 10,
                    paddingLeft: 24,
                    paddingRight: 40,
                }}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    categoryItem({ category: item })
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

const categoryItem = ({ category }: { category: Category }) => {
    return (
        <Pressable
        // onPress={onPress}
        >
            {({ pressed }) => (
                <MotiView
                    className="border-[1px] border-gray-200 items-center rounded-full px-[8px] h-[46px] min-w-[70px] justify-center max-w-[130px] shadow-md"
                    style={{
                        boxShadow: " 0 1px 4px 0 rgba(0, 0, 0, 0.1)"
                    }}
                    animate={{
                        backgroundColor: pressed ? '#FFA57C' : '#FFFFFF',
                        scale: pressed ? 0.85 : 1,
                    }}
                    transition={{
                        type: 'timing',
                        duration: 100,
                    }}
                >
                    <Text numberOfLines={1} className='font-bold'>{category.name}</Text>

                </MotiView>
            )}
        </Pressable>

    )
}

export default RestaurantDetail
