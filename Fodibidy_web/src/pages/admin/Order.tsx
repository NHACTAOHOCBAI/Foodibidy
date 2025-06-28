/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import UpdateOrder from '../../components/order/UpdateOrder';
import { getMyOrder } from '../../services/order';
import convertDateFormat from '../../utils/convertDateFormat';

const Order = () => {
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const [updatedOrder, setUpdatedOrder] = useState<Order>()
    const [isPending, setIsPending] = useState(false)
    const [orders, setOrders] = useState<Order[]>([])
    const refetchData = async () => {
        setIsPending(true)
        const res = await getMyOrder()
        console.log(res)
        setOrders(res)
        setIsPending(false)
    }
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
        {
            title: 'Placed At',
            dataIndex: 'createdAt',
            render: (time) => convertDateFormat(time),
        },
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
    useEffect(() => {
        refetchData()
    }, []);
    return (
        <>
            <Table<Order>
                loading={isPending}
                bordered columns={columns} dataSource={orders}
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
                setUpdatedOrder={setUpdatedOrder}
                refetchData={refetchData}
            />
        </>
    );
};


export default Order;
