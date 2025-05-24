import Button from "@/components/Button"
import Input from "@/components/Input"
import { useRouter } from "expo-router";
import { Text, View } from "react-native"

const ForgetPassword = () => {
    const router = useRouter();
    return (
        <View className="flex-1 bg-black">
            <Text className="font-bold text-[30px] text-white w-full text-center mt-[118px]">Forgot Password</Text>
            <Text className="text-[16px] text-white w-full text-center">Please sign in to your existing account</Text>
            <View className="p-[24px] bg-white rounded-[20px] mt-[50px] flex-1">
                <Text className="mb-[8px]">EMAIL</Text>
                <Input
                    title="example@gmail.com"
                />
                <View className="mt-[30px]">
                    <Button
                        onPress={() => router.push('/(login)/verification')}
                        size="large"
                        title="Send Code"
                    />
                </View>
            </View>
        </View>
    )
}
export default ForgetPassword