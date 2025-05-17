import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { MotiView } from 'moti'
interface IProps {
    title: string,
    onPress?: () => void,
    outline?: boolean,
    size: "large" | "small",
}
const Button = ({ title, onPress, outline = false, size }: IProps) => {
    return (
        <Pressable
            onPress={onPress}
        >
            {({ pressed }) => (
                <MotiView className='border-[1px] border-primary rounded-[12px] w-full justify-center items-center'
                    animate={{
                        scale: pressed ? 0.95 : 1,
                        opacity: pressed ? 0.6 : 1,
                    }}
                    transition={{
                        type: 'timing',
                        duration: 100,
                    }}
                    style={{
                        backgroundColor: outline ? "white" : "#FF7622",
                        height: size === "large" ? 62 : 40,
                        width: size === "large" ? "100%" : 140,
                    }}
                >
                    <Text className=' font-bold text-[16px] text-white'
                        style={{
                            color: outline ? "#FF7622" : 'white',
                            textTransform: size === "large" ? "uppercase" : "none",
                            fontSize: size === "large" ? 16 : 12
                        }}
                    >{title}</Text>
                </MotiView>
            )}
        </Pressable>
    )
}

export default Button