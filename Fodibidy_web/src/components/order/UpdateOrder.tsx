import { Form, Input, message, Modal, Select } from "antd"
import { useEffect, useState } from "react"
import { updateOrder } from "../../services/order"
interface Props {
    isUpdateOpen: boolean
    setIsUpdateOpen: (value: boolean) => void
    updatedOrder: Order | undefined
    setUpdatedOrder: (value: Order | undefined) => void
    refetchData: () => Promise<void>
}
const UpdateOrder = ({ isUpdateOpen, setIsUpdateOpen, updatedOrder, setUpdatedOrder, refetchData }: Props) => {
    const [form] = Form.useForm();
    const [isPending, setIsPending] = useState(false);
    const [isOngoingStatus, setIsOngoingStatus] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const handleCancel = () => {
        setIsUpdateOpen(false);
        form.resetFields();
        setUpdatedOrder(undefined)
    };
    const handleUpdate = async (values: Order) => {
        try {
            setIsPending(true)
            if (isOngoingStatus)
                await updateOrder(String(updatedOrder?.id), { status: values.status, shipperName: values.shipperName, shipperPhone: values.shipperPhone })
            else
                await updateOrder(String(updatedOrder?.id), { status: values.status })
            await refetchData()
            messageApi.success("Update order successfully")
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
    const handleOnchangeStatus = (value: string) => {
        if (value === 'ongoing') {
            setIsOngoingStatus(true)
        }
        else setIsOngoingStatus(false)
    }
    useEffect(() => {
        if (updatedOrder?.status === 'ongoing') {
            setIsOngoingStatus(true)
        }
        else setIsOngoingStatus(false)
        form.setFieldsValue({
            status: updatedOrder?.status || undefined,
            shipperPhone: updatedOrder?.shipperPhone || undefined,
            shipperName: updatedOrder?.shipperName || undefined,
        });
    }, [updatedOrder, form])
    return (
        <>
            {contextHolder}
            <Modal
                loading={isPending}
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
        </>
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