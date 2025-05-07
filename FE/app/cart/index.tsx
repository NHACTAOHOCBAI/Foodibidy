import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { MotiView, ScrollView } from 'moti'
import QuantitySelector from '@/components/QuantitySelector'
import Button from '@/components/Button'
import Input from '@/components/Input'

const Cart = () => {

    return (
        <View className='pt-[120px] bg-slate-100'>
            <ScrollView className=' w-full h-full z-[1] px-[24px] '>
                <FlatList className='py-[20px]'
                    data={cartData}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        gap: 12,
                        paddingBottom: 400
                    }}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <CartItem
                            key={item.id}
                            cart={item}
                        />
                    )}
                />
            </ScrollView>

            <View className='absolute z-10 bottom-0 bg-white w-full rounded-s-[25px] px-[24px] pt-[20px] pb-[65px]'>
                <View className='flex-row justify-between'>
                    <Text className='uppercase text-[14px] text-[#A0A5BA]'>delivery address</Text>
                    <Text
                        className='uppercase text-[14px] text-primary border-b-[1px] border-primary'>Edit</Text>
                </View>


                <View className='mt-[10px]'>
                    <Input title='Di An, Binh Duong' />
                </View>

                <View className='mt-[30px] flex-row items-center mb-[32px]'>
                    <Text className='uppercase text-[14px] text-[#A0A5BA]'>Total:</Text>
                    <Text className='text-[30px] text-black'>{` $${96}`}</Text>
                </View>
                <Button
                    title='Place order'
                    size='large'
                />
            </View>
        </View>
    )
}

const CartItem = ({ cart }: { cart: cart }) => (
    <Pressable>
        {({ pressed }) => (
            <MotiView
                className=" bg-slate-700 flex-row gap-[20px] w-full rounded-[20px] p-[10px]"
                style={{
                    boxShadow: " 0 1px 4px 0 rgba(0, 0, 0, 0.1)"
                }}
                animate={{
                    scale: pressed ? 0.9 : 1,
                }}
                transition={{
                    type: 'timing',
                    duration: 100,
                }}
            >
                <Image
                    className="bg-accent w-[130px] h-[130px] rounded-[20px]"
                />
                <View className='flex-1'>
                    <Text
                        className='font-medium text-[18px] text-white'
                        numberOfLines={1}>
                        {cart.foodName}
                    </Text>
                    <Text
                        className='font-bold text-[20px] mt-auto text-white'
                    >
                        {`$${cart.price}`}
                    </Text>
                    <View className='mt-auto  items-end' >
                        <QuantitySelector
                            value={cart.quantity}
                            setValue={() => { }}
                        />
                    </View>
                </View>
            </MotiView>
        )}
    </Pressable>
)

const cartData: cart[] = [
    {
        id: 1,
        foodName: "Margherita Pizza",
        quantity: 2,
        price: 12.99,
        restaurantName: "Luigi's Italian Kitchen"
    },
    {
        id: 2,
        foodName: "Beef Burger",
        quantity: 1,
        price: 8.5,
        restaurantName: "Burger Town"
    },
    {
        id: 3,
        foodName: "Salmon Sushi Set",
        quantity: 3,
        price: 18.0,
        restaurantName: "Tokyo Sushi"
    },
    {
        id: 4,
        foodName: "Pad Thai",
        quantity: 2,
        price: 10.75,
        restaurantName: "Thai Express"
    },
    {
        id: 5,
        foodName: "Chicken Biryani",
        quantity: 1,
        price: 9.99,
        restaurantName: "Spice of India"
    }
];

export default Cart

const styles = StyleSheet.create({})