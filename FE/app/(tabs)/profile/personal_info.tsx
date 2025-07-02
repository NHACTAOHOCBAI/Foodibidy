import { icons } from '@/constants/icons'
import { useMyAccount } from '@/context/MyAccountContext'
import { useRouter } from 'expo-router'
import { View, Text, Image } from 'react-native'

const PersonalInfo = () => {
    const { address, avatar, email, fullName, phoneNumber } = useMyAccount()
    const router = useRouter();
    return (
        <View className='bg-white flex-1 px-[24px]'>
            <Text className='text-[17px]   pt-[62px] pb-[32px]'>My Profile</Text>

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
                    title="full name"
                    value={fullName}
                    img={icons.person}

                />
                <ProfileItem
                    title="email"
                    value={email}
                    img={icons.email}
                />
                <ProfileItem
                    title="phone"
                    value={phoneNumber}
                    img={icons.call}
                />
            </View>
        </View>
    )
}
const ProfileItem = ({ title, img, value }: any) => {
    return (
        <View className='flex-row w-full items-center'>
            <View className='w-[40px] h-[40px] rounded-full bg-white justify-center items-center'>
                <Image
                    resizeMode='contain'
                    source={img}
                    className='w-[14px] h-[14x] '
                />
            </View>
            <View className='ml-[14px]'>
                <Text className='uppercase'>{title}</Text>
                <Text className='text-[14px] text-[#6B6E82]'>{value}</Text>
            </View>
        </View>
    )
}
export default PersonalInfo