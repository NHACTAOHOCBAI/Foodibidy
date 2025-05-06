import SearchInput from '@/components/SearchInput'
import SmallItem from '@/components/SmallItem'
import SuggestedItem from '@/components//SuggestedItem'
import { icons } from '@/constants/icons'
import { FlatList, StyleSheet, ScrollView, Text, View, Image } from 'react-native'

const SearchScreen = () => {
    return (
        <View className="bg-slate-300">
            {/* <Header /> */}
            <Header />
            <ScrollView className='bg-slate-100 w-full h-full z-[1]'>
                <RecentKeyword />
                <SuggestedRestaurant />
                <Foods />
            </ScrollView>
        </View>
    )
}

const Header = () => (
    <View className=' pt-[123px] pb-[10px] bg-white'>
        <View className='px-[24px]'>
            <SearchInput placeholder=' Search for food, groceries, drinks...' />
        </View>
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
    <View className='pt-[20px]'>
        <Text className='text-[#32343E] text-[20px] px-[24px]'>Suggested Restaurants</Text>
        <FlatList className='py-[20px]'
            data={restaurants}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: 24,
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

const SuggestedRestaurantItem = ({ item }: { item: restaurant }) => (
    <View className='flex-row gap-[10px] pb-[14px] w-full border-b-[1px] border-b-[#EBEBEB]'>
        <Image
            className='bg-accent w-[60px] h-[50px] rounded-[8px]'
        />
        <View className='gap-[6px]' >
            <Text className='text-[16px]'>
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
)

const Foods = () => (
    <View className='mt-[12px]'>
        <View className='px-[24px] flex-row justify-between items-center '>
            <Text className='text-[#32343E] text-[20px]'>Popular Foods</Text>
        </View>

        <FlatList className='py-[20px] pb-[400px]'
            data={foods}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: 24,
                gap: 28,
            }}
            columnWrapperStyle={{
                justifyContent: 'space-between',

            }}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <SmallItem
                    food={item}
                />
            )}
        />
    </View>
)
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

const restaurants: restaurant[] = [
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

const foods = [
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
        createdAt: '2025-05-01T08:00:00.000Z'
    },
    {
        id: 2,
        name: 'Salmon Sushi',
        categories: ['Sushi', 'Japanese'],
        note: 'Fresh salmon on vinegared rice.',
        image: 'data:image/jpeg;base64,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',
        price: 15,
        restaurantName: 'Sushi World',
        sold: 40,
        remaining: 60,
        createdAt: '2025-05-02T08:30:00.000Z'
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
        createdAt: '2025-05-03T09:00:00.000Z'
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
        createdAt: '2025-05-04T10:00:00.000Z'
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
        createdAt: '2025-05-05T11:00:00.000Z'
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
        createdAt: '2025-05-06T12:00:00.000Z'
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
        createdAt: '2025-05-07T13:00:00.000Z'
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
        createdAt: '2025-05-08T14:00:00.000Z'
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
        createdAt: '2025-05-09T15:00:00.000Z'
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
        createdAt: '2025-05-10T16:00:00.000Z'
    }
];
