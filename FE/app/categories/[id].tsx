import FoodItem from '@/components/FoodItem';
import { getFoodsByCategoryPaginated } from '@/services/mockAPI';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const PAGE_SIZE = 6;

const Category = () => {
    const { id, name, image, description } = useLocalSearchParams();
    const idCategory = parseInt(id as string);

    const [foods, setFoods] = useState<Food[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    const loadFoods = async () => {
        if (!hasMore || loadingMore) return;

        setLoadingMore(true);

        const newFoods = await getFoodsByCategoryPaginated({
            idCategory,
            page,
            limit: PAGE_SIZE,
        });

        setFoods(prev => [...prev, ...newFoods]);
        setPage(prev => prev + 1);
        setHasMore(newFoods.length === PAGE_SIZE);
        setLoadingMore(false);
    };

    useEffect(() => {
        loadFoods();
    }, [idCategory]);

    const renderHeader = () => (
        <View style={{ paddingTop: 100, backgroundColor: 'white', paddingHorizontal: 24 }}>
            <Text className='text-[24px] font-bold'>{name}</Text>
            <Image
                source={typeof image === 'string' ? { uri: image } : undefined}
                className='w-full h-[154px] mt-[10px] rounded-[12px] bg-accent'
            />
            <Text className='mt-[10px] px-[8px]'>{description}</Text>
            <Text className='text-[20px] text-[#32343E] mt-[16px]'>Popular Foods</Text>
        </View>
    );

    return (
        <FlatList
            data={foods}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 24 }}
            contentContainerStyle={{ paddingBottom: 400, gap: 20, backgroundColor: "white" }}
            renderItem={({ item }) => <FoodItem food={item} />}
            onEndReached={loadFoods}
            onEndReachedThreshold={0.5}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={
                loadingMore ? <ActivityIndicator size="small" color="#999" style={{ marginVertical: 10 }} /> : null
            }
        />
    );
};

export default Category;
