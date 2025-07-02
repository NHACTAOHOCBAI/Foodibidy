import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { icons } from '@/constants/icons';
import Input from '@/components/Input';
import { ScrollView } from 'moti';
import { useMyAccount } from '@/context/MyAccountContext';
import Button from '@/components/Button';
import * as ImagePicker from 'expo-image-picker';
import { updateProfile } from '@/services/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { showErrorToast, showSuccessToast } from '@/components/Toast';

interface LocalImageFile {
    uri: string;
    name: string;
    type: string;
    size?: number;
}


const EditProfile = () => {
    const { address, avatar, email, fullName, phoneNumber, setAccountInfo } = useMyAccount();
    const [selectedAvatar, setSelectedAvatar] = useState<LocalImageFile | null>(
        avatar ? { uri: avatar, name: 'avatar.jpg', type: 'image/jpeg' } : null
    );
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required('Full name is required'),
        phoneNumber: Yup.string()
            .matches(/^[0-9]{10,15}$/, 'Phone number must be 10-15 digits')
            .required('Phone number is required'),
    });

    const handleSelectImage = async () => {
        console.log(12);
        try {
            // Request permission to access the photo library
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                showErrorToast('Permission to access photo library is required to select a profile picture.');
                return;
            }

            // Open the photo library
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1], // 1:1 aspect ratio for square cropping
                quality: 1,
            });

            if (result.canceled) {
                console.log('User cancelled image picker');
            } else if (result.assets && result.assets[0].uri) {
                const image = result.assets[0];
                const fileObject: LocalImageFile = {
                    uri: image.uri,
                    name: image.fileName || `avatar_${Date.now()}.jpg`,
                    type: image.mimeType || 'image/jpeg',
                    size: image.fileSize,
                };
                console.log('File object for backend:', fileObject);
                setSelectedAvatar(fileObject);
                showSuccessToast('Profile picture selected successfully.');
            }
        } catch (error) {
            console.error('ImagePicker Error:', error);
            showErrorToast('An error occurred while trying to open the photo library.');
        }
    };

    return (
        <Formik
            initialValues={{
                fullName: fullName || '',
                phoneNumber: phoneNumber || '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                setLoading(true);
                try {
                    // Call API to update profile
                    await updateProfile({
                        fullName: values.fullName,
                        phoneNumber: values.phoneNumber,
                        avatar: selectedAvatar || undefined,
                    });

                    // Update context
                    setAccountInfo({
                        avatar: selectedAvatar?.uri || undefined,
                        fullName: values.fullName,
                        phoneNumber: values.phoneNumber,
                    });

                    console.log('Profile updated with file object:', selectedAvatar);
                    showSuccessToast('Profile updated successfully.');
                } catch (error) {
                    console.error('Update profile error:', error);
                    showErrorToast('An error occurred while updating the profile.');
                } finally {
                    setLoading(false);
                    setSubmitting(false);
                }
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                <ScrollView
                    contentContainerStyle={{
                        alignItems: 'center',
                        paddingBottom: 400,
                    }}
                    className="bg-white flex-1 pt-[120px] px-[24px]"
                >
                    <View className="mb-[30px] relative">
                        {selectedAvatar ? (
                            <Image
                                source={{ uri: selectedAvatar.uri }}
                                className="bg-[#FFBF6D] w-[130px] h-[130px] rounded-full"
                            />
                        ) : (
                            <View className="bg-gray-300 w-[130px] h-[130px] rounded-full justify-center items-center">
                                <Text className="text-gray-500 text-2xl">👤</Text>
                            </View>
                        )}
                        <TouchableOpacity
                            onPress={handleSelectImage}
                            className="absolute bottom-0 right-0 w-[45px] h-[45px] rounded-full items-center justify-center bg-primary"
                        >
                            <Image
                                tintColor="white"
                                source={icons.pencil}
                                resizeMode="contain"
                                className="w-[16px] h-[16px]"
                            />
                        </TouchableOpacity>
                    </View>

                    <View className="gap-[8px] items-start w-full">
                        <Text className="uppercase">full name</Text>
                        <Input
                            value={values.fullName}
                            onChangeText={handleChange('fullName')}
                            onBlur={handleBlur('fullName')}
                            title="Full Name"
                        />
                        {touched.fullName && errors.fullName && (
                            <Text className="text-red-500 text-[12px]">{errors.fullName}</Text>
                        )}
                    </View>

                    <View className="gap-[8px] items-start w-full mt-[24px] mb-[24px]">
                        <Text className="uppercase">Phone number</Text>
                        <Input
                            value={values.phoneNumber}
                            onChangeText={handleChange('phoneNumber')}
                            onBlur={handleBlur('phoneNumber')}
                            title="Phone Number"
                            keyboardType="phone-pad"
                        />
                        {touched.phoneNumber && errors.phoneNumber && (
                            <Text className="text-red-500 text-[12px]">{errors.phoneNumber}</Text>
                        )}
                    </View>

                    <Button
                        onPress={handleSubmit}
                        title="      Update profile      "
                        size="large"
                        loading={loading || isSubmitting} // Combine loading and isSubmitting
                    />
                </ScrollView>
            )}
        </Formik>
    );
};

export default EditProfile;