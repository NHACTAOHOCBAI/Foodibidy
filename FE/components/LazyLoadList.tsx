import { useState } from 'react';
import { View, ScrollView, FlatList, Text, ActivityIndicator } from 'react-native';

interface LazyLoadListProps<T> {
    data: T[];
    pageSize?: number;
    renderItem: ({ item }: { item: T }) => React.ReactElement;
    title?: string;
    itemKey: (item: T) => string | number;
    ListHeaderComponent?: React.ReactElement;
    ListFooterComponent?: React.ReactElement;
}

export function LazyLoadList<T>({
    data,
    pageSize = 6,
    renderItem,
    title,
    itemKey,
    ListHeaderComponent,
    ListFooterComponent
}: LazyLoadListProps<T>) {
    const [visibleCount, setVisibleCount] = useState(pageSize);
    const [loadingMore, setLoadingMore] = useState(false);

    const handleLoadMore = () => {
        if (visibleCount >= data.length || loadingMore) return;

        setLoadingMore(true);
        setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + pageSize, data.length));
            setLoadingMore(false);
        }, 1000); // giả lập delay
    };

    return (
        <View className='pt-[120px] bg-white flex-1'>
            <ScrollView
                className='flex-1 z-[1] mt-[12px] px-[24px]'
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 400 }}
            >
                {title && <Text className="text-[#32343E] text-[20px] mb-2">{title}</Text>}
                {ListHeaderComponent}

                <FlatList
                    data={data.slice(0, visibleCount)}
                    scrollEnabled={false}
                    contentContainerStyle={{ gap: 28, paddingVertical: 20 }}
                    keyExtractor={(item) => itemKey(item).toString()}
                    renderItem={renderItem}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.8}
                    initialNumToRender={pageSize}
                    maxToRenderPerBatch={pageSize}
                    ListFooterComponent={
                        loadingMore
                            ? <ActivityIndicator size="small" color="#999" style={{ marginVertical: 10 }} />
                            : ListFooterComponent
                    }
                />
            </ScrollView>
        </View>
    );
}
