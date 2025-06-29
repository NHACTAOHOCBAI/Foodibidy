/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Image, Popconfirm, Button, message, Input } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useState, useMemo } from 'react';
import { deleteCategoryById, getAllCategories } from '../../services/category';
import { AiOutlinePlus } from 'react-icons/ai';
import NewCategory from '../../components/category/NewCategory';
import UpdateCategory from '../../components/category/UpdateCategory';
import convertDateFormat from '../../utils/convertDateFormat';
import { RiResetLeftFill } from 'react-icons/ri';

const Category = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isPending, setIsPending] = useState(false);
    const [isNewOpen, setIsNewOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [updatedCategory, setUpdatedCategory] = useState<Category>();
    const [searchText, setSearchText] = useState('');

    const fetchCategories = async () => {
        setIsPending(true);
        try {
            const res = await getAllCategories();
            setCategories(res);
        } catch (error) {
            messageApi.error(String(error));
        } finally {
            setIsPending(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteCategoryById(id);
            await fetchCategories();
            messageApi.success('Delete category successfully');
        } catch (error) {
            messageApi.error(String(error));
        }
    };

    const columns: TableProps<Category>['columns'] = [
        {
            title: 'Image',
            dataIndex: 'image',
            render: (url) => <Image width={60} src={url} alt="Dish" />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Created at',
            dataIndex: 'createdAt',
            render: (createdAt) => <div>{convertDateFormat(createdAt)}</div>,
        },
        {
            title: 'Updated at',
            dataIndex: 'updatedAt',
            render: (updatedAt) => <div>{convertDateFormat(updatedAt)}</div>,
        },
        {
            title: 'Sold',
            dataIndex: 'purchase',
        },
        {
            title: 'Action',
            render: (_, value) => (
                <div style={{ display: 'flex', gap: 10 }}>
                    <div
                        style={{ color: '#FADA7A' }}
                        onClick={() => {
                            setUpdatedCategory(value);
                            setIsUpdateOpen(true);
                        }}
                    >
                        <EditOutlined />
                    </div>
                    <Popconfirm
                        title="Delete the category"
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

    // Lọc dữ liệu dựa trên searchText (theo tên danh mục)
    const filteredCategories = useMemo(() => {
        if (!searchText) return categories;
        return categories.filter((category) =>
            category.name.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [categories, searchText]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const handleReset = () => {
        setSearchText('');
    };

    useEffect(() => {
        fetchCategories();
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
                    Category: <Input style={{ width: 400 }} value={searchText} onChange={handleSearchChange} placeholder="Search by category name" />
                </div>
                <Button style={{ display: 'flex', alignItems: 'center' }} type="primary" onClick={handleReset}>
                    <RiResetLeftFill /> Reset
                </Button>
            </div>
            {contextHolder}
            <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                    <Button type="primary" icon={<AiOutlinePlus />} onClick={() => setIsNewOpen(true)}>
                        Create Category
                    </Button>
                </div>
                <Table<Category>
                    loading={isPending}
                    bordered
                    columns={columns}
                    dataSource={filteredCategories}
                    rowKey="id"
                    pagination={{
                        pageSize: 3,
                        showTotal: (total) => `Total ${total} categories`,
                    }}
                />
            </div>
            <UpdateCategory
                setUpdatedCategory={setUpdatedCategory}
                refetchData={fetchCategories}
                isModalOpen={isUpdateOpen}
                setIsModalOpen={setIsUpdateOpen}
                updatedCategory={updatedCategory}
            />
            <NewCategory
                refetchData={fetchCategories}
                isModalOpen={isNewOpen}
                setIsModalOpen={setIsNewOpen}
            />
        </>
    );
};

export default Category;