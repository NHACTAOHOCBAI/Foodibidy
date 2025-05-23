import FoodItem from '@/components/FoodItem';
import LazyFlatList from '@/components/LazyFlatList';
import { getFoodsByCategoryPaginated } from '@/services/mockAPI';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const PAGE_SIZE = 6;

const Category = () => {
    const { data } = useLocalSearchParams();
    const category = JSON.parse(data as string) as Category;

    const fetchFoods = async (page: number) => {
        return await getFoodsByCategoryPaginated({
            idCategory: category.id,
            page,
            limit: PAGE_SIZE,
        });
    };

    const renderHeader = () => (
        <View style={{ paddingTop: 100, backgroundColor: 'white', paddingHorizontal: 24 }}>
            <Text className='text-[24px] font-bold'>{category.name}</Text>
            <Image
                source={typeof category.image === 'string' ? { uri: category.image } : undefined}
                className='w-full h-[154px] mt-[10px] rounded-[12px] bg-accent'
            />
            <Text className='mt-[10px] px-[8px]'>{category.description}</Text>
            <Text className='text-[20px] text-[#32343E] mt-[16px]'>Popular Foods</Text>
        </View>
    );

    return (
        <LazyFlatList
            fetchData={fetchFoods}
            pageSize={PAGE_SIZE}
            renderItem={({ item }) => <FoodItem food={item} />}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={renderHeader()}
        />
    );
};

export default Category;
