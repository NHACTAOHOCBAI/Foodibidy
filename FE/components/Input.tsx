import { KeyboardTypeOptions, TextInput } from 'react-native';

interface InputProps {
    title?: string;
    textarea?: boolean;
    value?: string;
    onChangeText?: (text: string) => void;
    onBlur?: (e: any) => void; // quan trọng: để Formik truyền event vào
    secureTextEntry?: boolean;
    keyboardType?: KeyboardTypeOptions;
}


const Input = ({ title, textarea, value, onChangeText, onBlur, secureTextEntry = false, keyboardType }: InputProps) => {
    return (
        <TextInput
            placeholder={title}
            className={`rounded-[10px] text-[16px] text-[#A0A5BA] px-[12px] py-[21px] bg-[#F0F5FA] w-full ${textarea ? 'h-[120px]' : ''
                }`}
            value={value}
            multiline={textarea}
            numberOfLines={textarea ? 4 : 1}
            textAlignVertical={textarea ? 'top' : 'center'}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            onBlur={onBlur}
            keyboardType={keyboardType}
        />
    );
};

export default Input;
