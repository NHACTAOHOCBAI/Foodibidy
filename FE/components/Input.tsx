import { View, Text, TextInput } from 'react-native'
import React from 'react'
interface InputProps {
    title?: string
}
const Input = ({ title }: InputProps) => {
    return (
        <TextInput className='rounded-[10px] text-[16px] text-[#A0A5BA] px-[12px] py-[21px] bg-[#F0F5FA]' value={title} />
    )
}

export default Input