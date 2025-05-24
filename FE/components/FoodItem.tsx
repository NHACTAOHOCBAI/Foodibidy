import { Image, Pressable, Text, View } from 'react-native'
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { icons } from '@/constants/icons';
import { useAddDishToCart } from '@/hooks/useCart';
import { showErrorToast, showSuccessToast } from '@/components/Toast';
const FoodItem = ({ food }: { food: Food }) => {
    const router = useRouter();
    const onPress = () => router.push({
        pathname: '/foods/[id]',
        params: {
            id: food.id.toString(),
            data: JSON.stringify(food),
        },
    })
    const { mutate: addToCart, isLoading, isSuccess } = useAddDishToCart();
    const onAddToCart = () => {
        addToCart(
            { idCart: "ENzhNl05Rc45pBp3ZhHb", idDish: food.id, quantity: 1 },
            {
                onSuccess: () => {
                    showSuccessToast(`You just have added ${food.dishName} successfully`)
                },
                onError: () => {
                    showErrorToast("Cannot add food to cart. Please do again");
                },
            },

        )
    };
    return (
        <Pressable
            onPress={onPress}
        >
            {({ pressed }) => (
                <MotiView className='relative w-[160px] '
                    animate={{
                        scale: pressed ? 0.85 : 1,
                    }}
                    transition={{
                        type: 'timing',
                        duration: 100,
                    }}>
                    <View className="w-full p-[8px] bg-transparent">
                        <Image
                            source={food.dishImage ? { uri: food.dishImage } : undefined}
                            className='w-full h-[84px] rounded-[12px] bg-accent'
                        />
                        <Text
                            numberOfLines={1}
                            className='font-bold mt-[15px] text-[15px]'>{food.dishName}</Text>
                        <Text
                            numberOfLines={1}
                            className='mt-[5px] text-[13px]'>{food.restaurant.restaurantName}</Text>
                        {/* button plus */}

                        <View className='flex-row items-center justify-between mt-[8px] gap-[10px]'>
                            <Text
                                numberOfLines={1}
                                className='text-[#32343E] text-[16px] font-bold flex-1'>{`$${food.price}`}</Text>
                            <Pressable
                                onPress={onAddToCart}
                            >
                                {({ pressed }) => (
                                    <MotiView
                                        className="w-[30px] h-[30px] rounded-full items-center justify-center bg-secondary"
                                        style={{
                                            boxShadow: " 0 1px 4px 0 rgba(0, 0, 0, 0.1)"
                                        }}
                                        animate={{
                                            backgroundColor: pressed ? '#FF7622' : '#121223',
                                            scale: pressed ? 0.85 : 1,
                                        }}
                                        transition={{
                                            type: 'timing',
                                            duration: 100,
                                        }}
                                    >
                                        <Image
                                            className='size-[10px]'
                                            resizeMode='contain'
                                            source={icons.plus}
                                        />
                                    </MotiView>
                                )}
                            </Pressable>
                        </View>
                    </View>
                    <View
                        className='absolute bottom-[-20px] w-full h-[200px] rounded-[20px] bg-white z-[-1]'
                        style={{
                            transform: [
                                { rotateX: '40deg' },
                            ],
                            boxShadow: " 0 1px 4px 0 rgba(0, 0, 0, 0.1)",
                        }} />
                </MotiView>

            )}
        </Pressable>

    )
}

export default FoodItem