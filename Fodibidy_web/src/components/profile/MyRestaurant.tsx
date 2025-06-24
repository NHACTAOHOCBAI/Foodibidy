/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Button, Select } from "antd";
import { useState } from "react";
import type { UploadFile } from "antd/es/upload/interface";
import TextArea from "antd/es/input/TextArea";
import UploadImage from "../UploadImage";
import { MdOutlineStar } from "react-icons/md";
import convertDateFormat from "../../utils/convertDateFormat";

// Fake data ban đầu
const initialRestaurant: Restaurant = {
    id: "rest_001",
    user: {
        id: "user_001",
        fullName: "John Doe",
        phoneNumber: "+1234567890",
    },
    purchase: 250,
    category: [
        { id: "cat_001", name: "Italian" },
        { id: "cat_002", name: "Pizza" },
    ],
    restaurantName: "Delicious Bistro",
    address: "123 Food Street, Culinary City",
    status: "active",
    restaurantImage: "https://via.placeholder.com/300?text=Restaurant",
    phoneNumber: "+0987654321",
    rating: 4.7,
    createdAt: "15:28:21 22-06-2025",
    bio: "A cozy place offering authentic Italian dishes with a modern twist.",
};

// Danh sách danh mục giả để chọn
const availableCategories = [
    { id: "cat_001", name: "Italian" },
    { id: "cat_002", name: "Pizza" },
    { id: "cat_003", name: "Mexican" },
    { id: "cat_004", name: "Japanese" },
];

const MyRestaurant = () => {
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
                    <Form.Item
                        label="Restaurant Name"
                        name="restaurantName"
                        rules={[{ required: true, message: 'Enter restaurant name!' }]}
                    >
                        <Input style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Enter restaurant address!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name="status"
                        rules={[{ required: true, message: 'Enter restaurant status!' }]}
                    >
                        <Select />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Enter restaurant phone!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Bio"
                        name="bio"
                        rules={[{ required: true, message: 'Enter restaurant bio!' }]}
                    >
                        <TextArea
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
                    <p>Sold item : {initialRestaurant.purchase}</p>
                    <div style={{ display: "flex", alignItems: 'center', gap: 10 }}>
                        Rating : {initialRestaurant.rating} <MdOutlineStar size={20} style={{ color: "yellow" }} />
                    </div>
                    <p>Created at : {convertDateFormat(initialRestaurant.createdAt)}</p>
                    <p>Owner : {initialRestaurant.user.fullName} ({initialRestaurant.user.phoneNumber})</p>
                </div>
            </div>
            <div style={{ display: 'flex', gap: 20 }}>
                <Button>Cancel</Button>
                <Button type="primary">Save</Button>
            </div>
        </Form>
    );
}

export default MyRestaurant;