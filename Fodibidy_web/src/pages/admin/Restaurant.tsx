/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Tag, Image, Popconfirm, Button, message } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import convertDateFormat from '../../utils/convertDateFormat';
import { PiEye } from 'react-icons/pi';
import { deleteRestaurantById, getAllRestaurants } from '../../services/restaurant';
import NewRestaurant from '../../components/restaurant/NewRestaurant';
import UpdateRestaurant from '../../components/restaurant/UpdateRestaurant';
import DetailRestaurant from '../../components/restaurant/DetailRestaurant';
const Restaurant = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [isPending, setIsPending] = useState(false);
    const [isNewOpen, setIsNewOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [updatedRestaurant, setUpdatedRestaurant] = useState<Restaurant>();
    const [isDetailOpen, setIsDetailOpen] = useState(true);
    const [detailRestaurant, setDetailRestaurant] = useState<Restaurant>();

    const columns: TableProps<Restaurant>['columns'] = [
        {
            title: 'Image',
            dataIndex: 'restaurantImage',
            render: (url) => <Image width={60} src={url} alt="Restaurant" />,
        },
        {
            title: 'Name',
            dataIndex: 'restaurantName',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.rating - b.rating,
        },
        {
            title: 'Purchase',
            dataIndex: 'purchase',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.purchase - b.purchase,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => {
                const color = status === 'active' ? 'green' : status === 'pending' ? 'yellow' : 'red';
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Created At',
            render: (_: any, record: Restaurant) => <div>{convertDateFormat(record.createdAt)}</div>,
        },
        {
            title: 'Action',
            render: (_, value) => (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ color: 'blue' }} onClick={() => {
                        setDetailRestaurant(value);
                        setIsDetailOpen(true);
                    }}>
                        <PiEye />
                    </div>
                    <div style={{ color: 'yellow' }} onClick={() => {
                        setUpdatedRestaurant(value);
                        setIsUpdateOpen(true);
                    }}>
                        <EditOutlined />
                    </div>
                    <Popconfirm
                        title="Delete the restaurant"
                        description="Are you sure?"
                        onConfirm={() => { handleDelete(value.id); }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <div style={{ color: 'red' }}><DeleteOutlined /></div>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    const refetchData = async () => {
        setIsPending(true);
        try {
            const res = await getAllRestaurants();
            setRestaurants(res);
        } catch (error) {
            messageApi.error(String(error));
        } finally {
            setIsPending(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteRestaurantById(id);
            await refetchData();
            messageApi.success('Restaurant deleted successfully');
        } catch (error) {
            messageApi.error(String(error));
        }
    };

    useEffect(() => {
        refetchData();
    }, []);

    return (
        <>
            {contextHolder}
            <Button
                onClick={() => setIsNewOpen(true)}
                type='primary'
                style={{ marginLeft: 'auto', display: 'block', marginBottom: 10 }}
            >
                <PlusOutlined /> New Restaurant
            </Button>
            <Table<Restaurant>
                loading={isPending}
                bordered
                columns={columns}
                dataSource={restaurants}
                rowKey="id"
                pagination={{
                    pageSize: 5, // Số item mỗi trang
                    showTotal: (total) => `Total ${total} restaurants`,
                }}
            />
            <NewRestaurant
                isModalOpen={isNewOpen}
                setIsModalOpen={setIsNewOpen}
                refetchData={refetchData}
            />
            <UpdateRestaurant
                isModalOpen={isUpdateOpen}
                setIsModalOpen={setIsUpdateOpen}
                updatedRestaurant={updatedRestaurant}
                setUpdatedRestaurant={setUpdatedRestaurant}
                refetchData={refetchData}
            />
            <DetailRestaurant
                isModalOpen={isDetailOpen}
                setIsModalOpen={setIsDetailOpen}
                detailRestaurant={detailRestaurant}
            />
        </>
    );
};

export default Restaurant;