import { FlatList } from 'react-native'; // Sửa import
import { View } from "moti";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

interface LazyFlatListProps<T> {
    fetchData: (page: number) => Promise<T[]>;
    pageSize: number;
    renderItem: ({ item }: { item: T }) => JSX.Element;
    keyExtractor: (item: T) => string;
    ListHeaderComponent?: JSX.Element;
    numColumns?: number;
    setLoadInitialRef?: (ref: () => void) => void; // Thêm prop để truyền ref
}

function LazyFlatList<T>({
    fetchData,
    pageSize,
    renderItem,
    keyExtractor,
    ListHeaderComponent,
    numColumns = 2,
    setLoadInitialRef,
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

    // Truyền ref cho loadInitial
    useEffect(() => {
        if (setLoadInitialRef) {
            setLoadInitialRef(loadInitial);
        }
    }, [setLoadInitialRef]);

    useEffect(() => {
        loadInitial();
    }, []);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
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
                <View className="px-[24px] mb-[20px]">
                    {renderItem({ item })}
                </View>
            )}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={
                loadingMore ? (
                    <ActivityIndicator size="small" color="#999" className="my-[10px]" />
                ) : null
            }
            showsVerticalScrollIndicator={false}
        />
    );
}

export default LazyFlatList;