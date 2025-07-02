import { icons } from '@/constants/icons';
import { Image, TextInput, View } from 'react-native';

interface SearchInputProps {
    value?: string
    placeholder?: string;
    editable?: boolean;
    className?: string;
    autoFocus?: boolean;
    handleSubmit?: (value: string) => void;
}

const SearchInput = ({ value, placeholder, editable = true, className, autoFocus = false, handleSubmit }: SearchInputProps) => {
    return (
        <View
            className={`rounded-[10px] gap-[12px] px-[20px] w-full h-[65px] bg-[#F6F6F6] flex-row items-center ${className}`}>
            <Image
                tintColor="#A0A5BA"
                source={icons.search}
                resizeMode="contain"
                className="w-[15px] h-[15px]"
            />
            <TextInput
                value={value}
                onChangeText={handleSubmit} // Gọi handleSubmit trên mỗi thay đổi văn bản
                onSubmitEditing={(e) => handleSubmit?.(e.nativeEvent.text)} // Giữ onSubmitEditing để hỗ trợ phím search
                returnKeyType="search"
                autoFocus={autoFocus}
                className="flex-1 h-full"
                placeholder={placeholder}
                placeholderTextColor="#B7B7B7"
                editable={editable}
            />
        </View>
    );
};

export default SearchInput;