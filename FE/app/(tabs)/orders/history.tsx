import Button from '@/components/Button';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ScrollView, FlatList, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import moment from 'moment'
import { getHistoryOrders } from '@/services/order';
interface DetailOrder {
    id: string;
    foodName: string;
    price: number;
    quantity: number;
    status: string;
    receivedAt: string;
}
interface Order {
    id: number;
    user: Pick<Account, 'id' | 'fullName'>;
    restaurant: Pick<Restaurant, 'id' | 'restaurantName'>;
    status: 'pending' | 'preparing' | 'delivered' | 'cancelled';
    orderTime: string;
    deliveryPhone?: string;
    items: {
        dish: Pick<Food, 'id' | 'dishName' | 'price' | 'dishImage'>;
        quantity: number;
    }[]
    totalPrice: number;
    createdAt: string
}
const History = () => {
    const [historyOrders, setHistoryOrders] = useState<Order[]>();
    const [detailOrders, setDetailOrders] = useState<DetailOrder[]>([]);
    useEffect(() => {
        const fetchHistoryOrders = async () => {
            const res = await getHistoryOrders('FV6KteJ9KjODzkKHA998') as Order[]
            setHistoryOrders(res);
        }
        fetchHistoryOrders();
    }, []);
    useEffect(() => {
        if (!historyOrders) return;
        const convertedDetails: DetailOrder[] = historyOrders.flatMap(order =>
            order.items.map(item => ({
                id: item.dish.id,
                foodName: item.dish.dishName,
                price: item.dish.price,
                quantity: item.quantity,
                status: order.status,
                receivedAt: order.createdAt,
            }))
        );

        setDetailOrders(convertedDetails);
    }, [historyOrders]);

    return (
        <View className='bg-white flex-1'>
            <ScrollView
                showsVerticalScrollIndicator={false}
                className='z-[1] px-[24px]'
                contentContainerStyle={{
                    paddingBottom: 400
                }}>
                <FlatList
                    className="py-[20px]"
                    data={detailOrders}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ gap: 28 }}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <OrderItem detailItem={item} />}
                />
            </ScrollView>
        </View>
    )
}

const OrderItem = ({ detailItem }: { detailItem: DetailOrder }) => {
    const router = useRouter();
    const receivedAt = moment(detailItem.receivedAt).format('DD MMM, HH:mm');


    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => router.push(`/foods/${detailItem.id}`)}
        >
            <View className='flex-row gap-[28px] pb-[16px] border-b-[1px] border-b-gray-100'>
                <Text className={`text-[14px] font-bold ${detailItem.status === "Canceled" ? "text-[#FF0000]" : "text-[#059C6A]"}`}>
                    {detailItem.status}
                </Text>
            </View>

            <View className='mt-[16px] flex-row items-center '>
                <Image
                    className='bg-accent w-[60px] h-[60px] rounded-[8px]'
                />

                <View className='ml-[14px] flex-1 gap-[10px]'>
                    <View className='flex-row justify-between' >
                        <Text className='text-[14px] font-bold'>{detailItem.foodName}</Text>
                        <Text className='text-[#6B6E82] underline'>{`#${detailItem.id}`}</Text>
                    </View>
                    <View className='flex-row gap-[14px]'>
                        <Text className='text-[14px] font-bold'>{`$${detailItem.price}`}</Text>
                        <View className='w-[1px] h-full bg-gray-100'></View>
                        <Text className='text-[14px] text-[#6B6E82]'>{receivedAt}</Text>
                        <View className='w-[1px] h-full bg-gray-100'></View>
                        <Text className='text-[14px] text-[#6B6E82]'>{`${detailItem.quantity} Items`}</Text>
                    </View>
                </View>
            </View>

            <View className='flex-row justify-between mt-[24px]'>
                <Button
                    title='Rate'
                    size='small'
                    outline={true}
                />
                <Button
                    title='Re-Order'
                    size='small'
                />
            </View>
        </TouchableOpacity>
    )
}

export default History