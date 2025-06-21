/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Tag, Image, Popconfirm, Button, message } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react';
import NewFood from '../../components/food/NewFood';
import UpdateFood from '../../components/food/UpdateFood';
import { deleteDishById, getDishByRestaurant } from '../../services/food';
import convertDateFormat from '../../utils/convertDateFormat';
import formatVND from '../../utils/convertMoney';
import { PiEye } from 'react-icons/pi';
import DetailFood from '../../components/food/DetailFood';
const Food = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [isPending, setIsPending] = useState(false)
    const [isNewOpen, setIsNewOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [updatedFood, setUpdatedFood] = useState<Food>()
    const [isDetailOpen, setIsDetailOpen] = useState(true)
    const [detailFood, setDetailFood] = useState<Food>({
        id: "food_123",
        restaurant: {
            id: "rest_001",
            restaurantName: "Delicious Bistro",
        },
        category: {
            id: "cat_001",
            name: "Italian",
        },
        dishName: "Spaghetti Carbonara",
        description: "Classic Italian pasta with creamy egg sauce, pancetta, and parmesan cheese.",
        price: 12.99,
        dishImage: "https://cdn.tgdd.vn/2021/04/CookProduct/1-1200x676-21.jpg",
        soldQuantity: 150,
        available: true,
        remainingQuantity: 50,
        createdAt: "2025-06-01T10:00:00Z",
        updatedAt: "2025-06-20T15:30:00Z",
        rating: 4.5,
    },)
    const columns: TableProps<Food>['columns'] = [
        {
            title: 'Image',
            dataIndex: 'dishImage',
            render: (url) => <Image width={60} src={url} alt="Dish" />,
        },
        {
            title: 'Food',
            dataIndex: 'dishName',
        },
        {
            title: 'Category',
            dataIndex: ['category', 'name'],
            filters: [
                {
                    text: 'London',
                    value: 'London',
                },
                {
                    text: 'New York',
                    value: 'New York',
                },
            ],
            onFilter: (value, record) => record.category.name.indexOf(value as string) === 0,
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.rating - b.rating,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.price - b.price,
            render: (price) => {
                return formatVND(price);
            },
        },

        {
            title: 'Sold Quantity',
            dataIndex: 'soldQuantity',
        },
        {
            title: 'Available',
            dataIndex: 'available',
            render: (available) => <Tag color={available ? 'green' : 'red'}>{available ? 'Yes' : 'No'}</Tag>,
        },
        {
            title: 'Created At',
            render: (_: any, record: Food) => <div>{convertDateFormat(record.createdAt)}</div>
        },
        {
            title: 'Updated At',
            render: (_: any, record: Food) => <div>{convertDateFormat(record.updatedAt)}</div>
        },
        {
            title: "Action",
            render: (_, value) => (
                <div style={{ display: 'flex', gap: 10 }}>
                    <div onClick={() => {
                        setDetailFood(value)
                        setIsDetailOpen(true)
                    }}>
                        < PiEye />
                    </div>
                    <div onClick={() => {
                        setUpdatedFood(value)
                        setIsUpdateOpen(true)
                    }}>
                        <EditOutlined />
                    </div>
                    <Popconfirm
                        title="Delete the food"
                        description="Are you sure?"
                        onConfirm={() => { handleDelete(value.id) }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <div><DeleteOutlined /></div>
                    </Popconfirm>
                </div>
            ),
        }
    ];
    const [foods, setFoods] = useState<Food[]>([])
    const refetchData = async () => {
        setIsPending(true)
        const res = await getDishByRestaurant("tDF8JPDfjgTbTApXnBiR")
        setFoods(res.data)
        setIsPending(false)
    }
    const handleDelete = async (id: string) => {
        try {
            await deleteDishById(id)
            await refetchData()
            messageApi.success('Delete category successfully')
        }
        catch (error) {
            messageApi.error(String(error))
        }
    }
    useEffect(() => {
        refetchData()
    }, []);
    return (
        <>
            {contextHolder}
            <DetailFood
                detailFood={detailFood}
                setIsDetailOpen={setIsDetailOpen}
                isDetailOpen={isDetailOpen}
            />
            <NewFood
                refetchData={refetchData}
                isModalOpen={isNewOpen}
                setIsModalOpen={setIsNewOpen}
            />
            <UpdateFood
                isModalOpen={isUpdateOpen}
                setIsModalOpen={setIsUpdateOpen}
                updatedFood={updatedFood}
            />
            <Button onClick={() => setIsNewOpen(true)} type='primary' style={{ marginLeft: 'auto', display: 'block', marginBottom: 10 }}>
                <PlusOutlined />New Food
            </Button>
            <Table<Food> loading={isPending} bordered columns={columns} dataSource={foods} rowKey="id" />
        </>
    )
};
export default Food;
