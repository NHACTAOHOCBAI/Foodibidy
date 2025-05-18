import { Link, useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, Text, View } from 'react-native';
import { getCategoriesPaginated } from '@/services/mockAPI';
import { useRoute } from '@react-navigation/native';

const PAGE_SIZE = 6;

const AllCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const loadMoreCategories = async () => {
        if (loading || !hasMore) return;
        setLoading(true);

        const newCategories = await getCategoriesPaginated({ page, limit: PAGE_SIZE });

        setCategories(prev => [...prev, ...newCategories]);
        setHasMore(newCategories.length === PAGE_SIZE); // còn dữ liệu nếu số lượng đủ page size
        setPage(prev => prev + 1);
        setLoading(false);
    };

    useEffect(() => {
        loadMoreCategories();
    }, []);

    return (
        <View className='pt-[120px] bg-white flex-1 px-[24px]'>
            <Text className="text-[#32343E] text-[20px] mb-4">Popular Categories</Text>

            <FlatList
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={{ paddingBottom: 400, gap: 28 }}
                renderItem={({ item }) => <CategoryItem category={item} />}
                onEndReached={loadMoreCategories}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    loading ? <ActivityIndicator size="small" color="#999" style={{ marginVertical: 10 }} /> : null
                }
            />
        </View>
    );
};

const CategoryItem = ({ category }: { category: Category }) => {
    const router = useRouter();
    return (
        <Pressable onPress={() => router.push({
            pathname: '/categories/[id]',
            params: {
                id: category.id,
                name: category.name,
                description: category.description,
                image: category.image,
                createdAt: category.createdAt
            },
        })}>
            {({ pressed }) => (
                <MotiView
                    className='relative w-[160px]'
                    animate={{ scale: pressed ? 0.95 : 1 }}
                    transition={{ type: 'timing', duration: 100 }}
                >
                    <View className="w-full p-[8px] rounded-[12px] bg-white h-[200px] drop-shadow-sm">
                        <Image
                            source={category.image ? { uri: category.image } : undefined}
                            className='w-full h-[84px] rounded-[12px] bg-accent'
                        />
                        <Text numberOfLines={1} className='font-bold mt-[15px] text-[15px] '>
                            {category.name}
                        </Text>
                        <Text numberOfLines={3} className='mt-[5px] text-[13px]'>
                            {category.description}
                        </Text>
                    </View>
                </MotiView>
            )}
        </Pressable>
    );
};

export default AllCategories;
