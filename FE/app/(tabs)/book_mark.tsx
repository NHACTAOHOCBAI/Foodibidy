
import FoodItem from '@/components/FoodItem';
import SmallItem from '@/components/FoodItem';
import { useState } from 'react';

import { ActivityIndicator, FlatList, ScrollView, Text, View } from 'react-native'

const Foods = () => {
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [loadingMore, setLoadingMore] = useState(false);

    // Hàm load thêm dữ liệu
    const handleLoadMore = () => {
        if (visibleCount >= foods.length || loadingMore) return;

        setLoadingMore(true);

        // Mô phỏng delay tải dữ liệu (API call)
        setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, foods.length));
            setLoadingMore(false);
        }, 2000);
    };

    return (
        <View className="mt-[12px] px-[24px]">
            <Text className="text-[#32343E] text-[20px]">Popular Foods</Text>

            <FlatList
                className="py-[20px]"
                data={foods.slice(0, visibleCount)} // Chỉ hiển thị phần tử từ 0 đến visibleCount
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 28 }}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <FoodItem food={item} />}

                // Lazy loading props
                onEndReached={handleLoadMore} // Gọi khi cuộn tới cuối danh sách
                onEndReachedThreshold={0.8} // Khi cuộn đến 50% cuối danh sách
                initialNumToRender={PAGE_SIZE} // Render ban đầu
                maxToRenderPerBatch={PAGE_SIZE} // Tối đa render mỗi batch

                ListFooterComponent={loadingMore ? (
                    <ActivityIndicator size="small" color="#999" style={{ marginVertical: 10 }} />
                ) : null} // Hiển thị loader khi đang tải thêm
            />
        </View>
    );
};
const PAGE_SIZE = 6;
const BookMark = () => {
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [loadingMore, setLoadingMore] = useState(false);

    // Hàm load thêm dữ liệu
    const handleLoadMore = () => {
        if (visibleCount >= foods.length || loadingMore) return;

        setLoadingMore(true);

        // Mô phỏng delay tải dữ liệu (API call)
        setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, foods.length));
            setLoadingMore(false);
        }, 2000);
    };
    return (
        <View className=' bg-slate-100'>
            <Text className='text-[17px] bg-white px-[24px] pt-[62px] pb-[24px]'>Favorite Foods</Text>
            <ScrollView
                className='bg-white w-full h-full z-[1]'
                contentContainerStyle={{
                    paddingBottom: 400,
                    paddingHorizontal: 24
                }}>
                <FlatList
                    className="py-[20px]"
                    data={foods.slice(0, visibleCount)} // Chỉ hiển thị phần tử từ 0 đến visibleCount
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ gap: 28 }}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    numColumns={2}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <FoodItem food={item} />}

                    // Lazy loading props
                    onEndReached={handleLoadMore} // Gọi khi cuộn tới cuối danh sách
                    onEndReachedThreshold={0.8} // Khi cuộn đến 50% cuối danh sách
                    initialNumToRender={PAGE_SIZE} // Render ban đầu
                    maxToRenderPerBatch={PAGE_SIZE} // Tối đa render mỗi batch

                    ListFooterComponent={loadingMore ? (
                        <ActivityIndicator size="small" color="#999" style={{ marginVertical: 10 }} />
                    ) : null} // Hiển thị loader khi đang tải thêm
                />
            </ScrollView >
        </View >
    )
}


const foods: Food[] = [
    {
        id: 1,
        name: 'Burger',
        categories: ['Fast Food', 'Beef'],
        note: 'Classic beef burger with cheese and lettuce.',
        image: 'https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg',
        price: 10,
        restaurantName: 'Burger King',
        sold: 25,
        remaining: 75,
        createdAt: '2025-05-01T08:00:00.000Z',
        rate: 4.6,
    },
    {
        id: 2,
        name: 'Salmon Sushi',
        categories: ['Sushi', 'Japanese'],
        note: 'Fresh salmon on vinegared rice.',
        image: "",
        price: 15,
        restaurantName: 'Sushi World',
        sold: 40,
        remaining: 60,
        createdAt: '2025-05-02T08:30:00.000Z',
        rate: 4.7,
    },
    {
        id: 3,
        name: 'Pepperoni Pizza',
        categories: ['Pizza', 'Italian'],
        note: 'Topped with spicy pepperoni and mozzarella.',
        image: '',
        price: 12,
        restaurantName: 'Pizza Paradise',
        sold: 30,
        remaining: 70,
        createdAt: '2025-05-03T09:00:00.000Z',
        rate: 3.6,
    },
    {
        id: 4,
        name: 'Chicken Taco',
        categories: ['Taco', 'Mexican'],
        note: 'Grilled chicken in a soft corn tortilla.',
        image: '',
        price: 9,
        restaurantName: 'Taco Fiesta',
        sold: 35,
        remaining: 65,
        createdAt: '2025-05-04T10:00:00.000Z',
        rate: 4.6,
    },
    {
        id: 5,
        name: 'Caesar Salad',
        categories: ['Salad', 'Healthy Food'],
        note: 'Crispy romaine with Caesar dressing and croutons.',
        image: '',
        price: 8,
        restaurantName: 'Healthy Greens',
        sold: 20,
        remaining: 80,
        createdAt: '2025-05-05T11:00:00.000Z',
        rate: 4.1,
    },
    {
        id: 6,
        name: 'Hot Dog',
        categories: ['Hot Dog', 'Street Food'],
        note: 'Classic hot dog with mustard and ketchup.',
        image: '',
        price: 6,
        restaurantName: 'Hot Dog Heaven',
        sold: 50,
        remaining: 50,
        createdAt: '2025-05-06T12:00:00.000Z',
        rate: 4.6,
    },
    {
        id: 7,
        name: 'Chicken Curry',
        categories: ['Curry', 'Indian'],
        note: 'Spicy Indian-style chicken curry with rice.',
        image: '',
        price: 13,
        restaurantName: 'Curry Corner',
        sold: 28,
        remaining: 72,
        createdAt: '2025-05-07T13:00:00.000Z',
        rate: 4.3,
    },
    {
        id: 8,
        name: 'Pho Bo',
        categories: ['Pho', 'Vietnamese'],
        note: 'Vietnamese beef noodle soup with herbs.',
        image: '',
        price: 11,
        restaurantName: 'Pho Delight',
        sold: 60,
        remaining: 40,
        createdAt: '2025-05-08T14:00:00.000Z',
        rate: 4.6,
    },
    {
        id: 9,
        name: 'Veggie Pizza',
        categories: ['Pizza', 'Vegetarian'],
        note: 'Loaded with vegetables and mozzarella cheese.',
        image: '',
        price: 11,
        restaurantName: 'Pizza Paradise',
        sold: 22,
        remaining: 78,
        createdAt: '2025-05-09T15:00:00.000Z',
        rate: 4.6,
    },
    {
        id: 10,
        name: 'Tempura Shrimp',
        categories: ['Japanese', 'Seafood'],
        note: 'Crispy deep-fried shrimp with dipping sauce.',
        image: '',
        price: 14,
        restaurantName: 'Sushi World',
        sold: 18,
        remaining: 82,
        createdAt: '2025-05-10T16:00:00.000Z',
        rate: 4.6,
    }
];
export default BookMark

