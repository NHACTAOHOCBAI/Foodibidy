/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Tag, Image, Popconfirm, Button, message, Input } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState, useMemo } from 'react';
import convertDateFormat from '../../utils/convertDateFormat';
import { PiEye } from 'react-icons/pi';
import { deleteRestaurantById, getAllRestaurants } from '../../services/restaurant';
import NewRestaurant from '../../components/restaurant/NewRestaurant';
import UpdateRestaurant from '../../components/restaurant/UpdateRestaurant';
import DetailRestaurant from '../../components/restaurant/DetailRestaurant';
import { RiResetLeftFill } from 'react-icons/ri';

const Restaurant = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [isPending, setIsPending] = useState(false);
    const [isNewOpen, setIsNewOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [updatedRestaurant, setUpdatedRestaurant] = useState<Restaurant>();
    const [isDetailOpen, setIsDetailOpen] = useState(false); // Sửa true thành false để modal không mở mặc định
    const [detailRestaurant, setDetailRestaurant] = useState<Restaurant>();
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [searchText, setSearchText] = useState('');

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
                    <div
                        style={{ color: '#3674B5' }}
                        onClick={() => {
                            setDetailRestaurant(value);
                            setIsDetailOpen(true);
                        }}
                    >
                        <PiEye />
                    </div>
                    <div
                        style={{ color: '#FADA7A' }}
                        onClick={() => {
                            setUpdatedRestaurant(value);
                            setIsUpdateOpen(true);
                        }}
                    >
                        <EditOutlined />
                    </div>
                    <Popconfirm
                        title="Delete the restaurant"
                        description="Are you sure?"
                        onConfirm={() => handleDelete(value.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <div style={{ color: '#ED3500' }}>
                            <DeleteOutlined />
                        </div>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    // Lọc dữ liệu dựa trên searchText (theo tên nhà hàng)
    const filteredRestaurants = useMemo(() => {
        if (!searchText) return restaurants;
        return restaurants.filter((restaurant) =>
            restaurant.restaurantName.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [restaurants, searchText]);

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

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const handleReset = () => {
        setSearchText('');
    };

    useEffect(() => {
        refetchData();
    }, []);

    return (
        <>
            <div
                style={{
                    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05)',
                    padding: 20,
                    borderRadius: 8,
                    marginBottom: 20,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    Restaurant: <Input style={{ width: 400 }} value={searchText} onChange={handleSearchChange} placeholder="Search by restaurant name" />
                </div>
                <Button style={{ display: 'flex', alignItems: 'center' }} type="primary" onClick={handleReset}>
                    <RiResetLeftFill /> Reset
                </Button>
            </div>
            {contextHolder}
            <Button
                onClick={() => setIsNewOpen(true)}
                type="primary"
                style={{ marginLeft: 'auto', display: 'block', marginBottom: 10 }}
            >
                <PlusOutlined /> New Restaurant
            </Button>
            <Table<Restaurant>
                loading={isPending}
                bordered
                columns={columns}
                dataSource={filteredRestaurants}
                rowKey="id"
                pagination={{
                    pageSize: 4,
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