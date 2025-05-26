import Button from "@/components/Button"
import Input from "@/components/Input"
import { ScrollView } from "moti";
import { Text, View } from "react-native"

const Signup = () => {
    return (
        <ScrollView className="flex-1 bg-black">
            <Text className="font-bold text-[30px] text-white w-full text-center  mt-[118px]">Sign up</Text>
            <Text className="text-[16px] text-white w-full text-center">Please sign up to get started</Text>
            <View className="p-[24px] bg-white rounded-[20px] mt-[50px] h-fit pb-[350px]">
                <Text className="mb-[8px]">NAME</Text>
                <Input
                    title="example@gmail.com"
                />
                <Text className="mb-[8px] mt-[24px]">EMAIL</Text>
                <Input
                    title="password"
                />
                <Text className="mb-[8px] mt-[24px]">PASSWORD</Text>
                <Input
                    title="password"
                />
                <Text className="mb-[8px] mt-[24px]">CONFIRM PASSWORD</Text>
                <Input
                    title="password"
                />
                <View className="mt-[47px]">
                    <Button
                        size="large"
                        title="Log in"
                    />
                </View>
            </View>
        </ScrollView>
    )
}
export default Signup