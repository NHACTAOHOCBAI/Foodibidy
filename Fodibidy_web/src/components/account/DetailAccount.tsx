import { Modal, Descriptions, Image, Tag, Typography, Collapse } from 'antd';
import convertDateFormat from '../../utils/convertDateFormat';

const { Title, Text } = Typography;
const { Panel } = Collapse;

interface DetailAccountProps {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    detailAccount?: Account;
}

const DetailAccount = ({ isModalOpen, setIsModalOpen, detailAccount }: DetailAccountProps) => {
    if (!detailAccount) return null;

    return (
        <Modal
            title={
                <Title level={3} style={{ margin: 0, color: '#2c3e50', fontWeight: 700 }}>
                    {detailAccount.fullName}
                </Title>
            }
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
            width={900}
            style={{ top: 20 }}
            bodyStyle={{
                padding: '32px 40px',
                background: 'linear-gradient(180deg, #ffffff, #f5f7fa)',
                borderRadius: 16,
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            }}
            transitionName="ant-zoom-big-fast"
        >
            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 40 }}>
                {/* Image Section */}
                <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden' }}>
                    <Image
                        src={detailAccount.avatar}
                        alt={detailAccount.fullName}
                        style={{
                            width: '100%',
                            height: 240,
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease-in-out',
                            borderRadius: 16,
                        }}
                        preview
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                    <Tag
                        color={
                            detailAccount.role === 'admin'
                                ? '#1890ff'
                                : detailAccount.role === 'restaurant'
                                    ? '#52c41a'
                                    : '#fa8c16'
                        }
                        style={{
                            position: 'absolute',
                            top: 16,
                            left: 16,
                            fontWeight: 600,
                            fontSize: 13,
                            borderRadius: 8,
                            padding: '4px 12px',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
                            border: 'none',
                        }}
                    >
                        {detailAccount.role.toUpperCase()}
                    </Tag>
                </div>

                {/* Content Section */}
                <div>
                    <Collapse
                        defaultActiveKey={['1', '2']}
                        ghost
                        expandIconPosition="end"
                        style={{ background: 'transparent' }}
                        accordion
                        expandIcon={({ isActive }) => (
                            <span
                                style={{
                                    fontSize: 16,
                                    color: '#2c3e50',
                                    transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s',
                                }}
                            >
                                ❯
                            </span>
                        )}
                    >
                        {/* Personal Information */}
                        <Panel
                            header={
                                <Title level={5} style={{ margin: 0, color: '#2c3e50', fontWeight: 600 }}>
                                    Personal Information
                                </Title>
                            }
                            key="1"
                            style={{ borderBottom: '1px solid #e8ecef', marginBottom: 20, paddingBottom: 12 }}
                        >
                            <Descriptions column={1} size="small" colon={false}>
                                <Descriptions.Item
                                    label={
                                        <Text type="secondary" style={{ fontSize: 14, fontWeight: 500 }}>
                                            Email
                                        </Text>
                                    }
                                    labelStyle={{ width: 160, padding: '8px 0' }}
                                >
                                    <Text style={{ fontSize: 15, lineHeight: 1.6 }}>{detailAccount.email}</Text>
                                </Descriptions.Item>
                                <Descriptions.Item
                                    label={
                                        <Text type="secondary" style={{ fontSize: 14, fontWeight: 500 }}>
                                            Full Name
                                        </Text>
                                    }
                                >
                                    <Text style={{ fontSize: 15, fontWeight: 500 }}>{detailAccount.fullName}</Text>
                                </Descriptions.Item>
                                <Descriptions.Item
                                    label={
                                        <Text type="secondary" style={{ fontSize: 14, fontWeight: 500 }}>
                                            Phone Number
                                        </Text>
                                    }
                                >
                                    <Text style={{ fontSize: 15 }}>{detailAccount.phoneNumber}</Text>
                                </Descriptions.Item>
                                <Descriptions.Item
                                    label={
                                        <Text type="secondary" style={{ fontSize: 14, fontWeight: 500 }}>
                                            Role
                                        </Text>
                                    }
                                >
                                    <Tag
                                        color={
                                            detailAccount.role === 'admin'
                                                ? '#1890ff'
                                                : detailAccount.role === 'restaurant'
                                                    ? '#52c41a'
                                                    : '#fa8c16'
                                        }
                                        style={{
                                            borderRadius: 20,
                                            padding: '4px 12px',
                                            fontSize: 13,
                                            fontWeight: 500,
                                        }}
                                    >
                                        {detailAccount.role.toUpperCase()}
                                    </Tag>
                                </Descriptions.Item>
                            </Descriptions>
                        </Panel>

                        {/* Account Details */}
                        <Panel
                            header={
                                <Title level={5} style={{ margin: 0, color: '#2c3e50', fontWeight: 600 }}>
                                    Account Details
                                </Title>
                            }
                            key="2"
                            style={{ borderBottom: '1px solid #e8ecef', paddingBottom: 12 }}
                        >
                            <Descriptions column={1} size="small" colon={false}>
                                <Descriptions.Item
                                    label={
                                        <Text type="secondary" style={{ fontSize: 14, fontWeight: 500 }}>
                                            Created At
                                        </Text>
                                    }
                                    labelStyle={{ width: 160, padding: '8px 0' }}
                                >
                                    <Text style={{ fontSize: 15 }}>{convertDateFormat(detailAccount.createdAt)}</Text>
                                </Descriptions.Item>
                                <Descriptions.Item
                                    label={
                                        <Text type="secondary" style={{ fontSize: 14, fontWeight: 500 }}>
                                            Updated At
                                        </Text>
                                    }
                                >
                                    <Text style={{ fontSize: 15 }}>{convertDateFormat(detailAccount.updateAt)}</Text>
                                </Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>
                </div>
            </div>
        </Modal>
    );
};

export default DetailAccount;