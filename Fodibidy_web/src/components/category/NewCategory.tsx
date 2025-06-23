import { Form, Input, message, Modal, type UploadFile } from 'antd';
import { useState } from 'react';
import UploadImage from '../UploadImage';
import TextArea from 'antd/es/input/TextArea';
import { createCategory } from '../../services/category';
const NewCategory = ({ isModalOpen, setIsModalOpen, refetchData }: { isModalOpen: boolean; setIsModalOpen: (value: boolean) => void, refetchData: () => Promise<void> }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [isPending, setIsPending] = useState(false);
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setFileList([
            {
                uid: '-1',
                name: 'category_image_logo.jpg',
                status: 'done',
                url: "abc"
            },
        ])
    };

    const handleNew = async (values: Category) => {
        try {
            setIsPending(true)
            const imageFile = fileList[0]?.originFileObj;
            await createCategory({ image: imageFile, description: values.description, name: values.name })
            await refetchData()
            messageApi.success("Create category successfully")
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
    return (
        <>
            {contextHolder}
            <Modal
                loading={isPending}
                title="Create Category"
                open={isModalOpen}
                okText="Create "
                onOk={() => form.submit()}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical" onFinish={handleNew}>
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
                        label="Category"
                        name="name"
                        rules={[{ required: true, message: 'Please enter the category name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please enter the category description' }]}
                    >
                        <TextArea />
                    </Form.Item>
                </Form>
            </Modal>

        </>
    );
};

export default NewCategory