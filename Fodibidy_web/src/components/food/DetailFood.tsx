import { Modal, Image, Typography, Divider, Tag, Rate, Table, type TableProps, Avatar } from "antd";
import { ClockCircleOutlined, ShopOutlined, DollarOutlined, TagsOutlined, UserOutlined } from "@ant-design/icons";
import { MdOutlineStar } from "react-icons/md";
import convertDateFormat from "../../utils/convertDateFormat";
import formatVND from "../../utils/convertMoney";

interface Props {
    isDetailOpen: boolean;
    setIsDetailOpen: (value: boolean) => void;
    detailFood: Food | undefined;
}

const DetailFood = ({ isDetailOpen, setIsDetailOpen, detailFood }: Props) => {
    const { Text, Title } = Typography;

    const handleOk = () => {
        setIsDetailOpen(false);
    };

    const handleCancel = () => {
        setIsDetailOpen(false);
    };

    return (
        <Modal
            title={<Title level={4}>Food Details</Title>}
            open={isDetailOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={600}
            footer={[]}
        >
            {detailFood ? (
                <div style={{ padding: "16px 0" }}>
                    {/* Dish Image */}
                    <div style={{ textAlign: "center", marginBottom: 16 }}>
                        <Image
                            src={detailFood.dishImage}
                            alt={detailFood.dishName}
                            style={{
                                width: "100%",
                                maxWidth: 300,
                                height: 200,
                                objectFit: "cover",
                                borderRadius: 8,
                            }}
                            fallback="https://via.placeholder.com/300?text=No+Image"
                        />
                    </div>

                    {/* Dish Information */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <div>
                            <Title level={5} style={{ margin: 0 }}>
                                {detailFood.dishName}
                            </Title>
                            <Text type="secondary">{detailFood.description}</Text>
                        </div>

                        <Divider style={{ margin: "12px 0" }} />

                        {/* Restaurant and Category */}
                        <div style={{ display: "flex", gap: 36 }}>
                            <div>
                                <Text strong>
                                    <ShopOutlined style={{ marginRight: 8 }} />
                                    Restaurant:
                                </Text>{" "}
                                <Text>{detailFood.restaurant.restaurantName}</Text>
                            </div>
                            <div>
                                <Text strong>
                                    <TagsOutlined style={{ marginRight: 8 }} />
                                    Category:
                                </Text>{" "}
                                <Text>{detailFood.category.name}</Text>
                            </div>
                        </div>

                        {/* Price and Rating */}
                        <div style={{ display: "flex", gap: 36, alignItems: 'center' }}>
                            <div>
                                <Text strong>
                                    <DollarOutlined style={{ marginRight: 8 }} />
                                    Price:
                                </Text>{" "}
                                <Text>{formatVND(detailFood.price.toString())}</Text>
                            </div>
                            <div style={{ display: "flex", gap: 10, alignItems: 'center' }}>
                                <Text strong>Rating:</Text>
                                <Rate disabled allowHalf value={detailFood.rating} />
                            </div>
                        </div>

                        {/* Availability and Quantity */}
                        <div style={{ display: "flex", gap: 36 }}>
                            <div>
                                <Text strong>Availability:</Text>{" "}
                                <Tag color={detailFood.available ? "green" : "red"}>
                                    {detailFood.available ? "Available" : "Unavailable"}
                                </Tag>
                            </div>
                            <div>
                                <Text strong>Remaining Quantity:</Text>{" "}
                                <Text>
                                    {detailFood.remainingQuantity !== null
                                        ? detailFood.remainingQuantity
                                        : "Unlimited"}
                                </Text>
                            </div>
                        </div>

                        {/* Sold Quantity and Dates */}
                        <div style={{ display: "flex", gap: 36 }}>
                            <div>
                                <Text strong>Sold Quantity:</Text>{" "}
                                <Text>{detailFood.soldQuantity}</Text>
                            </div>
                            <div>
                                <Text strong>
                                    <ClockCircleOutlined style={{ marginRight: 8 }} />
                                    Created At:
                                </Text>{" "}<span>{convertDateFormat(detailFood.createdAt)}</span>
                                {/* <Text>{moment(detailFood.createdAt).format("DD/MM/YYYY")}</Text> */}
                            </div>
                        </div>
                    </div>
                    <Text style={{ marginTop: 10, marginBottom: 10, display: "block" }} strong>Reviews:</Text>{" "}
                    <Table<Review>
                        pagination={{
                            pageSize: 5, // Số item mỗi trang
                            showTotal: (total) => `Total ${total} Reviews`,
                        }}
                        columns={columns} dataSource={data} />
                </div>
            ) : (
                <Text>No food details available.</Text>
            )}
        </Modal>
    );
};
interface Review {
    rating: number,
    comment: string,
    account: {
        avatar: string
        id: string,
        name: string
    }
}
const columns: TableProps<Review>['columns'] = [
    {
        title: 'Customer',
        key: 'customer',
        render: (_, record: Review) => {
            return (
                <div style={{ display: "flex", alignItems: 'center', gap: 10 }}>
                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />  {record.account.name}
                </div>
            )
        }
    },
    {
        title: 'Rate',
        key: 'rate',
        render: (_, record: Review) => {
            return (
                <div style={{ display: "flex", alignItems: 'center', gap: 10 }}>
                    {record.rating} <MdOutlineStar size={20} style={{ color: "yellow" }} />
                </div>
            )
        }
    },
    {
        title: 'Comment',
        dataIndex: 'comment',
        key: 'comment',
    },
];

const data: Review[] = [
    {
        "rating": 5,
        "comment": "Sản phẩm tuyệt vời, chất lượng vượt mong đợi!",
        "account": {
            "avatar": "https://example.com/avatars/user1.jpg",
            "id": "user123",
            "name": "Nguyễn Văn A"
        }
    },
    {
        "rating": 4,
        "comment": "Dịch vụ tốt, nhưng giao hàng hơi chậm.",
        "account": {
            "avatar": "https://example.com/avatars/user2.jpg",
            "id": "user456",
            "name": "Trần Thị B"
        }
    },
    {
        "rating": 3,
        "comment": "Sản phẩm ổn, nhưng cần cải thiện bao bì.",
        "account": {
            "avatar": "https://example.com/avatars/user3.jpg",
            "id": "user789",
            "name": "Lê Văn C"
        }
    }
]

export default DetailFood;