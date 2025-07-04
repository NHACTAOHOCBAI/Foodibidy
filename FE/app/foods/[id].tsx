import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { icons } from '@/constants/icons';
import Button from '@/components/Button';
import QuantitySelector from '@/components/QuantitySelector';
import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useAddDishToCart } from '@/hooks/useCart';
import { showErrorToast, showSuccessToast } from '@/components/Toast';
import { useAddMyFavourite } from '@/hooks/useFavourite';
import { checkFavouriteFood } from '@/services/favourite'; // Import the API

const FoodDetail = () => {
    const { data } = useLocalSearchParams();
    const food = JSON.parse(data as string) as Food;
    const [quantity, setQuantity] = useState(1);
    const [isFavourite, setIsFavourite] = useState(false); // State for favorite status
    const { mutate: addToCart, isLoading: isLoadingAddDishToCart } = useAddDishToCart();
    const { mutate: addMyFavourite, isLoading: isLoadingAddMyFavourite } = useAddMyFavourite();

    // Fetch favorite status on mount
    useEffect(() => {
        const fetchFavouriteStatus = async () => {
            try {
                const response = await checkFavouriteFood(food.id);
                setIsFavourite(response); // Assuming response is a boolean
            } catch (error) {
                console.error('Error checking favourite status:', error);
                setIsFavourite(false); // Default to false on error
            }
        };
        fetchFavouriteStatus();
    }, [food.id]);

    const onAddToCart = () => {
        addToCart(
            { idDish: food.id, quantity: quantity },
            {
                onSuccess: () => {
                    showSuccessToast(`You just have added ${food.dishName} successfully`);
                    setQuantity(1);
                },
                onError: () => {
                    showErrorToast('Cannot add food to cart. Please do again');
                },
            }
        );
    };

    const addMyFavouriteFood = () => {
        addMyFavourite(
            { dishId: food.id },
            {
                onSuccess: () => {
                    showSuccessToast(`You loved ${food.dishName}`);
                    setIsFavourite(true); // Update to red heart
                    setQuantity(1);
                },
                onError: () => {
                    showErrorToast('Cannot add food to My favourite foods. Please do again');
                },
            }
        );
    };

    return (
        <View className='flex-1 relative'>
            {(isLoadingAddDishToCart || isLoadingAddMyFavourite) && (
                <View className='absolute z-50 inset-0 opacity-35 bg-gray-300 items-center justify-center'>
                    <ActivityIndicator size='large' color='gray' />
                </View>
            )}
            <TouchableOpacity
                onPress={addMyFavouriteFood}
                className='ml-auto w-[45px] h-[45px] rounded-full items-center justify-center bg-[#ECF0F4] absolute z-[10] top-[50px] right-[24px]'
            >
                <Image
                    tintColor={isFavourite ? 'red' : '#181C2E'} // Red if favorite, black otherwise
                    source={icons.heart}
                    resizeMode='contain'
                    className='w-[14px] h-[14px] rotate'
                />
            </TouchableOpacity>

            <ScrollView
                className='bg-white'
                contentContainerStyle={{ paddingBottom: 400 }}
                scrollEnabled={!(isLoadingAddDishToCart || isLoadingAddMyFavourite)}
            >
                <Image
                    source={{ uri: food.dishImage !== '' ? food.dishImage : undefined }} // Fixed typo: dishName -> dishImage
                    className='bg-accent w-full h-[400px] rounded-[20px]'
                    resizeMode='cover'
                />
                <View className='p-[24px] pb-0'>
                    <Text className='font-bold text-[20px]'>{food.dishName}</Text>
                    <Text className='text-[14px] mt-[15px]'>{food.restaurant.restaurantName}</Text>

                    <View className='mt-[15px] flex-row items-center gap-[24px]'>
                        <View className='flex-row items-center gap-[4px]'>
                            <Image source={icons.star} className='size-6' resizeMode='contain' />
                            <Text className='font-bold text-[16px]'>{food.rating}</Text>
                        </View>
                        <View className='flex-row items-center gap-[9px]'>
                            <Image source={icons.delivery} className='size-6' resizeMode='contain' />
                            <Text className='text-[14px]'>Free</Text>
                        </View>
                    </View>

                    <Text className='text-[14px] text-[#A0A5BA]' style={{ lineHeight: 24, marginTop: 15, marginBottom: 35 }}>
                        {food.description}
                    </Text>
                </View>
            </ScrollView>

            <View className='absolute bottom-0 bg-[#F0F5FA] w-full rounded-s-[25px] px-[24px] pt-[20px] pb-[65px]'>
                <View className='flex-row justify-between mb-[24px] items-center'>
                    <Text className='text-[28px]'>{`$${food.price * quantity}`}</Text>
                    <QuantitySelector value={quantity} setValue={setQuantity} />
                </View>
                <Button
                    onPress={onAddToCart}
                    size='large'
                    title={isLoadingAddDishToCart ? 'Adding...' : 'Add to cart'}
                />
            </View>
        </View>
    );
};

export default FoodDetail;

const styles = StyleSheet.create({});