
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Input, message, Modal, Row, Select, type UploadFile } from 'antd';
import { useState } from 'react';
import UploadImage from '../UploadImage';
import { createAccount } from '../../services/account'; // Assumed service
interface Props {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    refetchData: () => Promise<void>;
}

const NewAccount = ({ isModalOpen, setIsModalOpen, refetchData }: Props) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [isPending, setIsPending] = useState(false);

    const handleNew = async (values: any) => {
        try {
            setIsPending(true);
            const imageFile = fileList[0]?.originFileObj as File;
            await createAccount({
                email: values.email,
                password: values.password,
                role: values.role,
                fullName: values.fullName,
                phoneNumber: values.phoneNumber,
                avatar: imageFile,
            });
            await refetchData();
            messageApi.success('Account created successfully');
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
    };

    return (
        <>
            {contextHolder}
            <Modal
                loading={isPending}
                width={800}
                title="Create Account"
                open={isModalOpen}
                okText="Create"
                onOk={() => form.submit()}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical" onFinish={handleNew}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please enter the email' }, { type: 'email', message: 'Invalid email format' }]}
                            >
                                <Input />
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
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Avatar"
                                rules={[{ required: true, message: 'Please upload an avatar' }]}
                            >
                                <div style={{ border: '1px dashed #d9d9d9', padding: 8, borderRadius: 4 }}>
                                    <UploadImage isPending={isPending} fileList={fileList} setFileList={setFileList} />
                                </div>
                            </Form.Item>
                            <Form.Item
                                label="Role"
                                name="role"
                                rules={[{ required: true, message: 'Please select a role' }]}
                            >
                                <Select
                                    options={[
                                        { value: 'admin', label: 'Admin' },
                                        { value: 'restaurant', label: 'Restaurant' },
                                        { value: 'customer', label: 'Customer' },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please enter the password' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default NewAccount;