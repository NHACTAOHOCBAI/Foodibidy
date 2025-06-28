/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, type UploadFile } from "antd"
import UploadImage from "../UploadImage";
import { useEffect, useState } from "react";
import convertDateFormat from "../../utils/convertDateFormat";
interface MyAccountProps {
    myAccount: any;
    fetchMyProfile: () => Promise<void>
}

const MyProfile = ({ myAccount, fetchMyProfile }: MyAccountProps) => {
    const [form] = Form.useForm();
    const [isPending, setIsPending] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    //  const handleReset = () => {
    //         form.setFieldsValue({
    //             restaurantName: myRestaurant?.restaurantName,
    //             address: myRestaurant?.address,
    //             status: myRestaurant?.status,
    //             phoneNumber: myRestaurant?.phoneNumber,
    //             bio: myRestaurant?.bio
    //         })
    //         setFileList([
    //             {
    //                 uid: '-1',
    //                 name: 'avatar.jpg',
    //                 status: 'done',
    //                 url: myRestaurant?.avatar
    //             },
    //         ])
    //     }
    useEffect(() => {
        form.setFieldsValue({
            fullName: myAccount.fullName,
            phone: myAccount.phoneNumber

        })
        setFileList([
            {
                uid: '-1',
                name: 'avatar.jpg',
                status: 'done',
                url: myAccount?.avatar
            },
        ])
    }, [myAccount, form])
    return (
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
                    <Form.Item label="Image">
                        <div style={{ border: '1px dashed #d9d9d9', padding: 8, borderRadius: 4, width: 400 }}>
                            <UploadImage
                                isPending={isPending}
                                fileList={fileList}
                                setFileList={setFileList}
                            />
                        </div>
                    </Form.Item>
                    <Form.Item
                        label="Full name"
                        name="fullName"
                        rules={[{ required: true, message: 'Enter your full name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Enter your phone!' }]}
                    >
                        <Input />
                    </Form.Item>
                </div>
                <div>
                    <p>Email : {myAccount.email}</p>
                    <p>Role : {myAccount.role}</p>
                    <p>Created : {convertDateFormat(myAccount.createdAt)}</p>
                </div>
            </div>
            <div style={{ display: 'flex', gap: 20 }}>
                <Button>Cancel</Button>
                <Button type="primary">Save</Button>
            </div>
        </Form>
    )
}
export default MyProfile