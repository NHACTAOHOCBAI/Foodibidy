
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Tag, Image, Popconfirm, Button, message } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import convertDateFormat from '../../utils/convertDateFormat';
import { PiEye } from 'react-icons/pi';
import { deleteAccountById, getAllAccounts } from '../../services/account';
import NewAccount from '../../components/account/NewAccount';
import UpdateAccount from '../../components/account/UpdateAccount';
import DetailAccount from '../../components/account/DetailAccount';

const Account = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [isPending, setIsPending] = useState(false);
    const [isNewOpen, setIsNewOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [updatedAccount, setUpdatedAccount] = useState<Account>();
    const [isDetailOpen, setIsDetailOpen] = useState(false); // Changed to false for consistency
    const [detailAccount, setDetailAccount] = useState<Account>();

    const columns: TableProps<Account>['columns'] = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            render: (url) => <Image width={60} src={url} alt="Account" />,
        },
        {
            title: 'Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            render: (role) => {
                const color = role === 'admin' ? 'blue' : role === 'restaurant' ? 'green' : 'orange';
                return <Tag color={color}>{role.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'Created At',
            render: (_: any, record: Account) => <div>{convertDateFormat(record.createdAt)}</div>,
        },
        {
            title: 'Action',
            render: (_, value) => (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div
                        style={{ color: '#3674B5', cursor: 'pointer' }}
                        onClick={() => {
                            setDetailAccount(value);
                            setIsDetailOpen(true);
                        }}
                    >
                        <PiEye />
                    </div>
                    <div
                        style={{ color: '#FADA7A', cursor: 'pointer' }}
                        onClick={() => {
                            setUpdatedAccount(value);
                            setIsUpdateOpen(true);
                        }}
                    >
                        <EditOutlined />
                    </div>
                    <Popconfirm
                        title="Delete the account"
                        description="Are you sure?"
                        onConfirm={() => handleDelete(value.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <div style={{ color: '#ED3500', cursor: 'pointer' }}>
                            <DeleteOutlined />
                        </div>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const [accounts, setAccounts] = useState<Account[]>([]);

    const refetchData = async () => {
        setIsPending(true);
        try {
            const res = await getAllAccounts();
            console.log(res)
            setAccounts(res);
        } catch (error) {
            messageApi.error(String(error));
        } finally {
            setIsPending(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteAccountById(id);
            await refetchData();
            messageApi.success('Account deleted successfully');
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
                type="primary"
                style={{ marginLeft: 'auto', display: 'block', marginBottom: 10 }}
            >
                <PlusOutlined /> New Account
            </Button>
            <Table<Account>
                loading={isPending}
                bordered
                columns={columns}
                dataSource={accounts}
                rowKey="id"
                pagination={{
                    pageSize: 5, // Số item mỗi trang
                    showTotal: (total) => `Total ${total} accounts`,
                }}
            />
            <NewAccount isModalOpen={isNewOpen} setIsModalOpen={setIsNewOpen} refetchData={refetchData} />
            <UpdateAccount
                isModalOpen={isUpdateOpen}
                setIsModalOpen={setIsUpdateOpen}
                updatedAccount={updatedAccount}
                setUpdatedAccount={setUpdatedAccount}
                refetchData={refetchData}
            />
            <DetailAccount
                isModalOpen={isDetailOpen}
                setIsModalOpen={setIsDetailOpen}
                detailAccount={detailAccount}
            />
        </>
    );
};

export default Account;