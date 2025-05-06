import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { MotiView } from 'moti'
interface IProps {
    title: string,
    onPress?: () => void
}
const Button = ({ title, onPress }: IProps) => {
    return (
        <Pressable
            onPress={onPress}
        >
            {({ pressed }) => (
                <MotiView className='h-[62px] rounded-[12px] w-full justify-center items-center bg-primary'
                    animate={{
                        scale: pressed ? 0.95 : 1,
                        opacity: pressed ? 0.6 : 1,
                    }}
                    transition={{
                        type: 'timing',
                        duration: 100,
                    }}>
                    <Text className='uppercase font-bold text-[16px] text-white'>{title}</Text>
                </MotiView>
            )}
        </Pressable>
    )
}

export default Button