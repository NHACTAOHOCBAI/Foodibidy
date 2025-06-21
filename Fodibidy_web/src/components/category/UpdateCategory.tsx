import { Form, Input, message, Modal, type UploadFile } from 'antd';
import { useEffect, useState } from 'react';
import UploadImage from '../UploadImage';
import TextArea from 'antd/es/input/TextArea';
import { updateCategory } from '../../services/category';
interface Props {
    isModalOpen: boolean,
    setIsModalOpen: (value: boolean) => void,
    updatedCategory: Category | undefined,
    refetchData: () => Promise<void>,
    setUpdatedCategory: (value: Category | undefined) => void
}
const UpdateCategory = ({ isModalOpen, setIsModalOpen, updatedCategory, refetchData, setUpdatedCategory }: Props) => {
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
        setUpdatedCategory(undefined)
    };

    const handleUpdate = async (values: Category) => {
        try {
            setIsPending(true)
            const imageFile = fileList[0]?.originFileObj;
            await updateCategory(values.id, { image: imageFile, description: values.description, name: values.name })
            await refetchData()
            messageApi.success("Update category successfully")
            handleCancel()
        }
        catch (error) {
            messageApi.error(String(error))
        }
        setIsPending(false)
    }

    useEffect(() => {
        setFileList([
            {
                uid: '-1',
                name: 'category_image.jpg',
                status: 'done',
                url: updatedCategory?.image
            },
        ])
        form.setFieldsValue({
            id: updatedCategory?.id,
            name: updatedCategory?.name,
            description: updatedCategory?.description
        });
    }, [updatedCategory, form])
    return (
        <>
            {contextHolder}
            <Modal
                loading={isPending}
                title="Update Category"
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

export default UpdateCategory