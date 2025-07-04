/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, message, Popover, Spin, theme } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { RxDashboard } from 'react-icons/rx';
import { PiBowlFood } from 'react-icons/pi';
import { BiDish } from 'react-icons/bi';
import { SiHomeassistantcommunitystore } from 'react-icons/si';
import { MdOutlineAccountCircle, MdOutlineFoodBank } from 'react-icons/md';
import { ImProfile } from 'react-icons/im';
import { MyProfileContext } from '../context/MyProfileContext';
import { logout } from '../services/auth';

const { Header, Sider, Content } = Layout;

const AppLayout: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [isPending, setIsPending] = useState(false)
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { pathname } = useLocation();
    const endpoints = pathname.split('/').pop() as string;
    const { myProfile, setMyProfile } = useContext(MyProfileContext)
    let items = [
        {
            key: 'dashboard',
            icon: <RxDashboard />,
            label: <Link to="/dashboard">Dashboard</Link>,
        },
        {
            key: 'foods',
            icon: <PiBowlFood />,
            label: <Link to="/foods">Food</Link>,
        },
        {
            key: 'orders',
            icon: <BiDish />,
            label: <Link to="/orders">Order</Link>,
        },
        {
            key: 'restaurants',
            icon: <SiHomeassistantcommunitystore />,
            label: <Link to="/restaurants">Restaurant</Link>,
        },
        {
            key: 'categories',
            icon: <MdOutlineFoodBank />,
            label: <Link to="/categories">Category</Link>,
        },
        {
            key: 'accounts',
            icon: <MdOutlineAccountCircle />,
            label: <Link to="/accounts">Account</Link>,
        },
        {
            key: 'profile',
            icon: <ImProfile />,
            label: <Link to="/profile">Profile</Link>,
        },
    ];
    if (myProfile?.role === "restaurant") {
        items = [
            {
                key: 'dashboard',
                icon: <RxDashboard />,
                label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
                key: 'foods',
                icon: <PiBowlFood />,
                label: <Link to="/foods">Food</Link>,
            },
            {
                key: 'orders',
                icon: <BiDish />,
                label: <Link to="/orders">Order</Link>,
            },
            {
                key: 'profile',
                icon: <ImProfile />,
                label: <Link to="/profile">Profile</Link>,
            },
        ]
    }
    const handleLogout = async () => {
        setIsPending(true)
        try {
            await logout();
            localStorage.removeItem("accessToken")
            localStorage.removeItem("profile")
            navigate('/login')
            messageApi.success("Logout successfully")
        }
        catch (err: any) {
            messageApi.error(err.error)
        }
        setIsPending(false)
    }
    useEffect(() => {
        const profile = localStorage.getItem("profile")
        if (profile) {
            const value = JSON.parse(profile)
            setMyProfile(value)
        }
    }, [])
    return (
        <>
            {
                isPending ?
                    <div style={{ width: '100%', height: '100%', display: "flex", justifyContent: 'center', alignItems: 'center' }}> <Spin size="large" /> </div>
                    :
                    <>
                        {contextHolder}
                        <Layout>
                            <Sider trigger={null} collapsible collapsed={collapsed}>
                                <div className="demo-logo-vertical" />
                                <Menu
                                    selectedKeys={[endpoints]}
                                    theme="dark"
                                    mode="inline"
                                    items={items}
                                />
                            </Sider>
                            <Layout>
                                <Header style={{ padding: 0, background: colorBgContainer }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Button
                                            type="text"
                                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                            onClick={() => setCollapsed(!collapsed)}
                                            style={{
                                                fontSize: '16px',
                                                width: 64,
                                                height: 64,
                                            }}
                                        />
                                        <Popover content={
                                            <div >
                                                <Button
                                                    style={{ display: 'block', width: 150, marginBottom: 10 }}
                                                    onClick={() => navigate('/profile')}
                                                >View profile</Button>
                                                <Button style={{ display: 'block', width: 150 }} onClick={() => handleLogout()}>Log out</Button>
                                            </div>
                                        } >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 20 }}>
                                                {
                                                    myProfile?.avatar === "" ?
                                                        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                                        :
                                                        <Avatar src={<img src={myProfile?.avatar} alt="avatar" />} />
                                                }
                                                <div >{myProfile?.fullName}</div>
                                            </div>
                                        </Popover>

                                    </div>
                                </Header>
                                <Content
                                    style={{
                                        margin: '24px 16px',
                                        padding: 24,
                                        height: "100%",
                                        minHeight: '100vh',
                                        background: colorBgContainer,
                                        borderRadius: borderRadiusLG,
                                    }}
                                >
                                    <Outlet />
                                </Content>
                            </Layout>
                        </Layout>
                    </>

            }

        </>
    );
};

export default AppLayout;