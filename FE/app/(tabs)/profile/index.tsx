import { icons } from '@/constants/icons'
import { useMyAccount } from '@/context/MyAccountContext'
import { Link, useRouter } from 'expo-router'
import { View, Text, Image, Pressable } from 'react-native'

const profile = () => {
    const { avatar, fullName } = useMyAccount()
    const router = useRouter();
    return (
        <View className='bg-white flex-1 px-[24px]'>
            <Text className='text-[17px] pt-[62px] pb-[32px]'>My Profile</Text>
            <View className='flex-row gap-[32px]'>
                {avatar ? (
                    <Image
                        className='bg-accent rounded-full w-[100px] h-[100px]'
                        source={{ uri: avatar }}
                    />
                ) : (
                    <View className="bg-gray-300 rounded-full w-[100px] h-[100px] mr-2.5 justify-center items-center">

                    </View>
                )}

                <View className='justify-center gap-[8px]'>
                    <Text className='text-[20px] font-bold'>
                        {fullName}
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
export default profile