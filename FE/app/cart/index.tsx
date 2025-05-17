import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { MotiView, ScrollView } from 'moti'
import QuantitySelector from '@/components/QuantitySelector'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { useState } from 'react'
import { useData } from '@/context/DataContext'

const PAGE_SIZE = 4
const Cart = () => {
    const { cart } = useData();
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [loadingMore, setLoadingMore] = useState(false);

    // Hàm load thêm dữ liệu
    const handleLoadMore = () => {
        if (visibleCount >= cart.length || loadingMore) return;

        setLoadingMore(true);

        // Mô phỏng delay tải dữ liệu (API call)
        setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, cart.length));
            setLoadingMore(false);
        }, 2000);
    };
    return (
        <View className='pt-[120px] bg-slate-700'>
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 400
                }}
                className=' w-full h-full z-[1] px-[24px] '>
                <FlatList
                    className="py-[20px]"
                    data={cart.slice(0, visibleCount)} // Chỉ hiển thị phần tử từ 0 đến visibleCount
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ gap: 28 }}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <CartItem cart={item} />}

                    // Lazy loading props
                    onEndReached={handleLoadMore} // Gọi khi cuộn tới cuối danh sách
                    onEndReachedThreshold={0.5} // Khi cuộn đến 50% cuối danh sách
                    initialNumToRender={PAGE_SIZE} // Render ban đầu
                    maxToRenderPerBatch={PAGE_SIZE} // Tối đa render mỗi batch

                    ListFooterComponent={loadingMore ? (
                        <ActivityIndicator size="small" color="#999" style={{ marginVertical: 10 }} />
                    ) : null} // Hiển thị loader khi đang tải thêm
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

const CartItem = ({ cart }: { cart: CartItem }) => (
    <Pressable>
        {({ pressed }) => (
            <MotiView
                className=" bg-slate-700 flex-row gap-[20px] w-full rounded-[20px] p-[10px] py-[0px]"
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
                    resizeMode='cover'
                    source={{ uri: "https://file.hstatic.net/200000391061/article/sushi-mon-an-quoc-dan-cua-nguoi-nhat-2_c940b210a8094194b29216c31a3620d0_1024x1024.jpg" }}
                    className="bg-accent w-[130px] h-[150px] rounded-[20px]"
                    style={{
                        transform: [
                            { rotateX: '40deg' },
                        ],
                    }}
                />
                <View className='flex-1'>
                    <Text
                        className='font-medium text-[18px] text-white mt-[20px]'
                        numberOfLines={1}>
                        {cart.foodName}
                    </Text>
                    <Text
                        className='font-bold text-[20px] text-white mt-[10px]'
                    >
                        {`$${cart.price}`}
                    </Text>
                    <View className=' items-end mt-auto mb-[15px]' >
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


export default Cart

const styles = StyleSheet.create({})