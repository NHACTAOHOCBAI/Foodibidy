import { icons } from '@/constants/icons'
import { useRouter } from 'expo-router'
import { View, Text, Image } from 'react-native'

const PersonalInfo = () => {
    const router = useRouter();
    return (
        <View className='bg-white flex-1 px-[24px]'>
            <Text className='text-[17px]   pt-[62px] pb-[32px]'>My Profile</Text>

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
                    title="full name"
                    value={myProfile.name}
                    img={icons.person}

                />
                <ProfileItem
                    title="email"
                    value={myProfile.email}
                    img={icons.email}
                />
                <ProfileItem
                    title="phone"
                    value={myProfile.phone}
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
export default PersonalInfo