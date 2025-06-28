import { Modal, Descriptions, Image, Tag, Typography, Collapse } from 'antd';
import convertDateFormat from '../../utils/convertDateFormat';

const { Title, Text } = Typography;
const { Panel } = Collapse;

interface DetailRestaurantProps {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    detailRestaurant?: Restaurant;
}

const DetailRestaurant = ({
    isModalOpen,
    setIsModalOpen,
    detailRestaurant,
}: DetailRestaurantProps) => {
    if (!detailRestaurant) return null;

    return (
        <Modal
            title={
                <Title level={3} style={{ margin: 0, color: '#1a1a1a' }}>
                    {detailRestaurant.restaurantName}
                </Title>
            }
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
            width={850}
            style={{ top: 20 }}
            bodyStyle={{
                padding: 24,
                background: '#fafafa',
                borderRadius: 8,
            }}
            transitionName="ant-zoom-big"
        >
            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24 }}>
                {/* Image Section */}
                <div style={{ position: 'relative' }}>
                    <Image
                        src={detailRestaurant.restaurantImage}
                        alt={detailRestaurant.restaurantName}
                        style={{
                            borderRadius: 12,
                            objectFit: 'cover',
                            width: '100%',
                            height: 200,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            transition: 'transform 0.3s ease',
                        }}
                        preview
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                    <Tag
                        color={
                            detailRestaurant.status === 'active'
                                ? 'green'
                                : detailRestaurant.status === 'pending'
                                    ? 'gold'
                                    : 'red'
                        }
                        style={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            fontWeight: 500,
                            border: 'none',
                            padding: '4px 12px',
                        }}
                    >
                        {detailRestaurant.status.toUpperCase()}
                    </Tag>
                </div>

                {/* Content Section */}
                <div>
                    <Collapse
                        defaultActiveKey={['1', '2', '3']}
                        ghost
                        expandIconPosition="end"
                        style={{ background: 'transparent' }}
                    >
                        {/* General Information */}
                        <Panel
                            header={<Title level={5} style={{ margin: 0 }}>General Information</Title>}
                            key="1"
                            style={{ borderBottom: '1px solid #e8e8e8', marginBottom: 16 }}
                        >
                            <Descriptions column={1} size="small" colon={false}>
                                <Descriptions.Item
                                    label={<Text type="secondary">Rating</Text>}
                                    labelStyle={{ width: 120 }}
                                >
                                    <Text strong style={{ color: '#faad14' }}>
                                        {detailRestaurant.rating.toFixed(1)} ★
                                    </Text>
                                </Descriptions.Item>
                                <Descriptions.Item label={<Text type="secondary">Total Purchases</Text>}>
                                    <Text>{detailRestaurant.purchase} orders</Text>
                                </Descriptions.Item>
                                <Descriptions.Item label={<Text type="secondary">Categories</Text>}>
                                    {detailRestaurant.category.map((cat) => (
                                        <Tag
                                            key={cat.id}
                                            color="blue"
                                            style={{
                                                margin: '2px',
                                                borderRadius: 12,
                                                padding: '0 8px',
                                            }}
                                        >
                                            {cat.name}
                                        </Tag>
                                    ))}
                                </Descriptions.Item>
                            </Descriptions>
                        </Panel>

                        {/* Contact & Owner */}
                        <Panel
                            header={<Title level={5} style={{ margin: 0 }}>Contact & Owner</Title>}
                            key="2"
                            style={{ borderBottom: '1px solid #e8e8e8', marginBottom: 16 }}
                        >
                            <Descriptions column={1} size="small" colon={false}>
                                <Descriptions.Item
                                    label={<Text type="secondary">Address</Text>}
                                    labelStyle={{ width: 120 }}
                                >
                                    <Text>{detailRestaurant.address}</Text>
                                </Descriptions.Item>
                                <Descriptions.Item label={<Text type="secondary">Phone Number</Text>}>
                                    <Text>{detailRestaurant.phoneNumber}</Text>
                                </Descriptions.Item>
                                <Descriptions.Item label={<Text type="secondary">Owner</Text>}>
                                    <Text>
                                        {detailRestaurant.user.fullName} ({detailRestaurant.user.phoneNumber})
                                    </Text>
                                </Descriptions.Item>
                            </Descriptions>
                        </Panel>

                        {/* Additional Details */}
                        <Panel
                            header={<Title level={5} style={{ margin: 0 }}>Additional Details</Title>}
                            key="3"
                            style={{ borderBottom: '1px solid #e8e8e8' }}
                        >
                            <Descriptions column={1} size="small" colon={false}>
                                <Descriptions.Item
                                    label={<Text type="secondary">Bio</Text>}
                                    labelStyle={{ width: 120 }}
                                >
                                    <Text italic>
                                        {detailRestaurant.bio || 'No bio available'}
                                    </Text>
                                </Descriptions.Item>
                                <Descriptions.Item label={<Text type="secondary">Created At</Text>}>
                                    <Text>
                                        {convertDateFormat(detailRestaurant.createdAt)}
                                    </Text>
                                </Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>
                </div>
            </div>
        </Modal>
    );
};

export default DetailRestaurant;