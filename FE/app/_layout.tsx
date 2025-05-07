import { Stack, useRouter } from "expo-router";
import './global.css'
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { icons } from "@/constants/icons";

const CustomHeader = ({ title, isShowDots, isShowHeart }: any) => {
  const router = useRouter();
  return (
    <View className="absolute z-20  pt-[50px] pb-[10px] flex-row px-[24px] items-center w-full">
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

      {isShowDots &&
        <TouchableOpacity
          className='ml-auto w-[45px] h-[45px] rounded-full items-center justify-center bg-[#ECF0F4]'>
          <Image
            tintColor="#181C2E"
            source={icons.dots} resizeMode='contain' className='w-[12px] h-[12px] rotate-180'
          />
        </TouchableOpacity>}

      {isShowHeart &&
        <TouchableOpacity
          className='ml-auto w-[45px] h-[45px] rounded-full items-center justify-center bg-[#ECF0F4]'>
          <Image
            tintColor="#181C2E"
            source={icons.heart} resizeMode='contain' className='w-[14px] h-[14px] rotate'
          />
        </TouchableOpacity>}
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
              isShowDots={true}
            />
          }}
        />
        <Stack.Screen
          name="foods/[id]"
          options={{
            header: () => <CustomHeader
              isShowHeart={true}
            />
          }}
        />
        <Stack.Screen
          name="search/index"
          options={{
            header: () => <CustomHeader
              title='Search'
            />
          }}
        />
        <Stack.Screen
          name="categories/index"
          options={{
            header: () => <CustomHeader
              title='All Categories'
            />
          }}
        />
        <Stack.Screen
          name="restaurants/index"
          options={{
            header: () => <CustomHeader
              title='All Restaurants'
            />
          }}
        />
        <Stack.Screen
          name="categories/[id]"
          options={{
            header: () => <CustomHeader
              title='Id of Category'
            />
          }}
        />
        <Stack.Screen
          name="cart/index"
          options={{
            header: () => <CustomHeader
              title='Cart'
            />
          }}
        />
      </Stack>
    </>
  )
}
