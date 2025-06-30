import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';
import { ScrollView } from 'moti';
import { Text, View } from 'react-native';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { register } from '@/services/auth';
import { storeToken } from '@/configs/accessTokent';
import { showErrorToast, showSuccessToast } from '@/components/Toast';

const Signup = () => {
    const router = useRouter();

    const signupSchema = Yup.object().shape({
        name: Yup.string().min(2, 'Too short').required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6, 'Too short').required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Required'),
    });

    return (
        <ScrollView className="flex-1 bg-black">
            <Text className="font-bold text-[30px] text-white w-full text-center mt-[118px]">Sign up</Text>
            <Text className="text-[16px] text-white w-full text-center">Please sign up to get started</Text>

            <View className="p-[24px] bg-white rounded-[20px] mt-[50px] h-fit pb-[350px]">
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={signupSchema}
                    onSubmit={async (values, { setSubmitting, setFieldError }) => {
                        try {
                            await register(values.email, values.password, values.name);
                            showSuccessToast('Sign up successful!'); // Hiển thị toast thành công
                            router.push('/(login)'); // Chuyển hướng sau khi đăng ký thành công
                        } catch (error: any) {
                            console.error('Signup error:', error);
                            const errorMessage = error.response?.data?.message || 'Failed to sign up';
                            showErrorToast(errorMessage); // Hiển thị toast lỗi
                            setFieldError('email', errorMessage);
                        } finally {
                            setSubmitting(false); // Kết thúc trạng thái submitting
                        }
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                        <>
                            <Text className="mb-[8px]">NAME</Text>
                            <Input
                                title="John Doe"
                                value={values.name}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                            />
                            {touched.name && errors.name && (
                                <Text className="text-red-500 text-sm mt-1">{errors.name}</Text>
                            )}

                            <Text className="mb-[8px] mt-[24px]">EMAIL</Text>
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

                            <Text className="mb-[8px] mt-[24px]">PASSWORD</Text>
                            <Input
                                title="password"
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                secureTextEntry
                            />
                            {touched.password && errors.password && (
                                <Text className="text-red-500 text-sm mt-1">{errors.password}</Text>
                            )}

                            <Text className="mb-[8px] mt-[24px]">CONFIRM PASSWORD</Text>
                            <Input
                                title="confirm password"
                                value={values.confirmPassword}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                secureTextEntry
                            />
                            {touched.confirmPassword && errors.confirmPassword && (
                                <Text className="text-red-500 text-sm mt-1">{errors.confirmPassword}</Text>
                            )}

                            <View className="mt-[47px]">
                                <Button
                                    size="large"
                                    title="Sign up"
                                    onPress={handleSubmit}
                                // Vô hiệu hóa nút khi đang submitting
                                />
                            </View>

                            <Text className="text-[#646982] text-[16px] mt-[42px] w-full text-center mb-[165px]">
                                You already have an account ?{" "}
                                <Text onPress={() => { router.navigate('/(login)') }} className="text-[14px] text-primary">LOG IN</Text>
                            </Text>
                        </>
                    )}
                </Formik>
            </View>
        </ScrollView>
    );
};

export default Signup;