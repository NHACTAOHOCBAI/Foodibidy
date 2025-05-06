import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { icons } from '@/constants/icons';
import SmallItem from '@/components/SmallItem';
import SuggestedItem from '@/components/SuggestedItem';

const RestaurantDetail = () => {
    const { id } = useLocalSearchParams();
    return (
        <ScrollView className="bg-white">
            <Image
                className='bg-accent w-full h-[400px] rounded-[20px]'
                resizeMode="cover" />
            <View className=' p-[24px] pb-0'>
                <Text className='font-bold text-[20px]'>{restaurantData.name}</Text>

                <Text
                    style={{
                        lineHeight: 24,
                        marginTop: 15,
                        marginBottom: 35,
                    }}
                    className=' text-[14px] text-[#A0A5BA]' >{restaurantData.description}</Text>

                <View className='flex-row items-center gap-[24px]'>
                    <View className='flex-row items-center gap-[4px]'>
                        <Image
                            resizeMode='contain'
                            source={icons.star}
                            className='size-6'
                        />
                        <Text className='font-bold text-[16px]'>{restaurantData.rate}</Text>
                    </View>
                    <View className='flex-row items-center gap-[9px]'>
                        <Image
                            resizeMode='contain'
                            source={icons.delivery}
                            className='size-6'
                        />
                        <Text className='text-[14px]'>Free</Text>
                    </View>
                </View>
            </View>

            <FlatList className='py-[24px] '
                data={restaurantData.categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    gap: 10,
                    paddingLeft: 24,
                    paddingRight: 40,
                }}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <SuggestedItem
                        type="categories"
                        categories={item}
                    />
                )}
            />

            {/* data */}
            <Foods />
        </ScrollView>
    )
}

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
                    image={item.image}
                    price={item.price}
                    restaurantName={item.restaurantName}
                    id={item.id}
                    name={item.name}
                />
            )}
        />
    </View>
)

export default RestaurantDetail

const restaurantData: restaurant = {
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
}
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
        image: '',
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