import { icons } from '@/constants/icons'
import { Link, useRouter } from 'expo-router'
import { View, Text, Image, Pressable } from 'react-native'

const profile = () => {
    const router = useRouter();
    return (
        <View className='bg-white flex-1 px-[24px]'>
            <Text className='text-[17px] pt-[62px] pb-[32px]'>My Profile</Text>
            <View className='flex-row gap-[32px]'>
                <Image
                    className='bg-accent rounded-full w-[100px] h-[100px]'
                />
                <View className='justify-center gap-[8px]'>
                    <Text className='text-[20px] font-bold'>
                        {myProfile.name}
                    </Text>
                    <Text className='text-[14px] text-[#A0A5BA]'>
                        {myProfile.bio}
                    </Text>
                </View>
            </View>

            <View
                className='p-[20px] gap-[16px] bg-[#F6F8FA] rounded-[16px] w-full mt-[32px]'
            >
                <ProfileItem
                    title="Personal Info"
                    img={icons.person}
                    handlePress={() => router.push('/profile/personal_info')}
                />
                <ProfileItem
                    title="Address"
                    img={icons.map}
                    handlePress={() => router.push('/profile/address')}
                />
            </View>

            <View
                className='p-[20px] gap-[16px] bg-[#F6F8FA] rounded-[16px] w-full mt-[32px]'
            >
                <ProfileItem
                    title="Log out"
                    img={icons.logout}
                />
            </View>
        </View>
    )
}
const ProfileItem = ({ title, img, handlePress }: any) => {
    return (
        <Pressable
            onPress={handlePress}>
            <View className='flex-row w-full items-center'>
                <View className='w-[40px] h-[40px] rounded-full bg-white justify-center items-center'>
                    <Image
                        resizeMode='contain'
                        source={img}
                        className='w-[14px] h-[14x] '
                    />
                </View>
                <Text className='text-[16px] ml-[14px]'>
                    {title}
                </Text>
                <View className='ml-auto w-[24px] h-[24px] rounded-full  justify-center items-center'>
                    <Image
                        resizeMode='contain'
                        source={icons.arrow}
                        className='w-[8px] h-[8px] '
                    />
                </View>
            </View>
        </Pressable>
    )
}
const myProfile: Account = {
    id: 1,
    name: "Nguyen Dang Phuc",
    address: [
        {
            type: "home",
            location: "Quang Binh"
        },
        {
            type: "work",
            location: "Di an, Binh Duong"
        }
    ],
    phone: "0838609516",
    email: "dangphucnguyen20112005@gmail.com",
    avatar: "",
    bio: "I love chicken"
}
export default profile