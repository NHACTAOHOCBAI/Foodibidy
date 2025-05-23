import { Stack, useRouter } from "expo-router";
import './global.css'
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { icons } from "@/constants/icons";
import Filter from "@/components/Filter";
import { FilterProvider, useFilter } from "@/context/FilterContext";

const CustomHeader = ({ title, color = "", isTransperant = false }: any) => {
  const router = useRouter();
  // const { openFilter } = useFilter();
  return (
    <View className="absolute z-20  pt-[50px] pb-[10px] flex-row px-[24px] items-center w-full "
      style={{
        backgroundColor: !isTransperant ? "white" : ""
      }}>
      <TouchableOpacity
        onPress={() => router.back()}
        className='w-[45px] h-[45px] rounded-full items-center justify-center bg-[#ECF0F4]'>
        <Image
          tintColor="#181C2E"
          source={icons.arrow} resizeMode='contain' className='w-[12px] h-[12px] rotate-180'
        />
      </TouchableOpacity>
      <Text className="text-[17px] ml-[16px]"
        style={{
          color: color !== "" ? color : ""
        }}
      >
        {title}
      </Text>

      {/* {isShowDots &&
        <TouchableOpacity
          onPress={() => openFilter()}
          className='ml-auto w-[45px] h-[45px] rounded-full items-center justify-center bg-[#ECF0F4]'>
          <Image
            tintColor="#181C2E"
            source={icons.dots} resizeMode='contain' className='w-[12px] h-[12px] rotate-180'
          />
        </TouchableOpacity>} */}

    </View>
  );
};
const InnerLayout = () => {
  const { isFilterOpen } = useFilter();
  return (
    <View className="flex-1">
      <StatusBar hidden />
      {
        isFilterOpen && (
          <View className="absolute top-0 left-0 right-0 bottom-0 z-50 bg-[#020b1493] items-center justify-center">
            <Filter />
          </View>
        )
      }

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
        <Stack.Screen
          name="foods/[id]"
          options={{
            header: () => <CustomHeader
              isTransperant={true}
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
          name="categories/detail_category"
          options={{
            header: () => <CustomHeader
              title='Detail Category'
            />
          }}
        />
        <Stack.Screen
          name="cart/index"
          options={{
            header: () => <CustomHeader
              title='Cart'
              color="white"
            />
          }}
        />
        <Stack.Screen
          name="completed/placeOrder"
          options={{
            headerShown: false, // Ẩn header
          }}

        />
      </Stack>
    </View>
  )
}

export default function RootLayout() {
  return (
    <FilterProvider>
      <InnerLayout />
    </FilterProvider>
  )
}
