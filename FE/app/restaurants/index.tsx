import { View, Text, ScrollView, FlatList } from 'react-native'
import React from 'react'
import SmallRestaurantItem from '@/components/SmallRestaurantItem';

const AllRestaurants = () => {
    return (
        <View className='pt-[120px] bg-slate-100'>
            <ScrollView className='bg-slate-100 w-full h-full z-[1]'>
                <View className='mt-[12px]'>
                    <View className='px-[24px] flex-row justify-between items-center '>
                        <Text className='text-[#32343E] text-[20px]'>Popular Restaurants</Text>
                    </View>

                    <FlatList className='py-[20px] pb-[400px]'
                        data={restaurants}
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: 24,
                            gap: 28,
                        }}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <SmallRestaurantItem
                                restaurant={item}
                            />
                        )}
                    />
                </View>
            </ScrollView>
        </View>
    )
}
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
export default AllRestaurants