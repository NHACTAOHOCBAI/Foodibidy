/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, message, Modal, type UploadFile } from "antd"
import { useEffect, useState } from "react";
import UploadImage from "../UploadImage";
import TextArea from "antd/es/input/TextArea";
import { updateRestaurant } from "../../services/restaurant";
interface Props {
    isModalOpen: boolean,
    setIsModalOpen: (value: boolean) => void,
    refetchData: () => Promise<void>,
    updatedRestaurant: Restaurant | undefined,
    setUpdatedRestaurant: (value: Restaurant | undefined) => void
}
const UpdateRestaurant = ({ isModalOpen, setIsModalOpen, refetchData, updatedRestaurant, setUpdatedRestaurant }: Props) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [isPending, setIsPending] = useState(false);
    const handleUpdate = async (values: any) => {
        try {
            setIsPending(true)
            const imageFile = fileList[0]?.originFileObj as File;
            await updateRestaurant(
                updatedRestaurant?.id as string,
                values.restaurantName,
                values.address,
                values.restaurantPhone,
                values.bio,
                imageFile,
            )
            await refetchData()
            messageApi.success("Update restaurant successfully")
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
        form.resetFields();
        setFileList([
            {
                uid: '-1',
                name: 'restaurant_image.jpg',
                status: 'done',
                url: "abc"
            },
        ])
        setUpdatedRestaurant(undefined)
    };
    useEffect(() => {
        setFileList([
            {
                uid: '-1',
                name: 'restaurant_image.jpg',
                status: 'done',
                url: updatedRestaurant?.restaurantImage
            },
        ])
        form.setFieldsValue({
            id: updatedRestaurant?.id,
            restaurantName: updatedRestaurant?.restaurantName,
            address: updatedRestaurant?.address,
            restaurantPhone: updatedRestaurant?.phoneNumber,
            bio: updatedRestaurant?.bio
        });
    }, [updatedRestaurant, form])
    return (
        <>
            {contextHolder}
            <Modal
                loading={isPending}
                width={1000}
                title="Update Restaurant"
                open={isModalOpen}
                okText="Update "
                onOk={() => form.submit()}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical" onFinish={handleUpdate}>
                    <Form.Item
                        label="ID"
                        name="id"
                    >
                        <Input disabled />
                    </Form.Item>
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
                </Form>
            </Modal>
        </>
    )
}
export default UpdateRestaurant