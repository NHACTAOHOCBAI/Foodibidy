import { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';

interface PaginatedGridListProps<T> {
    fetchData: (params: { page: number; limit: number }) => Promise<T[]>;
    renderItem: ({ item }: { item: T }) => React.ReactElement;
    keyExtractor: (item: T) => string | number;
    pageSize?: number;
    numColumns?: number;
    columnGap?: number;
    contentPaddingBottom?: number;
    ListHeaderComponent?: React.ReactElement;
    ListFooterComponent?: React.ReactElement;
}

export function PaginatedGridList<T>({
    fetchData,
    renderItem,
    keyExtractor,
    pageSize = 6,
    numColumns = 2,
    columnGap = 20,
    contentPaddingBottom = 400,
    ListHeaderComponent,
    ListFooterComponent,
}: PaginatedGridListProps<T>) {
    const [data, setData] = useState<T[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const loadMore = async () => {
        if (loading || !hasMore) return;
        setLoading(true);

        const newData = await fetchData({ page, limit: pageSize });
        setData(prev => [...prev, ...newData]);
        setHasMore(newData.length === pageSize);
        setPage(prev => prev + 1);
        setLoading(false);
    };

    useEffect(() => {
        loadMore();
    }, []);

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => keyExtractor(item).toString()}
            numColumns={numColumns}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={{ paddingBottom: contentPaddingBottom, gap: columnGap }}
            renderItem={renderItem}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={
                loading
                    ? <ActivityIndicator size="small" color="#999" style={{ marginVertical: 10 }} />
                    : ListFooterComponent
            }
        />
    );
}
