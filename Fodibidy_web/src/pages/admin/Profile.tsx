/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import MyRestaurant from '../../components/profile/MyRestaurant';
import MyProfile from '../../components/profile/MyProfile';
import { useContext } from 'react';
import { MyProfileContext } from '../../context/MyProfileContext';

const onChange = (key: string) => {
    console.log(key);
};


const Profile = () => {
    const { myProfile: profile } = useContext(MyProfileContext)
    const items: TabsProps['items'] = [
        ...(profile?.role === 'restaurant'
            ? [
                {
                    key: '1',
                    label: 'Restaurant',
                    children: <MyRestaurant
                    />
                },
            ]
            : []),
        {
            key: '2',
            label: 'Account',
            children: <MyProfile

            />,
        },
    ];
    return (
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    )
}

export default Profile;
