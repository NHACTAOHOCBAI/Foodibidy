import TabItem from '@/components/TabItem';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { Text } from 'react-native';
const { Navigator } = createMaterialTopTabNavigator();
const TopTabs = withLayoutContext(Navigator);

export default function Layout() {
    return (
        <>
            <Text className='text-[17px] bg-white px-[24px] pt-[62px]'>My Orders</Text>
            <TopTabs
                className='mx-[24px]'
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarIndicatorStyle: { backgroundColor: '#FF7622', width: 146, marginLeft: 30 },
                }}
            >
                <TopTabs.Screen
                    name="ongoing"
                    options={{
                        tabBarIcon: ({ focused }: any) => (
                            <TabItem
                                title='Ongoing'
                                focus={focused} />
                        )
                    }}
                />
                <TopTabs.Screen
                    name="history"
                    options={{
                        tabBarIcon: ({ focused }: any) => (
                            <TabItem
                                title='History'
                                focus={focused} />
                        )
                    }}
                />
            </TopTabs>
        </>
    );
}