import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { icons } from '@/constants/icons';
import SmallCategoryItem from '@/components/SmallCategoryItem';
import SmallItem from '@/components/SmallItem';

const restaurantData = {
    id: 1,
    name: "Burger Bistro",
    description: "Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.",
    image: "https://example.com/restaurant1.jpg",
    rate: 4.5,
    reviews: 100,
    location: "Location 1",
    category: [
        {
            id: 1,
            name: "Burger",
        },
        {
            id: 2,
            name: "Fast Food",
        },
    ]
}
const foods = [
    {
        id: 1,
        name: 'Burger',
        image: '',
        price: 10,
        restaurantName: 'Burger King',
    },
    {
        id: 2,
        name: 'Pizza',
        image: '',
        price: 15,
        restaurantName: 'Pizza Hut',
    },
    {
        id: 3,
        name: 'Fried Chicken',
        image: '',
        price: 20,
        restaurantName: 'KFC',
    },
    {
        id: 4,
        name: 'Salad',
        image: '',
        price: 5,
        restaurantName: 'Healthy Food',
    },
    {
        id: 5,
        name: 'Sushi',
        image: '',
        price: 18,
        restaurantName: 'Tokyo Sushi',
    },
    {
        id: 6,
        name: 'Tacos',
        image: '',
        price: 12,
        restaurantName: 'Taco Bell',
    },
    {
        id: 7,
        name: 'Pho',
        image: '',
        price: 9,
        restaurantName: 'Pho 24',
    },
    {
        id: 8,
        name: 'Banh Mi',
        image: '',
        price: 4,
        restaurantName: 'Banh Mi Saigon',
    },
    {
        id: 9,
        name: 'Pasta',
        image: '',
        price: 14,
        restaurantName: 'Little Italy',
    },
    {
        id: 10,
        name: 'Steak',
        image: '',
        price: 25,
        restaurantName: 'Texas Grill',
    },
];
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
                data={restaurantData.category}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    gap: 10,
                    paddingLeft: 24,
                    paddingRight: 40,
                }}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <SmallCategoryItem
                        showImage={false}
                        id={item.id}
                        name={item.name}
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

const styles = StyleSheet.create({})