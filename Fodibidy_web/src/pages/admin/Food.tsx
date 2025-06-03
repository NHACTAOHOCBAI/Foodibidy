/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Tag, Image, Popconfirm, Button } from 'antd';
import type { TableProps } from 'antd';
import { formatDateTime } from '../../utils/formatTime';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useState } from 'react';
import NewFood from '../../components/food/NewFood';
interface Restaurant {
    id: string;
    restaurantName: string;
}

interface Category {
    id: string;
    name: string;
}

interface Food {
    id: string;
    restaurant: Pick<Restaurant, 'id' | 'restaurantName'>;
    category: Pick<Category, 'id' | 'name'>;
    dishName: string;
    description: string;
    price: number;
    dishImage: string;
    soldQuantity: number;
    available: boolean;
    remainingQuantity: number | null;
    createdAt: string;
    updatedAt: string;
    rating: number;
}


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
        render: (price) => `$${price.toFixed(2)}`,
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
        title: 'Remaining',
        dataIndex: 'remainingQuantity',
    },
    {
        title: 'Created At',
        render: (_: any, record: Food) => <div>{formatDateTime(record.createdAt)}</div>
    },
    {
        title: 'Updated At',
        render: (_: any, record: Food) => <div>{formatDateTime(record.updatedAt)}</div>
    },
    {
        title: "Action",
        render: (_, value) => (
            <div style={{ display: 'flex', gap: 10 }}>
                <div
                >
                    <EditOutlined />
                </div>
                <Popconfirm
                    title="Delete the airline"
                    description="Are you sure?"
                    onConfirm={() => { }}
                    okText="Yes"
                    cancelText="No"
                >
                    <div><DeleteOutlined /></div>
                </Popconfirm>
            </div>
        ),
    }
];

const Food = () => {
    const [isNewOpen, setIsNewOpen] = useState(false);
    return (
        <div>
            <NewFood
                isModalOpen={isNewOpen}
                setIsModalOpen={setIsNewOpen}
            />
            <Button onClick={() => setIsNewOpen(true)} type='primary' style={{ marginLeft: 'auto', display: 'block', marginBottom: 10 }}>
                <PlusOutlined />New Food
            </Button>
            <Table<Food> bordered columns={columns} dataSource={data} rowKey="id" />
        </div>
    )
};
const data: Food[] = [
    {
        id: '1',
        restaurant: { id: 'r1', restaurantName: 'Pizza House' },
        category: { id: 'c1', name: 'Pizza' },
        dishName: 'Pepperoni Pizza',
        description: 'Delicious pepperoni with cheese',
        price: 12.99,
        dishImage: 'https://satrafoods.com.vn/uploads/Images/mon-ngon-moi-ngay/bun-bo-hue.jpg',
        soldQuantity: 150,
        available: true,
        remainingQuantity: 20,
        createdAt: '2025-06-01T12:00:00Z',
        updatedAt: '2025-06-02T08:30:00Z',
        rating: 4.5,
    },
    {
        id: '2',
        restaurant: { id: 'r2', restaurantName: 'Sushi World' },
        category: { id: 'c2', name: 'Sushi' },
        dishName: 'Salmon Nigiri',
        description: 'Fresh salmon on rice',
        price: 9.99,
        dishImage: 'https://via.placeholder.com/80',
        soldQuantity: 200,
        available: false,
        remainingQuantity: 0,
        createdAt: '2025-05-25T10:00:00Z',
        updatedAt: '2025-06-01T09:45:00Z',
        rating: 4.8,
    },
];
export default Food;
