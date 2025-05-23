import { Text } from 'react-native';
import { getCategoriesPaginated } from '@/services/mockAPI';
import CategoryItem from '@/app/categories/CategoryItem';
import LazyFlatList from '@/components/LazyFlatList';
import { getCategory } from '@/services/category';


const PAGE_SIZE = 6;

const AllCategories = () => {
    const fetchCategoris = async (page: number) => {
        return await getCategory(page, PAGE_SIZE);
    };
    const renderHeader = () => (
        <Text className="text-[#32343E] text-[20px] mb-4 pt-[100px] px-[24px]">Popular Categories</Text>
    );

    return (
        <LazyFlatList<Category>
            fetchData={fetchCategoris}
            pageSize={PAGE_SIZE}
            renderItem={({ item }) => <CategoryItem category={item} />}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={renderHeader()}
        />
    );
};

export default AllCategories;
