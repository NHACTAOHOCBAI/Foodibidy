import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { icons } from '@/constants/icons'
import Button from '@/components/Button'
import QuantitySelector from '@/components/QuantitySelector'
import { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { addFoodToCart, getMyProfile } from '@/services/mockAPI'

const FoodDetail = () => {
    const { data } = useLocalSearchParams();
    const food = JSON.parse(data as string) as Food;
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onAddToCart = async () => {
        setLoading(true);
        try {
            await addFoodToCart({ idFood: food.id, quantity });
            console.log(getMyProfile());
            router.push('/completed/placeOrder');
        } catch (error) {
            console.error("Failed to add to cart", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className='flex-1 relative'>
            {loading && (
                <View className="absolute z-50 inset-0 opacity-35 bg-gray-300 items-center justify-center">
                    <ActivityIndicator size="large" color="gray" />
                </View>
            )}
            <TouchableOpacity
                className='ml-auto w-[45px]  h-[45px] rounded-full items-center justify-center bg-[#ECF0F4] absolute z-[10] top-[50px] right-[24px]'>
                <Image
                    tintColor="#181C2E"
                    source={icons.heart} resizeMode='contain' className='w-[14px] h-[14px] rotate'
                />
            </TouchableOpacity>

            <ScrollView
                className="bg-white"
                contentContainerStyle={{ paddingBottom: 400 }}
                scrollEnabled={!loading}
            >
                <Image
                    source={{ uri: food.image !== "" ? food.image : undefined }}
                    className='bg-accent w-full h-[400px] rounded-[20px]'
                    resizeMode="cover" />
                <View className='p-[24px] pb-0'>
                    <Text className='font-bold text-[20px]'>{food.name}</Text>
                    <Text className='text-[14px] mt-[15px]'>{food.restaurant.name}</Text>

                    <View className='mt-[15px] flex-row items-center gap-[24px]'>
                        <View className='flex-row items-center gap-[4px]'>
                            <Image source={icons.star} className='size-6' resizeMode='contain' />
                            <Text className='font-bold text-[16px]'>{food.rating}</Text>
                        </View>
                        <View className='flex-row items-center gap-[9px]'>
                            <Image source={icons.delivery} className='size-6' resizeMode='contain' />
                            <Text className='text-[14px]'>Free</Text>
                        </View>
                    </View>

                    <Text className='text-[14px] text-[#A0A5BA]' style={{ lineHeight: 24, marginTop: 15, marginBottom: 35 }}>
                        {food.description}
                    </Text>
                </View>
            </ScrollView>

            <View className='absolute bottom-0 bg-[#F0F5FA] w-full rounded-s-[25px] px-[24px] pt-[20px] pb-[65px]'>
                <View className='flex-row justify-between mb-[24px] items-center'>
                    <Text className='text-[28px]'>{`$${food.price * quantity}`}</Text>
                    <QuantitySelector value={quantity} setValue={setQuantity} />
                </View>
                <Button
                    onPress={onAddToCart}
                    size='large'
                    title={loading ? "Adding..." : "Add to cart"}
                />
            </View>
        </View>
    )
}

export default FoodDetail;

const styles = StyleSheet.create({});
