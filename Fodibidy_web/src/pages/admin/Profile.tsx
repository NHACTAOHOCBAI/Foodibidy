import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import MyRestaurant from '../../components/profile/MyRestaurant';
import MyProfile from '../../components/profile/MyProfile';

const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Restaurant',
        children: <MyRestaurant />
    },
    {
        key: '2',
        label: 'Account',
        children: <MyProfile />,
    },
];

const Profile = () => {
    return (
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    )
}

export default Profile;
