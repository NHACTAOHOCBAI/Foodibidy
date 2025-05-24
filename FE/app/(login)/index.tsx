import Button from "@/components/Button"
import Input from "@/components/Input"
import { useRouter } from "expo-router";
import { Text, View } from "react-native"

const Login = () => {
    const router = useRouter();
    return (
        <View className="flex-1 bg-black">
            <Text className="font-bold text-[30px] text-white w-full text-center  mt-[118px]">Log in</Text>
            <Text className="text-[16px] text-white w-full text-center">Please sign in to your existing account</Text>
            <View className="p-[24px] bg-white rounded-[20px] mt-[50px] flex-1">
                <Text className="mb-[8px]">EMAIL</Text>
                <Input
                    title="example@gmail.com"
                />
                <Text className="mb-[8px] mt-[24px]">PASSWORD</Text>
                <Input
                    title="password"
                />
                <View className="ml-auto mt-[24px] mb-[24px]" >
                    <Text onPress={() => { router.push('/(login)/forgotPassword') }}>Forgot Password</Text>
                </View>
                <Button
                    size="large"
                    title="Log in"
                />
                <Text className="text-[#646982] text-[16px] mt-[42px] w-full text-center mb-[165px]">Don't have an account? <Text onPress={() => { router.navigate('/(register)') }} className="text-[14px] text-primary">SIGN UP</Text></Text>
            </View>
        </View>
    )
}
export default Login