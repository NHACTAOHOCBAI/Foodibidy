import { Button, Form, Input, type UploadFile } from "antd"
import UploadImage from "../UploadImage";
import { useState } from "react";

const MyProfile = () => {
    const [form] = Form.useForm();
    const [isPending, setIsPending] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const onFinish = (values) => {
        console.log('Success:', values);
    };
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
                    <p>Email :.....</p>
                    <p>Role :.....</p>
                    <p>Created :...</p>
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