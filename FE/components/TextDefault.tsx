// components/TextDefault.tsx
import { Text, TextProps } from "react-native";

const TextDefault = (props: TextProps) => {
    return (
        <Text {...props} style={[{ fontFamily: "Sen-Regular", fontSize: 14 }, props.style]}>
            {props.children}
        </Text>
    );
};

export default TextDefault;
