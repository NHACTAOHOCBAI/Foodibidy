import { Col, Form, Input, InputNumber, message, Modal, Row, Select, type UploadFile } from 'antd';
import { useEffect, useState } from 'react';
import UploadImage from '../UploadImage';


const UpdateFood = ({ isModalOpen, setIsModalOpen, updatedFood }: { isModalOpen: boolean; setIsModalOpen: (value: boolean) => void; updatedFood: Food | undefined }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [isPending, setIsPending] = useState(false);
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleUpdate = async (values: Food) => {
        console.log(values);
    }
    useEffect(() => {
        form.setFieldsValue(updatedFood);
        setFileList([
            {
                uid: '-1',
                name: 'dish_image.jpg',
                status: 'done',
                url: updatedFood?.dishImage
            },
        ])
    }, [updatedFood, form]);
    return (
        <>
            {contextHolder}
            <Modal
                width={700}
                title="Update Food"
                open={isModalOpen}
                okText="Update "
                onOk={() => form.submit()}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical" onFinish={handleUpdate}>
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

export default UpdateFood