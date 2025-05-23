import Toast from "react-native-toast-message";

export const showSuccessToast = (message: string) => {
    Toast.show({
        type: 'success',
        text1: 'My name is Toji',
        text2: message,
        position: 'top',
        visibilityTime: 2500,
    });
};

export const showErrorToast = (message: string) => {
    Toast.show({
        type: 'error',
        text1: 'My name is Toji',
        text2: message,
        position: 'top',
        visibilityTime: 2500,
    });
};