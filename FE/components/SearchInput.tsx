import { icons } from '@/constants/icons';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native'

interface SearchInputProps {
    placeholder?: string;

}
const SearchInput = ({ placeholder }: SearchInputProps) => {
    return (
        <View className='rounded-[10px] gap-[12px] px-[20px] w-[359px] h-[65px] bg-[#F6F6F6] flex-row items-center '>
            <Image tintColor={"#A0A5BA"} source={icons.search} resizeMode='contain' className='w-[15px] h-[15px]' />
            <TextInput
                className='w-full h-full '
                placeholder={placeholder}
                placeholderTextColor='#B7B7B7' />
        </View>
    )
}

export default SearchInput