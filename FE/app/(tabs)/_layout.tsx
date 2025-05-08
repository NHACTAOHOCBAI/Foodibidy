
import TabItem from '@/components/TabItem'
import { icons } from '@/constants/icons'
import { Tabs } from 'expo-router'
const _layout = () => {
    return (
        <Tabs
            initialRouteName='profile'
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarActiveTintColor: '#FF7622',
                tabBarInactiveTintColor: '#878787',
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabItem
                            title='Home'
                            focus={focused}
                            url={icons.home} />
                    )
                }}
            />
            <Tabs.Screen
                name="orders"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabItem
                            title='Orders'
                            focus={focused}
                            url={icons.order} />
                    )
                }}
            />
            <Tabs.Screen
                name="book_mark"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabItem
                            title='Bookmark'
                            focus={focused}
                            url={icons.save} />
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabItem
                            title='Profile'
                            focus={focused}
                            url={icons.profile} />
                    )
                }}
            />
        </Tabs>
    )
}

export default _layout
