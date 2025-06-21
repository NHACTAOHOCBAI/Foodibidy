import { Col, Form, Input, InputNumber, message, Modal, Row, Select, type UploadFile } from 'antd';
import { useState } from 'react';
import UploadImage from '../UploadImage';


const NewFood = ({ isModalOpen, setIsModalOpen }: { isModalOpen: boolean; setIsModalOpen: (value: boolean) => void }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [isPending, setIsPending] = useState(false);
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleNew = async (values: Food) => {
        console.log(values);
    }
    return (
        <>
            {contextHolder}
            <Modal
                width={700}
                title="Create Food"
                open={isModalOpen}
                okText="Create "
                onOk={() => form.submit()}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical" onFinish={handleNew}>
                    <Row gutter={16}>
                        {/* Cột trái */}
                        <Col span={12}>
                            <Form.Item label="Image">
                                <div style={{ border: '1px dashed #d9d9d9', padding: 8, borderRadius: 4 }}>
                                    <UploadImage
                                        isPending={isPending}
                                        fileList={fileList}
                                        setFileList={setFileList}
                                    />
                                </div>
                            </Form.Item>
                            <Form.Item
                                label="Food"
                                name="dishName"
                                rules={[{ required: true, message: 'Please enter the food name' }]}
                            >
                                <Input disabled={isPending} />
                            </Form.Item>
                        </Col>

                        {/* Cột phải */}
                        <Col span={12}>
                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[{ required: true, message: 'Please enter the price' }]}
                            >
                                <InputNumber disabled={isPending} style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item
                                label="Category"
                                name="category"
                                rules={[{ required: true, message: 'Please select a category' }]}
                            >
                                <Select disabled={isPending} />
                            </Form.Item>

                            <Form.Item
                                label="Quantity"
                                name="remainingQuantity"
                                rules={[{ required: true, message: 'Please enter the quantity' }]}
                            >
                                <InputNumber disabled={isPending} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

            </Modal>

        </>
    );
};

export default NewFood