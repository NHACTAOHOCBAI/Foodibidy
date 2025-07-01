import { Form, InputNumber, message, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import { getMyDish, restockDish } from '../../services/food';


const Restock = ({ isModalOpen, setIsModalOpen, refetchData }: { isModalOpen: boolean; setIsModalOpen: (value: boolean) => void, refetchData: () => Promise<void> }) => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [isPending, setIsPending] = useState(false);
    const [foodsOpt, setFoodsOpt] = useState<{ value: string, label: string }[]>([])
    const handleCancel = () => {
        form.resetFields()
        setIsModalOpen(false);
    };
    const handleRestock = async ({ food, quantity }: { food: string, quantity: number }) => {
        try {
            setIsPending(true)
            const value = JSON.parse(food)
            await restockDish(value, quantity)
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
            const res = await getMyDish()
            const value = res.map((record) => {
                return {
                    value: JSON.stringify(record),
                    label: record.dishName
                }
            })
            setFoodsOpt(value)
        }
        fetchOpt()
    }, [isModalOpen])
    return (
        <>
            {contextHolder}
            <Modal
                loading={isPending}
                width={500}
                title="Restock Food"
                open={isModalOpen}
                okText="Restock "
                onOk={() => form.submit()}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical" onFinish={handleRestock}>
                    <Form.Item
                        label="Food"
                        name="food"
                        rules={[{ required: true, message: 'Please select a food' }]}
                    >
                        <Select
                            options={foodsOpt}

                        />
                    </Form.Item>
                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[{ required: true, message: 'Please enter quantity' }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                </Form>

            </Modal>

        </>
    );
};

export default Restock