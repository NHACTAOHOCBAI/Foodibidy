/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import UpdateOrder from '../../components/order/UpdateOrder';
// import convertDateFormat from '../../utils/convertDateFormat';

const Order = () => {
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const [updatedOrder, setUpdatedOrder] = useState<Order>()
    const columns: TableProps<Order>['columns'] = [
        {
            title: 'Customer',
            dataIndex: ['user', 'fullName'],
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Items',
            dataIndex: 'items',
            render: (items: { dish: { dishName: string; price: number | string }; quantity: number }[]) => (
                <ul style={{ paddingLeft: 16 }}>
                    {items.map((item, idx) => (
                        <li key={idx}>
                            {item.dish.dishName} x {item.quantity} (${(Number(item.dish.price) * item.quantity).toFixed(2)})
                        </li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            sorter: (a, b) => a.totalPrice - b.totalPrice,
            render: (price) => `$${price.toFixed(2)}`,
        },
        // {
        //     title: 'Created At',
        //     dataIndex: 'createdAt',
        //     render: (time) => convertDateFormat(time),
        // },
        {
            title: 'Status',
            dataIndex: 'status',
            filters: [
                { text: 'Pending', value: 'pending' },
                { text: 'Preparing', value: 'preparing' },
                { text: 'Ongoing', value: 'ongoing' },
                { text: 'Delivered', value: 'delivered' },
                { text: 'Cancelled', value: 'cancelled' },
            ],
            onFilter: (value, record) => record.status === value,
            render: (status) => {
                const colorMap: Record<string, string> = {
                    pending: 'gold',
                    preparing: 'blue',
                    ongoing: 'orange',
                    delivered: 'green',
                    cancelled: 'red',
                };
                return <Tag color={colorMap[status]}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: "Actions",
            render: (_, record) => {
                return (
                    <Button
                        onClick={() => {
                            setIsUpdateOpen(true)
                            setUpdatedOrder(record)
                        }}
                        icon={<FaRegEdit />}>Update</Button>
                )
            }
        }
    ];

    return (
        <>
            <Table<Order>
                bordered columns={columns} dataSource={data} rowKey="id"
                expandable={{
                    expandedRowRender: (record) => <div>
                        <p style={{ margin: 0 }}>Shipper phone : {record.shipperPhone}</p>
                        <p style={{ margin: 0 }}>Shipper name : {record.shipperPhone}</p>
                    </div>,
                    rowExpandable: (record) => record.shipperName !== undefined,
                }}
            />
            <UpdateOrder
                isUpdateOpen={isUpdateOpen}
                setIsUpdateOpen={setIsUpdateOpen}
                updatedOrder={updatedOrder}
            />
        </>
    );
};

const data: Order[] = [
    {
        id: 1,
        user: { id: 'u1', fullName: 'Alice Johnson' },
        restaurant: { id: 'r1', restaurantName: 'Pizza House' },
        status: 'preparing',
        orderTime: '2025-06-01T12:30:00Z',
        deliveryPhone: '123-456-7890',
        address: '123 Main St, Springfield',
        items: [
            {
                dish: {
                    id: 'f1',
                    dishName: 'Pepperoni Pizza',
                    price: "12.99",
                    dishImage: 'https://satrafoods.com.vn/uploads/Images/mon-ngon-moi-ngay/bun-bo-hue.jpg',
                },
                quantity: 2,
            },
            {
                dish: {
                    id: 'f2',
                    dishName: 'Cheese Pizza',
                    price: "10.99",
                    dishImage: 'https://via.placeholder.com/80',
                },
                quantity: 1,
            },
        ],
        totalPrice: 36.97,
        createdAt: '2025-06-01T12:31:00Z',
    },
    {
        id: 2,
        user: { id: 'u2', fullName: 'Bob Smith' },
        restaurant: { id: 'r2', restaurantName: 'Sushi World' },
        status: 'ongoing',
        orderTime: '2025-05-28T18:00:00Z',
        deliveryPhone: '555-222-3333',
        address: '456 Elm St, Tokyo',
        items: [
            {
                dish: {
                    id: 'f3',
                    dishName: 'Salmon Nigiri',
                    price: "9.99",
                    dishImage: 'https://via.placeholder.com/80',
                },
                quantity: 3,
            },
        ],
        totalPrice: 29.97,
        createdAt: '2025-05-28T18:05:00Z',
    },
];

export default Order;
