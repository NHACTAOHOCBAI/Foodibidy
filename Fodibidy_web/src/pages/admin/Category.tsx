/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Image, Popconfirm, Button, message } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined, EditOutlined, } from '@ant-design/icons'
import { useEffect, useState } from 'react';
import { deleteCategoryById, getAllCategories } from '../../services/category';
import { AiOutlinePlus } from 'react-icons/ai';
import NewCategory from '../../components/category/NewCategory';
import UpdateCategory from '../../components/category/UpdateCategory';
import convertDateFormat from '../../utils/convertDateFormat';
const Category = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [categories, setCategories] = useState<Category[]>([])
    const [isPending, setIsPending] = useState(false)
    const [isNewOpen, setIsNewOpen] = useState(false)
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const [updatedCategory, setUpdatedCategory] = useState<Category>()
    const fetchCategories = async () => {
        setIsPending(true)
        const res = await getAllCategories()
        setCategories(res)
        setIsPending(false)
    }
    const handleDelete = async (id: string) => {
        try {
            await deleteCategoryById(id)
            await fetchCategories()
            messageApi.success('Delete category successfully')
        }
        catch (error) {
            messageApi.error(String(error))
        }
    }
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
            title: "Action",
            render: (_, value) => (
                <div style={{ display: 'flex', gap: 10 }}>
                    <div
                        style={{ color: "blue" }}
                        onClick={() => {
                            setIsUpdateOpen(true)
                            setUpdatedCategory(value)
                        }}
                    >
                        <EditOutlined />
                    </div>
                    <Popconfirm
                        title="Delete the category"
                        description="Are you sure?"
                        onConfirm={() => { handleDelete(value.id) }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <div style={{ color: "red" }}><DeleteOutlined /></div>
                    </Popconfirm>
                </div>
            ),
        }
    ];
    useEffect(() => {
        fetchCategories()
    }, []);
    return (
        <>
            {contextHolder}
            <div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                    <Button icon={<AiOutlinePlus />} onClick={() => setIsNewOpen(true)}>Create Category</Button>
                </div>
                <Table<Category>
                    loading={isPending}
                    bordered columns={columns} dataSource={categories} rowKey="id" />
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
    )
};
export default Category;
