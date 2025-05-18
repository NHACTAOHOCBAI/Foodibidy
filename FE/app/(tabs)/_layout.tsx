
import TabItem from '@/components/TabItem'
import { icons } from '@/constants/icons'
import { Tabs } from 'expo-router'
import { QueryClient, QueryClientProvider } from 'react-query'
const _layout = () => {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarActiveTintColor: '#FF7622',
                    tabBarInactiveTintColor: '#878787',
                }}
                initialRouteName='home/index'
            >
                <Tabs.Screen
                    name="home/index"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <TabItem
                                title='Home'
                                focus={focused}
                                url={icons.homeIcon} />
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
                                url={icons.bookmark} />
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
        </QueryClientProvider>
    )
}

export default _layout
