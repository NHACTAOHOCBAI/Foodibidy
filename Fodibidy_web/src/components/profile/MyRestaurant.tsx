/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Button, Select, message } from "antd";
import { useEffect, useState } from "react";
import type { UploadFile } from "antd/es/upload/interface";
import TextArea from "antd/es/input/TextArea";
import UploadImage from "../UploadImage";
import { MdOutlineStar } from "react-icons/md";
import convertDateFormat from "../../utils/convertDateFormat";

interface MyRestaurantProps {
    myRestaurant: any;
    fetchMyProfile: () => Promise<void>
}

const MyRestaurant = ({ myRestaurant, fetchMyProfile }: MyRestaurantProps) => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [isPending, setIsPending] = useState(false)
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const onFinish = async (values: any) => {
        setIsPending(true)
        try {
            await fetchMyProfile()
        }
        catch (error) {
            if (error instanceof Error) {
                messageApi.error(error.message);
            } else {
                messageApi.error("An unexpected error occurred");
            }
        }
        console.log('Success:', values);
        setIsPending(false)
    };
    const handleReset = () => {
        form.setFieldsValue({
            restaurantName: myRestaurant?.restaurantName,
            address: myRestaurant?.address,
            status: myRestaurant?.status,
            phoneNumber: myRestaurant?.phoneNumber,
            bio: myRestaurant?.bio
        })
        setFileList([
            {
                uid: '-1',
                name: 'avatar.jpg',
                status: 'done',
                url: myRestaurant?.avatar
            },
        ])
    }
    useEffect(() => {
        form.setFieldsValue({
            restaurantName: myRestaurant?.restaurantName,
            address: myRestaurant?.address,
            status: myRestaurant?.status,
            phoneNumber: myRestaurant?.phoneNumber,
            bio: myRestaurant?.bio
        })
        setFileList([
            {
                uid: '-1',
                name: 'avatar.jpg',
                status: 'done',
                url: myRestaurant?.avatar
            },
        ])
    }, [myRestaurant, form])
    return (
        <>
            {contextHolder}
            <Form
                form={form}
                layout="vertical"
                name="basic"
                labelCol={{ span: 26 }}
                wrapperCol={{ span: 42 }}
                style={{ maxWidth: 1200 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <div style={{ display: 'flex', gap: 20 }}>
                    <div>
                        <Form.Item
                            label="Restaurant Name"
                            name="restaurantName"
                            rules={[{ required: true, message: 'Enter restaurant name!' }]}
                        >
                            <Input disabled={isPending} style={{ width: 400 }} />
                        </Form.Item>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: 'Enter restaurant address!' }]}
                        >
                            <Input disabled={isPending} />
                        </Form.Item>
                        <Form.Item
                            label="Status"
                            name="status"
                            rules={[{ required: true, message: 'Enter restaurant status!' }]}
                        >
                            <Select disabled={isPending} />
                        </Form.Item>
                        <Form.Item
                            label="Phone"
                            name="phoneNumber"
                            rules={[{ required: true, message: 'Enter restaurant phone!' }]}
                        >
                            <Input disabled={isPending} />
                        </Form.Item>
                        <Form.Item
                            label="Bio"
                            name="bio"
                            rules={[{ required: true, message: 'Enter restaurant bio!' }]}
                        >
                            <TextArea
                                disabled={isPending}
                                rows={3}
                            />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Image">
                            <div style={{ border: '1px dashed #d9d9d9', padding: 8, borderRadius: 4, width: 400 }}>
                                <UploadImage
                                    isPending={isPending}
                                    fileList={fileList}
                                    setFileList={setFileList}
                                />
                            </div>
                        </Form.Item>
                        <p>Sold item : {myRestaurant?.purchase}</p>
                        <div style={{ display: "flex", alignItems: 'center', gap: 10 }}>
                            Rating : {myRestaurant?.rating} <MdOutlineStar size={20} style={{ color: "yellow" }} />
                        </div>
                        <p>Created at : {convertDateFormat(myRestaurant?.createdAt)}</p>
                        <p>Owner : {myRestaurant?.user.fullName} ({myRestaurant?.user.phoneNumber})</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 20 }}>
                    <Button disabled={isPending} onClick={() => handleReset()}>Reset</Button>
                    <Button loading={isPending} type="primary">Save</Button>
                </div>
            </Form>
        </>
    );
}

export default MyRestaurant;