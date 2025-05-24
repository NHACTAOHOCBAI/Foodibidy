// components/Checkbox.tsx
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface CheckboxProps {
    value: boolean;
    onValueChange: () => void;
}

const Checkbox = ({ value, onValueChange }: CheckboxProps) => {
    return (
        <Pressable onPress={onValueChange}>
            <View
                style={{
                    width: 24,
                    height: 24,
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor: '#ccc',
                    backgroundColor: value ? '#4CAF50' : 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                }}
            >
                {value && <Text style={{ color: 'white', fontWeight: 'bold' }}>✓</Text>}
            </View>
        </Pressable>
    );
};

export default Checkbox;
