import SearchInput from '@/components/SearchInput'
import SuggestedItem from '@/components//SuggestedItem'
import { icons } from '@/constants/icons'
import { FlatList, ScrollView, Text, View, Image, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import FoodItem from '@/components/FoodItem'
import { Link } from 'expo-router'
const PAGE_SIZE = 4;
const SearchScreen = () => {
    const handleSearch = (value: string) => {
        console.log(value)
    }
    return (
        <View className="bg-slate-300 flex-1">
            {/* <Header /> */}
            <Header
                handleSearch={handleSearch}
            />
            <ScrollView
                className='bg-white flex-1 z-[1]'
                contentContainerStyle={{
                    paddingBottom: 400
                }}>
                <RecentKeyword />
                <SuggestedRestaurant />
                <Foods />
            </ScrollView>
        </View>
    )
}

const Header = ({ handleSearch }: any) => (
    <View className='pt-[123px] px-[24px] pb-[10px] bg-white'>
        <SearchInput
            handleSubmit={handleSearch}
            autoFocus={true}
            placeholder=' Search for food, groceries, drinks...' />
    </View>
)

const RecentKeyword = () => (
    <View className='pt-[24px]'>
        <Text className='text-[#32343E] text-[20px] px-[24px]'>Recent Keywords</Text>
        <FlatList className='py-[12px] '
            data={recentKeywords}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                gap: 10,
                paddingLeft: 24,
                paddingRight: 40,
            }}
            renderItem={({ item }) => (
                <SuggestedItem
                    type='recentKeywords'
                    recentKeywords={item}
                />
            )}
        />
    </View>
)

const SuggestedRestaurant = () => (
    <View className='pt-[20px]  px-[24px]'>
        <Text className='text-[#32343E] text-[20px]'>Suggested Restaurants</Text>
        <FlatList className='py-[20px]'
            data={restaurants}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                gap: 14,
            }}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <SuggestedRestaurantItem
                    item={item}
                />
            )}
        />
    </View>
)

const SuggestedRestaurantItem = ({ item }: { item: Restaurant }) => (
    <Link href={`/restaurants/${item.id}`}>
        <View className='flex-row gap-[10px] pb-[14px] w-full border-b-[1px] border-b-[#EBEBEB]'>
            <Image
                className='bg-accent w-[60px] h-[50px] rounded-[8px]'
            />
            <View className='gap-[6px] flex-1' >
                <Text
                    numberOfLines={1}
                    className='text-[16px]'>
                    {item.name}
                </Text>
                <View className='flex-row gap-[2px] items-center'>
                    <Image
                        resizeMode='contain'
                        source={icons.star}
                        className='w-7 h-5'
                    />
                    <Text className='text-[16px]'>{item.rate}</Text>
                </View>
            </View>
        </View>
    </Link>
)

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
export default SearchScreen
// data
const recentKeywords = [
    "Burger",
    "Sandwich",
    "Pizza",
    "Burger",
    "Sandwich",
    "Pizza",
    "Burger",
    "Sandwich",
    "Pizza"
]

const restaurants: Restaurant[] = [
    {
        id: 1,
        name: 'Burger King',
        ownerName: 'John Smith',
        address: '123 King St, New York, NY',
        image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Burger_King_Logo.svg',
        rate: 4.5,
        categories: [
            { id: 1, name: 'Burger' },
            { id: 2, name: 'Fast Food' }
        ],
        description: 'Popular American fast food chain known for its flame-grilled burgers.',
        reviews: 1534
    },
    {
        id: 2,
        name: 'Sushi World',
        ownerName: 'Akira Tanaka',
        address: '88 Tokyo Ave, San Francisco, CA',
        image: 'https://images.unsplash.com/photo-1576402187875-4cd7e6fdb9f5',
        rate: 4.8,
        categories: [
            { id: 3, name: 'Sushi' },
            { id: 4, name: 'Japanese' }
        ],
        description: 'Authentic Japanese restaurant offering premium sushi and sashimi.',
        reviews: 987
    },
    {
        id: 3,
        name: 'Pizza Paradise',
        ownerName: 'Mario Rossi',
        address: '456 Pizza Rd, Chicago, IL',
        image: 'https://images.unsplash.com/photo-1601924582975-df24e517bbf8',
        rate: 4.2,
        categories: [
            { id: 5, name: 'Pizza' },
            { id: 6, name: 'Italian' }
        ],
        description: 'Serving classic Italian-style pizzas with a modern twist.',
        reviews: 746
    }
];

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
