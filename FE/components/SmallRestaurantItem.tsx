import { Image, Pressable, Text, View } from 'react-native'
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { icons } from '@/constants/icons';
interface SmallRestaurantItemProps {
    restaurant: Restaurant
}
const SmallRestaurantItem = ({ restaurant }: SmallRestaurantItemProps) => {
    const router = useRouter();
    const onPress = () => {
        router.push('/restaurants/[id]')
    }
    return (
        <Pressable
            onPress={onPress}
        >
            {({ pressed }) => (
                <MotiView
                    style={{
                        boxShadow: " 0 1px 4px 0 rgba(0, 0, 0, 0.1)"
                    }}
                    className='bg-white rounded-xl p-[8px]'
                    animate={{
                        backgroundColor: pressed ? '#FFA57C' : '#FFFFFF',
                        scale: pressed ? 0.9 : 1,
                    }}
                    transition={{
                        type: 'timing',
                        duration: 100,
                    }}
                >
                    <Image
                        className='bg-accent w-full h-[140px] rounded-xl' />
                    <Text className='text-[20px] mt-[8px]'>{restaurant.name}</Text>
                    <Text className='text-[14px] text-[#A0A5BA] mt-[5px]'>{
                        restaurant.categories.map((value, index) => {
                            let tmp = "";
                            index === 0 ? tmp = "" : tmp = " - "
                            return (tmp += value.name)
                        })
                    }</Text>
                    <View className='flex-row items-center mt-[14px] gap-[24px]'>
                        <View className='flex-row items-center gap-[4px]'>
                            <Image
                                resizeMode='contain'
                                source={icons.star}
                                className='size-6'
                            />
                            <Text className='font-bold text-[16px]'>{restaurant.rate}</Text>
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
                </MotiView>
            )}
        </Pressable>

    )
}

export default SmallRestaurantItem