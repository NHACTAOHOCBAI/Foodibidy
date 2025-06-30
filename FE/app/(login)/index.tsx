import { Formik } from 'formik';
import * as Yup from 'yup';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { storeToken } from '@/configs/accessTokent';
import { login } from '@/services/auth';
import { showErrorToast, showSuccessToast } from '@/components/Toast';
import { useMyAccount } from '@/context/MyAccountContext';

const Login = () => {
    const { setAccountInfo } = useMyAccount();
    const router = useRouter();
    const loginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6, 'Too short').required('Required'),
    });

    return (
        <View className="flex-1 bg-black">
            <Text className="font-bold text-[30px] text-white w-full text-center mt-[118px]">Log in</Text>
            <Text className="text-[16px] text-white w-full text-center">Please sign in to your existing account</Text>
            <View className="p-[24px] bg-white rounded-[20px] mt-[50px] flex-1">
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={loginSchema}
                    onSubmit={async (values, { setSubmitting, setFieldError }) => {
                        try {
                            const response = await login(values.email, values.password);
                            console.log(response)
                            const { idToken, email, avatar, fullName, phoneNumber } = response;
                            setAccountInfo({ avatar, phoneNumber, fullName, email }) // Giả sử API trả về accessToken
                            await storeToken(idToken); // Lưu token
                            showSuccessToast('Login successful!'); // Hiển thị toast thành công
                            router.push('/(tabs)'); // Chuyển hướng sau khi đăng nhập thành công
                        } catch (error: any) {
                            console.error('Login error:', error);
                            showErrorToast('Invalid email or password'); // Hiển thị toast lỗi
                            setFieldError('email', 'Invalid email or password');
                            setFieldError('password', 'Invalid email or password');
                        } finally {
                            setSubmitting(false); // Kết thúc trạng thái submitting
                        }
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
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
                            // Vô hiệu hóa nút khi đang submitting
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
    );
};

export default Login;