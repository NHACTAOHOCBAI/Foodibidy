// components/TextDefault.tsx
import { Text, TextProps } from "react-native";

const TextDefault = (props: TextProps) => {
    return (
        <Text {...props} style={[{ fontFamily: "Sen-Regular" }, props.style]}>
            {props.children}
        </Text>
    );
};

export default TextDefault;
