import Button from "@/components/Button"
import Input from "@/components/Input"
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native"
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
const CELL_COUNT = 4;
const Verification = () => {
    const router = useRouter();
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });
    return (
        <View className="flex-1 bg-black">
            <Text className="font-bold text-[30px] text-white w-full text-center mt-[118px]">Verification</Text>
            <Text className="text-[16px] text-white w-full text-center">We have sent a code to your email</Text>
            <View className="p-[24px] bg-white rounded-[20px] mt-[50px] flex-1">
                <Text className="mb-[8px]">CODE</Text>
                <CodeField
                    // ref is not required here, as useBlurOnFulfill manages focus internally
                    {...props}
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({ index, symbol, isFocused }) => (
                        <View
                            key={index}
                            className={`w-[60px] h-[60px]  rounded-xl border items-center justify-center ${isFocused ? 'border-blue-500' : 'border-gray-300'
                                }`}
                            onLayout={getCellOnLayoutHandler(index)}
                        >
                            <Text className="text-lg text-black">
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        </View>
                    )}
                />
                <View className="mt-[30px]">
                    <Button
                        onPress={() => console.log(value)}
                        size="large"
                        title="Verify"
                    />
                </View>
            </View>
        </View>
    )
}
export default Verification