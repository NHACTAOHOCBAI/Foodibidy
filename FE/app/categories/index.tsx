
import { useData } from '@/context/DataContext';
import { Link } from 'expo-router';
import { MotiView } from 'moti'
import { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, Text, View } from 'react-native'
const PAGE_SIZE = 6;
const AllCategories = () => {
    const { categories } = useData();
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [loadingMore, setLoadingMore] = useState(false);

    // Hàm load thêm dữ liệu
    const handleLoadMore = () => {
        if (visibleCount >= categories.length || loadingMore) return;

        setLoadingMore(true);

        // Mô phỏng delay tải dữ liệu (API call)
        setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, categories.length));
            setLoadingMore(false);
        }, 2000);
    };

    return (
        <View className='pt-[120px] bg-white flex-1'>
            <ScrollView
                className='flex-1 z-[1] mt-[12px] px-[24px]'
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 400
                }}
            >
                <Text className="text-[#32343E] text-[20px]">Popular Foods</Text>

                <FlatList
                    className="py-[20px]"
                    data={categories.slice(0, visibleCount)} // Chỉ hiển thị phần tử từ 0 đến visibleCount
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ gap: 28 }}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    numColumns={2}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <CategoryItem
                            category={item}
                        />
                    )}

                    // Lazy loading props
                    onEndReached={handleLoadMore} // Gọi khi cuộn tới cuối danh sách
                    onEndReachedThreshold={0.8} // Khi cuộn đến 50% cuối danh sách
                    initialNumToRender={PAGE_SIZE} // Render ban đầu
                    maxToRenderPerBatch={PAGE_SIZE} // Tối đa render mỗi batch

                    ListFooterComponent={loadingMore ? (
                        <ActivityIndicator size="small" color="#999" style={{ marginVertical: 10 }} />
                    ) : null} // Hiển thị loader khi đang tải thêm
                />
            </ScrollView>
        </View>
    );
}

const CategoryItem = ({ category }: { category: Category }) => {
    return (
        <Link href={`/categories/${category.id}`} asChild>
            <Pressable>
                {({ pressed }) => (
                    <MotiView className='relative w-[160px] '
                        animate={{
                            scale: pressed ? 0.85 : 1,
                        }}
                        transition={{
                            type: 'timing',
                            duration: 100,
                        }}>
                        <View
                            style={{
                                boxShadow: " 0 1px 4px 0 rgba(0, 0, 0, 0.1)",
                            }}
                            className="w-full p-[8px] rounded-[12px] bg-transparent h-[200px]"
                        >
                            <Image
                                source={category.image ? { uri: category.image } : undefined}
                                className='w-full h-[84px] rounded-[12px] bg-accent'
                            />
                            <Text numberOfLines={1} className='font-bold mt-[15px] text-[15px]'>{category.name}</Text>
                            <Text numberOfLines={3} className='mt-[5px] text-[13px]'>{category.note}</Text>
                        </View>
                    </MotiView>
                )}
            </Pressable>
        </Link>
    )
}
export default AllCategories