/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, message, Modal, Select, type UploadFile } from 'antd';
import { useEffect, useState } from 'react';
import UploadImage from '../UploadImage';
import { updateAccount } from '../../services/account'; // Assumed service

interface Props {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    refetchData: () => Promise<void>;
    updatedAccount: Account | undefined;
    setUpdatedAccount: (value: Account | undefined) => void;
}

const UpdateAccount = ({ isModalOpen, setIsModalOpen, refetchData, updatedAccount, setUpdatedAccount }: Props) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [isPending, setIsPending] = useState(false);

    const handleUpdate = async (values: any) => {
        try {
            setIsPending(true);
            const imageFile = fileList[0]?.originFileObj as File;
            await updateAccount(updatedAccount?.id as string, {
                fullName: values.fullName,
                phoneNumber: values.phoneNumber,
                avatar: imageFile,
            });
            await refetchData();
            messageApi.success('Account updated successfully');
            handleCancel();
        } catch (error) {
            if (error instanceof Error) {
                messageApi.error(error.message);
            } else {
                messageApi.error('An unexpected error occurred');
            }
        } finally {
            setIsPending(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setFileList([]);
        setUpdatedAccount(undefined);
    };

    useEffect(() => {
        if (updatedAccount) {
            setFileList([
                {
                    uid: '-1',
                    name: 'avatar.jpg',
                    status: 'done',
                    url: updatedAccount.avatar,
                },
            ]);
            form.setFieldsValue({
                id: updatedAccount.id,
                email: updatedAccount.email,
                role: updatedAccount.role,
                fullName: updatedAccount.fullName,
                phoneNumber: updatedAccount.phoneNumber,
            });
        }
    }, [updatedAccount, form]);

    return (
        <>
            {contextHolder}
            <Modal
                loading={isPending}
                width={800}
                title="Update Account"
                open={isModalOpen}
                okText="Update"
                onOk={() => form.submit()}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical" onFinish={handleUpdate}>
                    <Form.Item label="ID" name="id">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please enter the email' }, { type: 'email', message: 'Invalid email format' }]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[{ required: true, message: 'Please enter the full name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Please enter the phone number' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Role"
                        name="role"
                        rules={[{ required: true, message: 'Please select a role' }]}
                    >
                        <Select
                            disabled
                            options={[
                                { value: 'admin', label: 'Admin' },
                                { value: 'restaurant', label: 'Restaurant' },
                                { value: 'customer', label: 'Customer' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Avatar"
                        rules={[{ required: true, message: 'Please upload an avatar' }]}
                    >
                        <div style={{ border: '1px dashed #d9d9d9', padding: 8, borderRadius: 4 }}>
                            <UploadImage isPending={isPending} fileList={fileList} setFileList={setFileList} />
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UpdateAccount;