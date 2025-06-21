import { Formik } from 'formik';
import * as Yup from 'yup';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useEffect } from 'react';

const Login = () => {
    // const navigation = useRouter();
    // useEffect(() => {
    //     // Kiểm tra nếu đã đăng nhập thì chuyển hướng đến trang chính
    //     const isLoggedIn = true; // Thay thế bằng logic kiểm tra đăng nhập thực tế
    //     if (isLoggedIn) {
    //         navigation.push('/(tabs)');
    //     }
    // }, [navigation]);
    const router = useRouter();
    const loginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6, 'Too short').required('Required'),
    });
    return (
        <>
            <View className="flex-1 bg-black">
                <Text className="font-bold text-[30px] text-white w-full text-center mt-[118px]">Log in</Text>
                <Text className="text-[16px] text-white w-full text-center">Please sign in to your existing account</Text>
                <View className="p-[24px] bg-white rounded-[20px] mt-[50px] flex-1">
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={loginSchema}
                        onSubmit={(values) => {
                            console.log('Submitted:', values);
                            // Gọi API login ở đây nếu cần
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

                                <View className="ml-auto mt-[24px] mb-[24px]">
                                    <Text onPress={() => { router.push('/(login)/forgotPassword') }}>Forgot Password</Text>
                                </View>

                                <Button
                                    size="large"
                                    title="Log in"
                                    onPress={handleSubmit}
                                />

                                <Text onPress={() => { router.navigate('/(tabs)') }} className="text-[#646982] text-[16px] mt-[42px] w-full text-center mb-[165px]">
                                    Don't have an account?{" "}
                                    <Text onPress={() => { router.navigate('/(register)') }} className="text-[14px] text-primary">SIGN UP</Text>
                                </Text>
                            </>
                        )}
                    </Formik>
                </View>
            </View>
        </>
    );
};

export default Login;
