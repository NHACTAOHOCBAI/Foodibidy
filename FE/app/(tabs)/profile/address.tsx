import { View, Text, ScrollView, Image, TouchableOpacity, Modal, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants/icons'
import { useMyAccount } from '@/context/MyAccountContext'
import { updateProfile } from '@/services/auth'
import { showErrorToast, showSuccessToast } from '@/components/Toast'

interface Address {
    typeName: string,
    addressName: string
}


const Address = () => {
    const { address, setAccountInfo } = useMyAccount();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newAddress, setNewAddress] = useState({ typeName: '', addressName: '' });

    const handleAddAddress = async () => {
        if (newAddress.typeName && newAddress.addressName) {
            const updatedAddresses = [...(address || []), {
                typeName: newAddress.typeName.toLowerCase(),
                addressName: newAddress.addressName
            }];
            try {
                await updateProfile({ address: updatedAddresses });
                setAccountInfo({ address: updatedAddresses });
                setNewAddress({ typeName: '', addressName: '' });
                setIsModalVisible(false);
                showSuccessToast('Address added successfully!');
            } catch (error) {
                showErrorToast('Failed to add address. Please try again.');
                console.error(error);
            }
        } else {
            showErrorToast('Please fill in both address type and name.');
        }
    };

    const handleDeleteAddress = async (indexToDelete: number) => {
        const updatedAddresses = (address || []).filter((_, index) => index !== indexToDelete);
        try {
            await updateProfile({ address: updatedAddresses });
            setAccountInfo({ address: updatedAddresses });
            showSuccessToast('Address deleted successfully!');
        } catch (error) {
            showErrorToast('Failed to delete address. Please try again.');
            console.error(error);
        }
    };

    return (
        <>
            <ScrollView
                contentContainerStyle={{
                    alignItems: 'center',
                    paddingBottom: 400,
                    gap: 20
                }}
                className='bg-white flex-1 pt-[120px] px-[24px]'>
                {address?.map((items, index) => (
                    <AddressItem
                        key={index}
                        address={items}
                        onDelete={() => handleDeleteAddress(index)}
                    />
                ))}
                <TouchableOpacity
                    onPress={() => setIsModalVisible(true)}
                    className='bg-[#007AFF] rounded-[16px] py-[15px] px-[20px] w-full mt-[20px]'
                >
                    <Text className='text-white text-center font-medium'>
                        Add New Address
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal
                visible={isModalVisible}
                animationType='slide'
                transparent={true}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View className='flex-1 justify-center items-center bg-black/50'>
                    <View className='bg-white rounded-[16px] p-[20px] w-[90%]'>
                        <Text className='text-[18px] font-bold mb-[20px]'>
                            Add New Address
                        </Text>
                        <TextInput
                            className='border border-gray-300 rounded-[8px] p-[10px] mb-[10px]'
                            placeholder='Type (home/work)'
                            value={newAddress.typeName}
                            onChangeText={(text) => setNewAddress({ ...newAddress, typeName: text })}
                        />
                        <TextInput
                            className='border border-gray-300 rounded-[8px] p-[10px] mb-[20px]'
                            placeholder='Address'
                            value={newAddress.addressName}
                            onChangeText={(text) => setNewAddress({ ...newAddress, addressName: text })}
                        />
                        <View className='flex-row justify-end gap-[10px]'>
                            <Button
                                title='Cancel'
                                onPress={() => setIsModalVisible(false)}
                            />
                            <Button
                                title='Add'
                                onPress={handleAddAddress}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const AddressItem = ({ address, onDelete }: { address: Address, onDelete: () => void }) => {
    return (
        <View className='rounded-[16px] bg-[#F0F5FA] w-full p-[15px] flex-row'>
            <View className='w-[48px] h-[48px] justify-center items-center bg-white rounded-full'>
                <Image
                    resizeMode='contain'
                    className='w-[20px] h-[20px]'
                    source={address.typeName === 'home' ? icons.homeIcon : icons.workIcon}
                />
            </View>
            <View className='ml-[14px] gap-[11px] flex-1'>
                <View className='flex-row w-full items-center'>
                    <Text className='uppercase'>{address.typeName}</Text>
                    <Image
                        resizeMode='contain'
                        className='w-[16px] h-[16px] ml-auto mr-[21px]'
                    />
                    <TouchableOpacity onPress={onDelete}>
                        <Image
                            resizeMode='contain'
                            className='w-[16px] h-[16px]'
                            source={icons.deleteIcon}
                        />
                    </TouchableOpacity>
                </View>
                <Text
                    numberOfLines={2}
                    className='text-[#A0A5BA]'
                >{address.addressName}</Text>
            </View>
        </View>
    )
}

export default Address