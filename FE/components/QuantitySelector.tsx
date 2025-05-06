import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'
import { MotiView } from 'moti';
interface IProp {
    value: number;
    setValue: (value: number) => void
}

const QuantitySelector = ({ value, setValue }: IProp) => {
    const handlePlus = () => setValue(value + 1);
    const handleSubtract = () => setValue(value - 1);
    return (
        <View className='bg-secondary justify-between w-[125px] items-center flex-row rounded-full py-[12px] px-[14px]'>
            <Pressable
                onPress={handleSubtract}
            >
                {({ pressed }) => (
                    <MotiView className='w-[24px] justify-center items-center h-[24px] rounded-full  bg-gray-500'
                        animate={{
                            scale: pressed ? 0.85 : 1,
                            opacity: pressed ? 0.6 : 1,
                        }}
                        transition={{
                            type: 'timing',
                            duration: 100,
                        }}>
                        <Image
                            resizeMode='contain'
                            source={icons.subtract}
                            className='w-3 h-3'
                            tintColor="white"
                        />
                    </MotiView>

                )}
            </Pressable>
            <Text className='font-bold text-[16px] text-white'>{value}</Text>
            <Pressable
                onPress={handlePlus}
            >
                {({ pressed }) => (
                    <MotiView className='w-[24px] justify-center items-center h-[24px] rounded-full  bg-gray-500'
                        animate={{
                            scale: pressed ? 0.85 : 1,
                            opacity: pressed ? 0.6 : 1,
                        }}
                        transition={{
                            type: 'timing',
                            duration: 100,
                        }}>
                        <Image
                            resizeMode='contain'
                            source={icons.plus}
                            className='w-3 h-3'
                            tintColor="white"
                        />
                    </MotiView>

                )}
            </Pressable>
        </View>
    )
}

export default QuantitySelector