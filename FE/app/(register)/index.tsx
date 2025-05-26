import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';
import { ScrollView } from 'moti';
import { Text, View } from 'react-native';

import Input from '@/components/Input';
import Button from '@/components/Button';

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
                    onSubmit={(values) => {
                        console.log('Register with:', values);
                        router.push('/(tabs)');
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
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
                                />
                            </View>
                        </>
                    )}
                </Formik>
            </View>
        </ScrollView>
    );
};

export default Signup;
