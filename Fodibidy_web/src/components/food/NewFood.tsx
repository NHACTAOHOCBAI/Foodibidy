import { Col, Form, Input, InputNumber, message, Modal, Row, Select, type UploadFile } from 'antd';
import { useEffect, useState } from 'react';
import UploadImage from '../UploadImage';
import { categoryOptions } from '../../utils/selectOptions';
import { createDish } from '../../services/food';
import TextArea from 'antd/es/input/TextArea';

const NewFood = ({ isModalOpen, setIsModalOpen, refetchData }: { isModalOpen: boolean; setIsModalOpen: (value: boolean) => void, refetchData: () => Promise<void> }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [isPending, setIsPending] = useState(false);
    const [categoryOpt, setCategoryOpt] = useState<{ value: string, label: string }[]>([])
    const [category, setCategory] = useState<{ id: string, name: string }>({ id: "", name: "" })
    const handleCancel = () => {
        form.resetFields()
        setIsModalOpen(false);
    };

    const handleNew = async (values: Food) => {
        try {
            setIsPending(true)
            const imageFile = fileList[0]?.originFileObj as File;
            await createDish(category, values.dishName, values.description, values.price, imageFile, values.remainingQuantity as number)
            await refetchData()
            messageApi.success("Create Food successfully")
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
    useEffect(() => {
        const fetchOpt = async () => {
            const res = await categoryOptions()
            setCategoryOpt(res)
        }
        fetchOpt()
    }, [])
    return (
        <>
            {contextHolder}
            <Modal
                loading={isPending}
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
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[{ required: true, message: 'Please enter the price' }]}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>

                        {/* Cột phải */}
                        <Col span={12}>
                            <Form.Item
                                label="Category"
                                name="category"
                                rules={[{ required: true, message: 'Please select a category' }]}
                            >
                                <Select
                                    options={categoryOpt}
                                    onChange={(value, option) => {
                                        const opt = option as { value: string; label: string };
                                        setCategory({
                                            id: value,
                                            name: opt.label
                                        })
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[{ required: true, message: 'Please enter the price' }]}
                            >
                                <TextArea rows={5} style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item
                                label="Quantity"
                                name="remainingQuantity"
                                rules={[{ required: true, message: 'Please enter the quantity' }]}
                            >
                                <InputNumber min={0} style={{ width: '100%' }} />
                            </Form.Item>


                        </Col>
                    </Row>
                </Form>

            </Modal>

        </>
    );
};

export default NewFood