import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'
import Input from '@/components/Input'
import { ScrollView } from 'moti'

const edit_profile = () => {
    return (
        <ScrollView
            contentContainerStyle={{
                alignItems: 'center',
                paddingBottom: 400
            }}
            className='bg-white flex-1 pt-[120px] px-[24px]'>
            <View className='mb-[30px]' >
                <Image
                    className='bg-[#FFBF6D] w-[130px] h-[130px] rounded-full'
                />
                <TouchableOpacity
                    className='absolute bottom-0 right-0 w-[45px] h-[45px] rounded-full items-center justify-center bg-primary'>
                    <Image
                        tintColor="white"
                        source={icons.pencil} resizeMode='contain' className='w-[16px] h-[16px] '
                    />
                </TouchableOpacity>
            </View>

            <View className='gap-[8px] items-start w-full'>
                <Text className='uppercase'>full name</Text>
                <Input
                    title={myProfile.name}
                />
            </View>

            <View className='gap-[8px] items-start w-full mt-[24px]'>
                <Text className='uppercase'>Email</Text>
                <Input
                    title={myProfile.email}
                />
            </View>

            <View className='gap-[8px] items-start w-full mt-[24px]'>
                <Text className='uppercase'>Phone number</Text>
                <Input
                    title={myProfile.phone}
                />
            </View>

            <View className='gap-[8px] items-start w-full mt-[24px]'>
                <Text className='uppercase'>Bio</Text>
                <Input
                    textarea={true}
                    title={myProfile.bio}
                />
            </View>
        </ScrollView>
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
export default edit_profile