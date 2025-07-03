/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, message, Spin, type UploadFile } from "antd"
import UploadImage from "../UploadImage";
import { useContext, useEffect, useState } from "react";
import { getMyProfile, updateMyAccount } from "../../services/auth";
import { MyProfileContext } from "../../context/MyProfileContext";
interface UserProfile {
    fullName: string;
    phoneNumber: string;
    avatar?: string;
    email: string;
    role: string;
    createdAt: string;
}

const MyProfile = () => {
    const { setMyProfile: updateMyProfile } = useContext(MyProfileContext)
    const [isLoading, setIsLoading] = useState(false)
    const [myProfile, setMyProfile] = useState<UserProfile | null>(null);
    const [form] = Form.useForm();
    const [isPending, setIsPending] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const onFinish = async (values: any) => {
        setIsPending(true)
        try {
            const imageFile = fileList[0]?.originFileObj as File;
            await updateMyAccount(values.phoneNumber, values.fullName, imageFile)
            await fetchMyProfile()
            messageApi.success("Update my account success")
        }
        catch (error) {
            if (error instanceof Error) {
                messageApi.error(error.message);
            } else {
                messageApi.error("An unexpected error occurred");
            }
        }
        setIsPending(false)
    };
    const handleReset = () => {
        form.setFieldsValue({
            fullName: myProfile?.fullName,
            phone: myProfile?.phoneNumber

        })
        setFileList([
            {
                uid: '-1',
                name: 'avatar.jpg',
                status: 'done',
                url: myProfile?.avatar
            },
        ])
    }
    const fetchMyProfile = async () => {
        setIsLoading(true)
        const res = await getMyProfile()
        updateMyProfile(res.user)
        localStorage.setItem("profile", JSON.stringify(res.user))
        form.setFieldsValue({
            fullName: res.user.fullName,
            phoneNumber: res.user.phoneNumber
        })
        setFileList([
            {
                uid: '-1',
                name: 'avatar.jpg',
                status: 'done',
                url: res.user?.avatar
            },
        ])

        setMyProfile(res.user)
        setIsLoading(false)
    }
    useEffect(() => {
        fetchMyProfile()
    }, [])
    return (
        isLoading ?
            <div style={{ width: '100%', height: '100%', display: "flex", justifyContent: 'center', alignItems: 'center' }}> <Spin size="large" /> </div>
            :
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
                                <Input disabled={isPending} />
                            </Form.Item>
                            <Form.Item
                                label="Phone"
                                name="phoneNumber"
                                rules={[{ required: true, message: 'Enter your phone!' }]}
                            >
                                <Input disabled={isPending} />
                            </Form.Item>
                        </div>
                        <div>
                            <p>Email : {myProfile?.email}</p>
                            <p>Role : {myProfile?.role}</p>

                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: 20 }}>
                        <Button disabled={isPending} onClick={() => handleReset()}>Cancel</Button>
                        <Button loading={isPending} type="primary" onClick={() => form.submit()}>Save</Button>
                    </div>
                </Form>
            </>
    )
}
export default MyProfile