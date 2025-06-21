import { Form, Input, Button, Typography, Card, Image, Select, Rate, Upload, message } from "antd";
import { UploadOutlined, EnvironmentOutlined, PhoneOutlined, TagsOutlined, ShopOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import type { UploadFile } from "antd/es/upload/interface";

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
    createdAt: "2025-01-15T09:00:00Z",
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
    const { Text } = Typography;
    const [form] = Form.useForm();
    const [restaurant, setRestaurant] = useState<Restaurant>(initialRestaurant);
    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: "-1",
            name: "restaurant-image.png",
            status: "done",
            url: restaurant.restaurantImage,
        },
    ]);

    // Xử lý submit form
    const onFinish = (values: any) => {
        const updatedRestaurant = {
            ...restaurant,
            ...values,
            category: values.category.map((catId: string) =>
                availableCategories.find((cat) => cat.id === catId)
            ),
            restaurantImage: fileList[0]?.url || restaurant.restaurantImage,
        };
        setRestaurant(updatedRestaurant);
        message.success("Restaurant updated successfully!");
        console.log("Updated Restaurant:", updatedRestaurant);
        // Gửi API cập nhật tại đây, ví dụ: axios.put('/api/restaurant', updatedRestaurant);
    };

    // Xử lý upload ảnh
    const handleUploadChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
        setFileList(newFileList);
    };

    useEffect(() => {
        // Example: set the restaurantName field to the current restaurant name
        form.setFieldValue("restaurantName", restaurant.restaurantName);
    }, []);

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    restaurantName: restaurant.restaurantName,
                    bio: restaurant.bio,
                    address: restaurant.address,
                    phoneNumber: restaurant.phoneNumber,
                    status: restaurant.status,
                    rating: restaurant.rating,
                    category: restaurant.category.map((cat) => cat.id),
                }}
                onFinish={onFinish}
            >
                {/* Hình ảnh nhà hàng */}
                <Form.Item label="Restaurant Image">
                    <Upload
                        listType="picture"
                        fileList={fileList}
                        onChange={handleUploadChange}
                        beforeUpload={() => false} // Ngăn upload tự động, xử lý thủ công
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                    <Image
                        src={fileList[0]?.url || restaurant.restaurantImage}
                        alt={restaurant.restaurantName}
                        style={{ width: 200, height: 120, objectFit: "cover", marginTop: 8, borderRadius: 4 }}
                        fallback="https://via.placeholder.com/200?text=No+Image"
                    />
                </Form.Item>

                {/* Tên nhà hàng */}
                <Form.Item
                    label="Restaurant Name"
                    name="restaurantName"
                    rules={[{ required: true, message: "Please enter restaurant name" }]}
                >
                    <Input prefix={<ShopOutlined />} placeholder="Enter restaurant name" />
                </Form.Item>

                {/* Mô tả */}
                <Form.Item
                    label="Bio"
                    name="bio"
                    rules={[{ required: true, message: "Please enter restaurant bio" }]}
                >
                    <Input.TextArea rows={4} placeholder="Describe your restaurant" />
                </Form.Item>

                {/* Địa chỉ */}
                <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: "Please enter address" }]}
                >
                    <Input prefix={<EnvironmentOutlined />} placeholder="Enter restaurant address" />
                </Form.Item>

                {/* Số điện thoại */}
                <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    rules={[
                        { required: true, message: "Please enter phone number" },
                        { pattern: /^\+?[1-9]\d{1,14}$/, message: "Invalid phone number" },
                    ]}
                >
                    <Input prefix={<PhoneOutlined />} placeholder="Enter phone number" />
                </Form.Item>

                {/* Danh mục */}
                <Form.Item
                    label="Categories"
                    name="category"
                    rules={[{ required: true, message: "Please select at least one category" }]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Select categories"
                        suffixIcon={<TagsOutlined />}
                        options={availableCategories.map((cat) => ({
                            label: cat.name,
                            value: cat.id,
                        }))}
                    />
                </Form.Item>

                {/* Trạng thái */}
                <Form.Item
                    label="Status"
                    name="status"
                    rules={[{ required: true, message: "Please select status" }]}
                >
                    <Select placeholder="Select status">
                        <Select.Option value="pending">Pending</Select.Option>
                        <Select.Option value="active">Active</Select.Option>
                        <Select.Option value="closed">Closed</Select.Option>
                    </Select>
                </Form.Item>

                {/* Đánh giá (chỉ hiển thị, không chỉnh sửa) */}
                <Form.Item label="Rating">
                    <Rate disabled allowHalf value={restaurant.rating} />
                    <Text type="secondary" style={{ marginLeft: 8 }}>
                        ({restaurant.rating})
                    </Text>
                </Form.Item>

                {/* Thông tin người quản lý (chỉ hiển thị) */}
                <Form.Item label="Manager Information">
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <Text>
                            <strong>Name:</strong> {restaurant.user.fullName}
                        </Text>
                        <Text>
                            <strong>Phone:</strong> {restaurant.user.phoneNumber}
                        </Text>
                    </div>
                </Form.Item>

                {/* Số đơn hàng và ngày tạo (chỉ hiển thị) */}
                <Form.Item label="Additional Information">
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <Text>
                            <strong>Purchases:</strong> {restaurant.purchase} orders
                        </Text>
                        <Text>
                            <strong>Created At:</strong>{" "}

                        </Text>
                    </div>
                </Form.Item>

                {/* Nút submit */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Update Restaurant
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default MyRestaurant;