/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spin, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import MyRestaurant from '../../components/profile/MyRestaurant';
import MyProfile from '../../components/profile/MyProfile';
import { useEffect, useState } from 'react';
import { getMyProfile } from '../../services/auth';

const onChange = (key: string) => {
    console.log(key);
};

type MyProfileType = {
    restaurant?: any;
    user: any
};

const Profile = () => {
    const [myProfile, setMyProfile] = useState<MyProfileType | undefined>(undefined)
    const [isPending, setIsPending] = useState(false)
    const fetchMyProfile = async () => {
        setIsPending(true)
        const res = await getMyProfile()
        setMyProfile(res)
        setIsPending(false)
    }
    useEffect(() => {
        fetchMyProfile()
    }, [])
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Restaurant',
            children: <MyRestaurant
                fetchMyProfile={fetchMyProfile}
                myRestaurant={myProfile?.restaurant} />
        },
        {
            key: '2',
            label: 'Account',
            children: <MyProfile
                fetchMyProfile={fetchMyProfile}
                myAccount={myProfile?.user}
            />,
        },
    ];
    return (
        isPending ?
            <div style={{ width: '100%', height: '100%', display: "flex", justifyContent: 'center', alignItems: 'center' }}> <Spin size="large" /> </div>
            :
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    )
}

export default Profile;
