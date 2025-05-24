import { ActivityIndicator, FlatList, View } from 'react-native';
import { useEffect, useState } from 'react';

interface LazyFlatListProps<T> {
    fetchData: (page: number) => Promise<T[]>;
    pageSize: number;
    renderItem: ({ item }: { item: T }) => JSX.Element;
    keyExtractor: (item: T) => string;
    ListHeaderComponent?: JSX.Element;
    numColumns?: number;
}

function LazyFlatList<T>({
    fetchData,
    pageSize,
    renderItem,
    keyExtractor,
    ListHeaderComponent,
    numColumns = 2,
}: LazyFlatListProps<T>) {
    const [data, setData] = useState<T[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    const loadInitial = async () => {
        setLoading(true);
        const newData = await fetchData(1);
        setData(newData);
        setHasMore(newData.length === pageSize);
        setPage(2);
        setLoading(false);
    };

    const loadMore = async () => {
        if (!hasMore || loadingMore || loading) return;
        setLoadingMore(true);
        const newData = await fetchData(page);
        setData((prev) => [...prev, ...newData]);
        setPage((prev) => prev + 1);
        setHasMore(newData.length === pageSize);
        setLoadingMore(false);
    };

    useEffect(() => {
        loadInitial();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#999" />
            </View>
        );
    }

    return (
        <FlatList
            data={data}
            keyExtractor={keyExtractor}
            numColumns={numColumns}
            columnWrapperStyle={numColumns > 1 ? { justifyContent: 'space-between' } : undefined}
            contentContainerStyle={{ paddingBottom: 400, gap: 20, backgroundColor: 'white' }}
            renderItem={({ item }) => (
                <View style={{ paddingHorizontal: 24, marginBottom: 20 }}>
                    {renderItem({ item })}
                </View>
            )}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={
                loadingMore ? (
                    <ActivityIndicator size="small" color="#999" style={{ marginVertical: 10 }} />
                ) : null
            }
            showsVerticalScrollIndicator={false}
        />
    );
}

export default LazyFlatList;
