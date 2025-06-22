import { Col, Form, Input, InputNumber, message, Modal, Row, Select, type UploadFile } from 'antd';
import { useEffect, useState } from 'react';
import UploadImage from '../UploadImage';
import { categoryOptions } from '../../utils/selectOptions';
import { updateDish } from '../../services/food';

const currentRestaurant = {
    id: "tDF8JPDfjgTbTApXnBiR",
    restaurantName: "Ẩm Thực Miền Trung"
}
const UpdateFood = ({ isModalOpen, setIsModalOpen, updatedFood, refetchData, setUpdatedFood }: { isModalOpen: boolean; setIsModalOpen: (value: boolean) => void; updatedFood: Food | undefined, refetchData: () => Promise<void>, setUpdatedFood: (value: Food | undefined) => void }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm();
    const [categoryOpt, setCategoryOpt] = useState<{ value: string, label: string }[]>([])
    const [category, setCategory] = useState<{ id: string, name: string }>({ id: "", name: "" })
    const [messageApi, contextHolder] = message.useMessage();
    const [isPending, setIsPending] = useState(false);
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setFileList([
            {
                uid: '-1',
                name: 'food_image_logo.jpg',
                status: 'done',
                url: "abc"
            },
        ])
        setUpdatedFood(undefined)
    };

    const handleUpdate = async (values: Food) => {
        try {
            setIsPending(true)
            const imageFile = fileList[0]?.originFileObj as File;
            await updateDish(updatedFood?.id as string, currentRestaurant, category, values.dishName, values.description, values.price, imageFile)
            await refetchData()
            messageApi.success("Update Food successfully")
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
        form.setFieldsValue(updatedFood);
        form.setFieldValue('category', updatedFood?.category.id)
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
                                <Input />
                            </Form.Item>
                        </Col>

                        {/* Cột phải */}
                        <Col span={12}>
                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[{ required: true, message: 'Please enter the price' }]}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item
                                label="Category"
                                name="category"
                                rules={[{ required: true, message: 'Please select a category' }]}
                            >
                                <Select options={categoryOpt}
                                    onChange={(value, option) => {
                                        const opt = option as { value: string; label: string };
                                        setCategory({
                                            id: value,
                                            name: opt.label
                                        })
                                    }} />
                            </Form.Item>

                            <Form.Item
                                label="Quantity"
                                name="remainingQuantity"
                                rules={[{ required: true, message: 'Please enter the quantity' }]}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

            </Modal>

        </>
    );
};

export default UpdateFood