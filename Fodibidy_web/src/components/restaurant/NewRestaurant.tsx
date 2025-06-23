/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Input, message, Modal, Row, type UploadFile } from "antd"
import { useState } from "react";
import UploadImage from "../UploadImage";
import TextArea from "antd/es/input/TextArea";
import { createRestaurant } from "../../services/restaurant";
interface Props {
    isModalOpen: boolean,
    setIsModalOpen: (value: boolean) => void,
    refetchData: () => Promise<void>
}
const NewRestaurant = ({ isModalOpen, setIsModalOpen, refetchData }: Props) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [isPending, setIsPending] = useState(false);
    const handleNew = async (values: any) => {
        try {
            setIsPending(true)
            const imageFile = fileList[0]?.originFileObj as File;
            await createRestaurant(
                {
                    email: values.email,
                    password: values.password,
                    fullName: values.fullName,
                    phoneNumber: values.phoneNumber,
                },
                {
                    restaurantName: values.restaurantName,
                    address: values.address,
                    restaurantImage: imageFile,
                    phoneNumber: values.restaurantPhone,
                    bio: values.bio
                }
            )
            await refetchData()
            messageApi.success("Create restaurant successfully")
            handleCancel()
        }
        catch (error) {
            if (error instanceof Error) {
                messageApi.error(error.message);
            } else {
                messageApi.error("An unexpected error occurred");
            }
        }
        setIsPending(false)
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            {contextHolder}
            <Modal
                loading={isPending}
                width={1000}
                title="Create Restaurant"
                open={isModalOpen}
                okText="Create "
                onOk={() => form.submit()}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical" onFinish={handleNew}>
                    <Row gutter={16}>
                        {/* Cột trái */}
                        <Col span={12}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please enter the email' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Full name"
                                name="fullName"
                                rules={[{ required: true, message: 'Please enter the full name' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Phone"
                                name="phoneNumber"
                                rules={[{ required: true, message: 'Please enter the phone' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please enter the password' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </Col>

                        {/* Cột phải */}
                        <Col span={12}>
                            <Form.Item label="Restaurant image">
                                <div style={{ border: '1px dashed #d9d9d9', padding: 8, borderRadius: 4 }}>
                                    <UploadImage
                                        isPending={isPending}
                                        fileList={fileList}
                                        setFileList={setFileList}
                                    />
                                </div>
                            </Form.Item>
                            <Form.Item
                                label="Restaurant name"
                                name="restaurantName"
                                rules={[{ required: true, message: 'Please enter the restaurant name' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Address"
                                name="address"
                                rules={[{ required: true, message: 'Please enter the address' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Restaurant Phone"
                                name="restaurantPhone"
                                rules={[{ required: true, message: 'Please enter the restaurant phone' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Bio"
                                name="bio"
                                rules={[{ required: true, message: 'Please enter the restaurant bio' }]}
                            >
                                <TextArea />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}
export default NewRestaurant