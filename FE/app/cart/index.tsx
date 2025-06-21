import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { MotiView } from 'moti'
import QuantitySelector from '@/components/QuantitySelector'
import { getMyCart } from '@/services/cart'
import LazyFlatList from '@/components/LazyFlatList'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Checkbox from '@/components/CheckBox'
import { useCallback, useRef, useState } from 'react'
import { useAddDishToCart } from '@/hooks/useCart'
import { useFocusEffect, useRouter } from 'expo-router'

interface CartItemType {
    dish: Food
    quantity: number
}

const PAGE_SIZE = 4

const Cart = () => {
    const router = useRouter();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const { mutate: addDishToCartMutate } = useAddDishToCart();

    const fetchMyCart = async (page: number) => {
        const res = await getMyCart("ENzhNl05Rc45pBp3ZhHb", page, PAGE_SIZE) as Cart;
        // Gộp dữ liệu nếu đang load thêm
        setCartItems(prev => page === 1 ? res.dishes : [...prev, ...res.dishes]);
        return res.dishes;
    };

    // Thêm useFocusEffect để refetch khi focus
    useFocusEffect(
        useCallback(() => {
            // Gọi lại loadInitial từ LazyFlatList
            loadInitialRef.current(); // Sử dụng ref để gọi hàm loadInitial
        }, [])
    );

    // Tạo ref để gọi loadInitial từ LazyFlatList
    const loadInitialRef = useRef(() => { });

    const toggleItemSelection = (id: string) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const updateQuantity = (id: string, newQuantity: number, serverQuantity: number) => {
        const localQuantity = quantities[id] ?? serverQuantity;
        const delta = newQuantity - localQuantity;

        if (delta === 0) return;

        addDishToCartMutate({
            idCart: "ENzhNl05Rc45pBp3ZhHb",
            idDish: id,
            quantity: delta,
        });

        setQuantities(prev => ({ ...prev, [id]: newQuantity }));
    };

    const handlePlaceOrder = () => {
        router.replace("/cart/detailOrder");
        const selectedWithQuantity = selectedItems.map(id => {
            const item = cartItems.find(ci => ci.dish.id === id);
            return {
                id,
                quantity: quantities[id] ?? item?.quantity ?? 1,
            };
        });
    };

    const renderHeader = () => (
        <View className='mt-[100px]' />
    );

    return (
        <View className='flex-1 bg-white'>
            <LazyFlatList<CartItemType>
                numColumns={1}
                fetchData={fetchMyCart}
                pageSize={PAGE_SIZE}
                renderItem={({ item }) => (
                    <CartItem
                        foods={item}
                        isSelected={selectedItems.includes(item.dish.id)}
                        toggleSelection={toggleItemSelection}
                        quantity={quantities[item.dish.id] ?? item.quantity}
                        updateQuantity={(id, val) => updateQuantity(id, val, item.quantity)}
                    />
                )}
                keyExtractor={(item) => item.dish.id}
                ListHeaderComponent={renderHeader()}
                setLoadInitialRef={(ref) => (loadInitialRef.current = ref)} // Truyền ref để gọi loadInitial
            />

            <View className='absolute z-10 bottom-0 bg-white w-full rounded-s-[25px] px-[24px] pt-[20px] pb-[65px]'>
                <View className='flex-row justify-between'>
                    <Text className='uppercase text-[14px] text-[#A0A5BA]'>delivery address</Text>
                    <Text className='uppercase text-[14px] text-primary border-b-[1px] border-primary'>Edit</Text>
                </View>

                <View className='mt-[10px]'>
                    <Input title='Di An, Binh Duong' />
                </View>

                <View className='mt-[30px] flex-row items-center mb-[32px]'>
                    <Text className='uppercase text-[14px] text-[#A0A5BA]'>Total:</Text>
                    <Text className='text-[30px] text-black'>{` $${96}`}</Text>
                </View>

                <Button
                    onPress={handlePlaceOrder}
                    title='Place order'
                    size='large'
                />
            </View>
        </View>
    );
};

const CartItem = ({
    foods,
    isSelected,
    toggleSelection,
    quantity,
    updateQuantity
}: {
    foods: CartItemType
    isSelected: boolean
    toggleSelection: (id: string) => void
    quantity: number
    updateQuantity: (id: string, quantity: number) => void
}) => {
    return (
        <Pressable>
            {({ pressed }) => (
                <MotiView
                    className="bg-slate-700 flex-row gap-[20px] w-full rounded-[20px] p-[10px] py-[0px]"
                    animate={{ scale: pressed ? 0.9 : 1 }}
                    transition={{ type: 'timing', duration: 100 }}
                >
                    <Checkbox
                        value={isSelected}
                        onValueChange={() => toggleSelection(foods.dish.id)}
                    />

                    <Image
                        resizeMode='cover'
                        source={foods.dish.dishImage ? { uri: foods.dish.dishImage } : undefined}
                        className="bg-accent w-[130px] h-[150px] rounded-[20px]"
                        style={{ transform: [{ rotateX: '40deg' }] }}
                    />

                    <View className='flex-1'>
                        <Text className='font-medium text-[18px] text-white mt-[20px]' numberOfLines={1}>
                            {foods.dish.dishName}
                        </Text>
                        <Text className='font-bold text-[20px] text-white mt-[10px]'>
                            {`$${foods.dish.price}`}
                        </Text>
                        <View className='items-end mt-auto mb-[15px]'>
                            <QuantitySelector
                                value={quantity}
                                setValue={(val) => updateQuantity(foods.dish.id, val)}
                            />
                        </View>
                    </View>
                </MotiView>
            )}
        </Pressable>
    )
}

export default Cart

const styles = StyleSheet.create({})
