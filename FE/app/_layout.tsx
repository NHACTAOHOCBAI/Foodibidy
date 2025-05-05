import { Stack, useRouter } from "expo-router";
import './global.css'
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { icons } from "@/constants/icons";
const CustomHeader = ({ title }: any) => {
  const router = useRouter();
  return (
    <View className=" pt-[50px] pb-[10px] flex-row px-[24px] items-center ">
      <TouchableOpacity
        onPress={() => router.back()}
        className='w-[45px] h-[45px] rounded-full items-center justify-center bg-[#ECF0F4]'>
        <Image
          tintColor="#181C2E"
          source={icons.arrow} resizeMode='contain' className='w-[12px] h-[12px] rotate-180'
        />
      </TouchableOpacity>
      <Text className="text-[17px] ml-[16px]">
        {title}
      </Text>
    </View>
  );
};
export default function RootLayout() {
  return (
    <>
      <StatusBar hidden />
      <Stack
        screenOptions={{
          animation: 'slide_from_right',
          headerTransparent: true
        }}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="restaurants/[id]"
          options={{
            header: () => <CustomHeader
            />
          }}
        />
      </Stack>
    </>
  )
}
