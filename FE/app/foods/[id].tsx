import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { icons } from '@/constants/icons'
import Button from '@/components/Button'
import QuantitySelector from '@/components/QuantitySelector'
import { useState } from 'react'

const FoodDetail = () => {
    const [quantity, setQuantity] = useState(1);
    return (
        <View className='h-full'>
            <ScrollView className="bg-white">
                <Image
                    className='bg-accent w-full h-[400px] rounded-[20px]'
                    resizeMode="cover" />
                <View className=' p-[24px] pb-0'>
                    <Text className='font-bold text-[20px]'>{foodData.name}</Text>
                    <Text className='text-[14px] mt-[15px]'>{foodData.restaurantName}</Text>

                    <View className='mt-[15px] flex-row items-center gap-[24px]'>
                        <View className='flex-row items-center gap-[4px]'>
                            <Image
                                resizeMode='contain'
                                source={icons.star}
                                className='size-6'
                            />
                            <Text className='font-bold text-[16px]'>{foodData.rate}</Text>
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

                    <Text
                        style={{
                            lineHeight: 24,
                            marginTop: 15,
                            marginBottom: 35,
                        }}
                        className=' text-[14px] text-[#A0A5BA]' >{foodData.note}</Text>
                </View>

                {/* data */}
            </ScrollView>

            <View className='absolute bottom-0 bg-[#F0F5FA] w-full rounded-s-[25px] px-[24px] pt-[20px] pb-[65px]'>
                <View className='flex-row justify-between mb-[24px] items-center'>
                    <Text className='text-[28px]'>{`$${foodData.price * quantity}`}</Text>
                    <QuantitySelector
                        value={quantity}
                        setValue={setQuantity}
                    />
                </View>
                <Button
                    title='Add to cart'
                />
            </View>
        </View>
    )
}
const foodData: Food = {
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
}

export default FoodDetail

const styles = StyleSheet.create({})