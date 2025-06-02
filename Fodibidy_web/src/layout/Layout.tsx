import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router';
import { RxDashboard } from 'react-icons/rx';
import { PiBowlFood } from 'react-icons/pi';
import { BiDish } from 'react-icons/bi';
import { SiHomeassistantcommunitystore } from 'react-icons/si';

const { Header, Sider, Content } = Layout;

const AppLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ height: '100%' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <RxDashboard />,
                            label: <Link to="/dashboard">Dashboard</Link>,
                        },
                        {
                            key: '2',
                            icon: <PiBowlFood />,
                            label: <Link to="/foods">Food</Link>,
                        },
                        {
                            key: '3',
                            icon: <BiDish />,
                            label: <Link to="/orders">Order</Link>,
                        },
                        {
                            key: '4',
                            icon: <SiHomeassistantcommunitystore />,
                            label: <Link to="/restaurants">Restaurant</Link>,
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
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
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;