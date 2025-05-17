import { icons } from '@/constants/icons';
import { Image, TextInput, View } from 'react-native'

interface SearchInputProps {
    placeholder?: string;
    editable?: boolean
    className?: string,
    autoFocus?: boolean,
    handleSubmit?: (value: string) => void
}
const SearchInput = ({ placeholder, editable = true, className, autoFocus = false, handleSubmit }: SearchInputProps) => {
    return (
        <View
            className={`rounded-[10px] gap-[12px] px-[20px] w-[359px] h-[65px] bg-[#F6F6F6] flex-row items-center ${className}`}>
            <Image tintColor={"#A0A5BA"} source={icons.search} resizeMode='contain' className='w-[15px] h-[15px]' />
            <TextInput
                onSubmitEditing={(e) => handleSubmit?.(e.nativeEvent.text)}
                returnKeyType="search"
                autoFocus={autoFocus}
                className='w-full h-full '
                placeholder={placeholder}
                placeholderTextColor='#B7B7B7'
                editable={editable} />
        </View>
    )
}

export default SearchInput