import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import Input from '@/components/Input';
import Button from '@/components/Button';

const ForgetPassword = () => {
    const router = useRouter();

    const forgotSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
    });

    return (
        <View className="flex-1 bg-black">
            <Text className="font-bold text-[30px] text-white w-full text-center mt-[118px]">Forgot Password</Text>
            <Text className="text-[16px] text-white w-full text-center">Please enter your email to receive a code</Text>

            <View className="p-[24px] bg-white rounded-[20px] mt-[50px] flex-1">
                <Formik
                    initialValues={{ email: '' }}
                    validationSchema={forgotSchema}
                    onSubmit={(values) => {
                        console.log('Send code to:', values.email);
                        router.push('/(login)/verification');
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <>
                            <Text className="mb-[8px]">EMAIL</Text>
                            <Input
                                title="example@gmail.com"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                keyboardType="email-address"
                            />
                            {touched.email && errors.email && (
                                <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>
                            )}

                            <View className="mt-[30px]">
                                <Button
                                    onPress={handleSubmit}
                                    size="large"
                                    title="Send Code"
                                />
                            </View>
                        </>
                    )}
                </Formik>
            </View>
        </View>
    );
};

export default ForgetPassword;
