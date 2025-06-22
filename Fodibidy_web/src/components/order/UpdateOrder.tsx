import { Form, Input, Modal, Select } from "antd"
import { useEffect, useState } from "react"
interface Props {
    isUpdateOpen: boolean
    setIsUpdateOpen: (value: boolean) => void
    updatedOrder: Order | undefined
}
const UpdateOrder = ({ isUpdateOpen, setIsUpdateOpen, updatedOrder }: Props) => {
    const [form] = Form.useForm();
    const [isPending, setIsPending] = useState(false);
    const [isOngoingStatus, setIsOngoingStatus] = useState(false)
    const handleCancel = () => {
        setIsUpdateOpen(false);
    };
    const handleUpdate = async (values: Food) => {
        console.log(values);
    }
    const handleOnchangeStatus = (value: string) => {
        if (value === 'ongoing') {
            setIsOngoingStatus(true)
        }
        else setIsOngoingStatus(false)
    }
    useEffect(() => {
        console.log(updatedOrder)
        if (updatedOrder?.status === 'ongoing') {
            setIsOngoingStatus(true)
        }
        else setIsOngoingStatus(false)
        form.setFieldsValue({
            status: updatedOrder?.status || undefined,
            shipperPhone: updatedOrder?.shipperPhone || undefined,
            shipperName: updatedOrder?.shipperName || undefined,
        });
    }, [updatedOrder])
    return (
        <Modal
            width={700}
            title="Update Order"
            open={isUpdateOpen}
            okText="Update "
            onOk={() => form.submit()}
            onCancel={handleCancel}
        >
            <Form form={form} layout="vertical" onFinish={handleUpdate}>
                <Form.Item
                    label="Status"
                    name="status"
                    rules={[{ required: true, message: "Status is requried" }]}
                >
                    <Select onChange={handleOnchangeStatus} options={statusOptions} />
                </Form.Item>
                {
                    isOngoingStatus && (
                        <>
                            <Form.Item
                                label="Phone"
                                name="shipperPhone"
                                rules={[{ required: true, message: "Shipper Phone is requried" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Shipper"
                                name="shipperName"
                                rules={[{ required: true, message: "Shipper Name is requried" }]}
                            >
                                <Input />
                            </Form.Item>
                        </>
                    )
                }
            </Form>
        </Modal>
    )
}
const statusOptions =
    [
        { value: 'pending', label: 'Pending' },
        { value: 'preparing', label: 'Preparing' },
        { value: 'ongoing', label: 'Ongoing' },
        { value: 'delivered', label: 'Delivered' },
        { value: 'cancelled', label: 'Cancelled' },
    ]
export default UpdateOrder