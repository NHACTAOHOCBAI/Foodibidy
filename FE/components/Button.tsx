import { View, Text, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import React from 'react';
import { MotiView } from 'moti';

interface IProps {
    title: string;
    onPress?: () => void;
    outline?: boolean;
    size: 'large' | 'small';
    loading?: boolean; // New loading prop
}

const Button = ({ title, onPress, outline = false, size, loading = false }: IProps) => {
    return (
        <Pressable
            onPress={onPress}
            disabled={loading} // Disable button when loading
        >
            {({ pressed }) => (
                <MotiView
                    className="border-[1px] border-primary rounded-[12px] w-full justify-center items-center min-w-[100px]"
                    animate={{
                        scale: pressed && !loading ? 0.95 : 1, // Disable scale animation when loading
                        opacity: pressed && !loading ? 0.6 : 1, // Disable opacity animation when loading
                    }}
                    transition={{
                        type: 'timing',
                        duration: 100,
                    }}
                    style={{
                        backgroundColor: outline ? 'white' : '#FF7622',
                        height: size === 'large' ? 62 : 40,
                        width: size === 'large' ? '100%' : 140,
                    }}
                >
                    {loading ? (
                        <ActivityIndicator
                            size={size === 'large' ? 'large' : 'small'}
                            color={outline ? '#FF7622' : 'white'} // Match color to button style
                        />
                    ) : (
                        <Text
                            className="font-bold text-[16px] text-white"
                            style={{
                                color: outline ? '#FF7622' : 'white',
                                textTransform: size === 'large' ? 'uppercase' : 'none',
                                fontSize: size === 'large' ? 16 : 12,
                            }}
                        >
                            {title}
                        </Text>
                    )}
                </MotiView>
            )}
        </Pressable>
    );
};

export default Button;