
import TabItem from '@/components/TabItem'
import { icons } from '@/constants/icons'
import { Tabs } from 'expo-router'
const _layout = () => {
    return (
        <Tabs
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
                    tabBarIcon: ({ color }) => (
                        <TabItem
                            title='Home'
                            color={color}
                            url={icons.home} />
                    )
                }}
            />
            <Tabs.Screen
                name="orders"
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabItem
                            title='Orders'
                            color={color}
                            url={icons.order} />
                    )
                }}
            />
            <Tabs.Screen
                name="book_mark"
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabItem
                            title='Bookmark'
                            color={color}
                            url={icons.save} />
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabItem
                            title='Profile'
                            color={color}
                            url={icons.profile} />
                    )
                }}
            />
        </Tabs>
    )
}

export default _layout
