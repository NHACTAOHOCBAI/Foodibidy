import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

const address = () => {
    return (
        <ScrollView
            contentContainerStyle={{
                alignItems: 'center',
                paddingBottom: 400,
                gap: 20
            }}
            className='bg-white flex-1 pt-[120px] px-[24px]'>
            {myProfile.address.map((address) => {
                return <AddressItem
                    key={address.type}
                    address={address}
                />
            })}
        </ScrollView>
    )
}
const AddressItem = ({ address }: any) => {
    return (
        <View className='rounded-[16px] bg-[#F0F5FA] w-full p-[15px] flex-row ' >
            <View className='w-[48px] h-[48px] justify-center items-center bg-white rounded-full'>
                <Image
                    resizeMode='contain'
                    className='w-[20px] h-[20px]'
                    source={address.type === 'home' ? icons.homeIcon : icons.workIcon} />
            </View>
            <View className='ml-[14px] gap-[11px] flex-1'>
                <View className='flex-row w-full'>
                    <Text className='uppercase'>{address.type}</Text>
                    <Image
                        resizeMode='contain'
                        className='w-[16px] h-[16px] ml-auto mr-[21px]'
                        source={icons.edit}
                    />
                    <Image
                        resizeMode='contain'
                        className='w-[16px] h-[16px]'
                        source={icons.deleteIcon}
                    />
                </View>
                <Text
                    numberOfLines={2}
                    className='text-[#A0A5BA] '
                >{address.location}</Text>
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
    currentAddress: {
        type: "home",
        location: "Quang Binh"
    },
    phone: "0838609516",
    email: "dangphucnguyen20112005@gmail.com",
    avatar: "",
    bio: "I love chicken"
}
export default address