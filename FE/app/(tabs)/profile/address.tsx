import { View, Text, ScrollView } from 'react-native'
import React from 'react'

const address = () => {
    return (
        <View>
            <ScrollView>

            </ScrollView>
        </View>
    )
}
const AddressItem = () => {
    return (
        <View className='rounded-[16px] bg-[#F0F5FA]'>
            <View className='w-[48px] h-[48px'>

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
export default address