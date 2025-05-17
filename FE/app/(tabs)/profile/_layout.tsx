import { Stack, useRouter } from "expo-router";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { icons } from "@/constants/icons";

const CustomHeader = ({ title, isEdit = false }: any) => {
  const router = useRouter();
  return (
    <View className="absolute z-20  pt-[50px] bg-white pb-[10px] flex-row px-[24px] items-center w-full">
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
      {isEdit && (
        <Text
          onPress={() => router.push('/profile/edit_profile')}
          className="ml-auto text-primary uppercase underline">Edit</Text>
      )}
    </View>
  );
};
export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          animation: 'slide_from_right',
          headerTransparent: true
        }}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="personal_info"
          options={{
            header: () => <CustomHeader
              title="Personal Info"
              isEdit={true}
            />
          }}
        />
        <Stack.Screen
          name="edit_profile"
          options={{
            header: () => <CustomHeader
              title="Edit Profile"
            />
          }}
        />
        <Stack.Screen
          name="address"
          options={{
            header: () => <CustomHeader
              title="My Address"
            />
          }}
        />
      </Stack>
    </>
  )
}
