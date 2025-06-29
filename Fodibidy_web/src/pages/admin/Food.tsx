/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Tag, Image, Popconfirm, Button, message, Input } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState, useMemo, useContext } from 'react';
import NewFood from '../../components/food/NewFood';
import UpdateFood from '../../components/food/UpdateFood';
import { deleteDishById, getAllDish, getMyDish } from '../../services/food';
import convertDateFormat from '../../utils/convertDateFormat';
import formatVND from '../../utils/convertMoney';
import { PiEye } from 'react-icons/pi';
import DetailFood from '../../components/food/DetailFood';
import { getAllCategories } from '../../services/category';
import { CiInboxIn } from 'react-icons/ci';
import Restock from '../../components/food/Restock';
import { RiResetLeftFill } from 'react-icons/ri';
import { MyProfileContext } from '../../context/MyProfileContext';

const Food = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [isPending, setIsPending] = useState(false);
    const [isNewOpen, setIsNewOpen] = useState(false);
    const [isRestockOpen, setIsRestockOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [updatedFood, setUpdatedFood] = useState<Food>();
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [detailFood, setDetailFood] = useState<Food>();
    const [categoryOpt, setCategoryOpt] = useState<{ text: string; value: string }[]>([]);

    const { myProfile } = useContext(MyProfileContext)
    const [foods, setFoods] = useState<Food[]>([]);
    // Thêm state để lưu giá trị tìm kiếm
    const [searchText, setSearchText] = useState('');
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
            filters: categoryOpt,
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
            render: (price) => formatVND(price),
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
            render: (_: any, record: Food) => <div>{convertDateFormat(record.createdAt)}</div>,
        },
        {
            title: 'Updated At',
            render: (_: any, record: Food) => <div>{convertDateFormat(record.updatedAt)}</div>,
        },
        ...(myProfile?.role === 'admin'
            ? [
                {
                    title: 'Restaurant',
                    render: (_: any, record: Food) => (
                        <div>{record.restaurant.restaurantName}</div>
                    ),
                },
            ]
            : []),
        {
            title: 'Action',
            render: (_, value) => (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div
                        style={{ color: '#3674B5' }}
                        onClick={() => {
                            setDetailFood(value);
                            setIsDetailOpen(true);
                        }}
                    >
                        <PiEye />
                    </div>
                    {
                        myProfile?.role === 'restaurant' && (
                            <div
                                style={{ color: '#FADA7A' }}
                                onClick={() => {
                                    setUpdatedFood(value);
                                    setIsUpdateOpen(true);
                                }}
                            >
                                <EditOutlined />
                            </div>
                        )
                    }
                    <Popconfirm
                        title="Delete the food"
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

    // Hàm lọc dữ liệu dựa trên searchText
    const filteredFoods = useMemo(() => {
        if (!searchText) return foods; // Nếu không có giá trị tìm kiếm, trả về toàn bộ danh sách
        return foods.filter((food) =>
            food.dishName.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [foods, searchText]);

    const refetchData = async () => {
        setIsPending(true);
        try {
            let res: Food[] = [];
            if (myProfile?.role === 'restaurant') {
                res = await getMyDish();
            }
            else
                res = await getAllDish()
            const cateRes = await getAllCategories();
            const options = cateRes.map((record) => ({
                value: record.name,
                text: record.name,
            }));
            setCategoryOpt(options);
            setFoods(res);
        } catch (error) {
            messageApi.error(String(error));
        } finally {
            setIsPending(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteDishById(id);
            await refetchData();
            messageApi.success('Delete food successfully');
        } catch (error) {
            messageApi.error(String(error));
        }
    };

    // Xử lý khi người dùng nhập vào ô tìm kiếm
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    // Xử lý khi nhấn nút tìm kiếm (tùy chọn)
    const handleReset = () => {
        setSearchText("")
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
                    Food: <Input style={{ width: 400 }} value={searchText} onChange={handleSearchChange} placeholder="Search by food name" />
                </div>
                <Button style={{ display: 'flex', alignItems: 'center' }} type="primary" onClick={handleReset}>
                    <RiResetLeftFill /> Reset
                </Button>
            </div>
            {contextHolder}
            <DetailFood detailFood={detailFood} setIsDetailOpen={setIsDetailOpen} isDetailOpen={isDetailOpen} />
            <NewFood refetchData={refetchData} isModalOpen={isNewOpen} setIsModalOpen={setIsNewOpen} />
            <Restock refetchData={refetchData} isModalOpen={isRestockOpen} setIsModalOpen={setIsRestockOpen} />
            <UpdateFood
                setUpdatedFood={setUpdatedFood}
                refetchData={refetchData}
                isModalOpen={isUpdateOpen}
                setIsModalOpen={setIsUpdateOpen}
                updatedFood={updatedFood}
            />
            {
                myProfile?.role === 'restaurant' && <div style={{ display: 'flex', gap: 10, justifyContent: 'right' }}>
                    <Button
                        onClick={() => setIsNewOpen(true)}
                        type="primary"
                        style={{ display: 'flex', marginBottom: 10, alignItems: 'center' }}
                    >
                        <PlusOutlined /> New Food
                    </Button>
                    <Button
                        onClick={() => setIsRestockOpen(true)}
                        type="primary"
                        style={{ display: 'flex', marginBottom: 10, alignItems: 'center' }}
                    >
                        <CiInboxIn /> Restock
                    </Button>
                </div>
            }
            <Table<Food>
                loading={isPending}
                bordered
                columns={columns}
                dataSource={filteredFoods} // Sử dụng danh sách đã lọc
                rowKey="id"
                pagination={{
                    pageSize: 4,
                    showTotal: (total) => `Total ${total} Foods`,
                }}
            />
        </>
    );
};

export default Food;