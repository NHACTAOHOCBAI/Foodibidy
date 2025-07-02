import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { MotiView } from 'moti'
import QuantitySelector from '@/components/QuantitySelector'
import { getMyCart } from '@/services/cart'
import LazyFlatList from '@/components/LazyFlatList'
import Button from '@/components/Button'
import Checkbox from '@/components/CheckBox'
import { useCallback, useRef, useState, useEffect } from 'react'
import { useAddDishToCart } from '@/hooks/useCart'
import { useFocusEffect, useRouter } from 'expo-router'
import { useMyAccount } from '@/context/MyAccountContext'
import { icons } from '@/constants/icons'
import { showErrorToast, showSuccessToast } from '@/components/Toast'
import { Picker } from '@react-native-picker/picker'

interface CartItemType {
    dish: Food
    quantity: number
}

interface Address {
    typeName: string
    addressName: string
}

interface Food {
    id: string
    dishName: string
    dishImage?: string
    price: number
}

const PAGE_SIZE = 4

const Cart = () => {
    const router = useRouter();
    const { address } = useMyAccount();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { mutate: addDishToCartMutate } = useAddDishToCart();
    const [isPending, setIsPending] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(
        address && address.length > 0 ? address[0] : null
    );

    const fetchMyCart = async (page: number) => {
        const res = await getMyCart(page, PAGE_SIZE) as CartItemType[];
        if (page === 1) {
            setCartItems(res);
        }
        return res;
    };

    useFocusEffect(
        useCallback(() => {
            loadInitialRef.current();
        }, [])
    );

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
            idDish: id,
            quantity: delta,
        });

        setQuantities(prev => ({ ...prev, [id]: newQuantity }));
    };

    useEffect(() => {
        const calculateTotalPrice = () => {
            const total = cartItems.reduce((sum, item) => {
                if (selectedItems.includes(item.dish.id)) {
                    const quantity = quantities[item.dish.id] ?? item.quantity;
                    return sum + item.dish.price * quantity;
                }
                return sum;
            }, 0);
            setTotalPrice(total);
        };
        calculateTotalPrice();
    }, [selectedItems, quantities, cartItems]);

    const handlePlaceOrder = () => {
        setIsPending(true)
        if (!selectedAddress) {
            showErrorToast('Please select a delivery address before placing the order.');
            setIsPending(false)
            return;
        }

        const selectedItemsData = selectedItems.map(id => {
            return fetchMyCart(1).then(res =>
                res.find(ci => ci.dish.id === id)
            ).then(cartItem => ({
                dish: cartItem?.dish,
                quantity: quantities[id] ?? cartItem?.quantity ?? 1
            }));
        });

        Promise.all(selectedItemsData).then(result => {
            router.push({
                pathname: "/cart/detailOrder",
                params: {
                    data: JSON.stringify(result),
                    deliveryAddress: JSON.stringify(selectedAddress)
                },
            });
            showSuccessToast('Order has been placed successfully!');
        });
        setIsPending(false)
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
                setLoadInitialRef={(ref) => (loadInitialRef.current = ref)}
            />

            <View className='absolute z-10 bottom-0 bg-white w-full rounded-t-[25px] px-[24px] pt-[20px] pb-[65px]'>
                <Text className='uppercase text-[14px] text-[#A0A5BA] mb-[10px]'>Delivery Address</Text>
                <View className='flex-row items-center'>
                    {address && address.length > 0 ? (
                        <View className='flex-row items-center'>
                            <Image
                                resizeMode='contain'
                                className='w-[20px] h-[20px] mr-[10px]'
                                source={selectedAddress?.typeName.toLowerCase() === 'home' ? icons.homeIcon : icons.workIcon}
                            />
                            <Picker
                                selectedValue={selectedAddress ? `${selectedAddress.typeName}-${selectedAddress.addressName}` : ''}
                                onValueChange={(itemValue: string) => {
                                    const [typeName, addressName] = itemValue.split('-');
                                    const selected = address.find(
                                        (item: Address) => item.typeName === typeName && item.addressName === addressName
                                    );
                                    if (selected) {
                                        setSelectedAddress(selected);
                                        showSuccessToast(`Selected address: ${selected.addressName}`);
                                    }
                                }}
                                style={styles.picker}
                                enabled={address && address.length > 0}
                                itemStyle={styles.pickerItem}
                            >
                                {address.map((item: Address, index: number) => (
                                    <Picker.Item
                                        key={`${item.typeName}-${item.addressName}-${index}`}
                                        label={`${item.typeName.toUpperCase()} : ${item.addressName}`}
                                        value={`${item.typeName}------${item.addressName}`}
                                    />
                                ))}
                            </Picker>
                        </View>
                    ) : (
                        <Text className='text-[#A0A5BA]'>No address available</Text>
                    )}
                </View>

                <View className='mt-[30px] flex-row items-center mb-[32px]'>
                    <Text className='uppercase text-[14px] text-[#A0A5BA]'>Total:</Text>
                    <Text className='text-[30px] text-black'>{` $${totalPrice.toFixed(2)}`}</Text>
                </View>

                <Button
                    onPress={handlePlaceOrder}
                    title='Place Order'
                    size='large'
                    loading={isPending}
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

const styles = StyleSheet.create({
    picker: {
        flex: 1,
        height: 50,
        color: '#000',
        width: '90%', // Ensure Picker takes most of the available width
    },
    pickerItem: {
        fontSize: 10,
        color: '#000',
        textAlign: 'left',
    },
})