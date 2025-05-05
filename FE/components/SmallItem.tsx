import { Image, Pressable, Text, View } from 'react-native'
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { icons } from '@/constants/icons';
interface SmallItemProps {
    image: string
    price: number
    restaurantName: string
    id: number
    name: string
}
const SmallItem = ({ name, image, id, price, restaurantName }: SmallItemProps) => {
    const router = useRouter();
    const onPress = () => {
        router.push('/foods/[id]')
    }
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
                    <View
                        className="w-full p-[8px] rounded-[12px] bg-transparent"
                    >
                        <Image
                            source={image ? { uri: image } : undefined}
                            className='w-full h-[84px] rounded-[12px] bg-accent'
                        />
                        <Text className='font-bold mt-[15px] text-[15px]'>{name}</Text>
                        <Text className='mt-[5px] text-[13px]'>{restaurantName}</Text>
                        {/* button plus */}

                        <View className='flex-row items-center justify-between mt-[8px]'>
                            <Text className='text-[#32343E] text-[16px] font-bold'>{`$${price}`}</Text>
                            <Pressable
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

export default SmallItem