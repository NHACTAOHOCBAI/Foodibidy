import { TextInput } from 'react-native';

interface InputProps {
    title?: string;
    textarea?: boolean;
}

const Input = ({ title, textarea }: InputProps) => {
    return (
        <TextInput
            className={`rounded-[10px] text-[16px] text-[#A0A5BA] px-[12px] py-[21px] bg-[#F0F5FA] w-full ${textarea ? 'h-[120px]' : ''
                }`}
            value={title}
            multiline={textarea}
            numberOfLines={textarea ? 4 : 1}
            textAlignVertical={textarea ? 'top' : 'center'}
        />
    );
};

export default Input;
