import SearchInput from '@/components/SearchInput';
import { icons } from '@/constants/icons';
import { Link, useRouter, useFocusEffect } from 'expo-router'; // Thêm useFocusEffect
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import RestaurantItem from '@/components/RestaurantItem';
import FoodItem from '@/components/FoodItem';
import { useEffect, useState, useCallback, useRef } from 'react';
import { getCategoriesPaginated, getMyProfile, getRestaurantsPaginated } from '@/services/mockAPI';
import CategoryItem from '@/components/CategoryItem';
import { useGetCatgory } from '@/hooks/useCategory';
import { useGetRestaurant } from '@/hooks/useRestaurants';
import { getDish } from '@/services/dish';
import LazyFlatList from '@/components/LazyFlatList';

const PAGE_SIZE = 4;

const Index = () => {
  const fetchFoods = async (page: number) => {
    return await getDish(page, PAGE_SIZE);
  };

  const renderHeader = (
    <View className="mt-[250px]">
      <Categories />
      <Restaurants />
      <Text className="text-[20px] text-[#32343E] mt-[16px] px-[24px]">Popular Foods</Text>
    </View>
  );

  // Thêm useFocusEffect để refetch khi focus
  useFocusEffect(
    useCallback(() => {
      // Gọi lại loadInitial từ LazyFlatList
      loadInitialRef.current(); // Sử dụng ref để gọi hàm loadInitial
    }, [])
  );

  // Tạo ref để gọi loadInitial từ LazyFlatList
  const loadInitialRef = useRef(() => { });

  return (
    <View className="flex-1 bg-white">
      <Header />
      <LazyFlatList<Food>
        fetchData={fetchFoods}
        pageSize={PAGE_SIZE}
        renderItem={({ item }) => <FoodItem food={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        // Truyền ref để gọi loadInitial
        setLoadInitialRef={(ref) => (loadInitialRef.current = ref)}
      />
    </View>
  );
};


const Header = () => {
  const myProfile = getMyProfile();
  const router = useRouter();
  return (
    <View className='px-[24px] absolute z-[1]  pb-[10px] bg-white w-full '>

      <View className='flex-row mt-[54px] items-center'>
        <Image
          source={myProfile.avatar ? { uri: myProfile.avatar } : undefined}
          className='w-[45px] h-[45px] rounded-full bg-accent'
        />
        <View className='ml-[18px] gap-[3px]'>
          <Text className='font-bold uppercase text-[12px] text-primary'>Deliver to</Text>
          <View className='flex-row items-center gap-[9px]'>
            <Text className='text-[#676767]'>{myProfile.address[0].value}</Text>
            <Image source={icons.triangle} resizeMode='contain' className='w-[13px] h-[10px]' />
          </View>
        </View>
        <Pressable
          className='mt-[16px] ml-auto w-[45px] h-[45px] rounded-full items-center justify-center bg-secondary'
          onPress={() => router.push('/cart')}>
          <Image source={icons.bag} resizeMode='contain' className='w-[24px] h-[24px]' />
        </Pressable>
      </View>

      <View className='mt-[24px]' >
        <Text className='text-[16px] text-[#1E1D1D]'>{`Hey ${myProfile.fullName.split(" ").pop()}, `}<Text className='font-bold'>Good Afternoon!</Text></Text>
      </View>

      <Link
        className='mt-[16px]'
        href={'/search'}>
        <SearchInput
          editable={false}
          placeholder=' Search for food, groceries, drinks...' />
      </Link>
    </View>
  )
}

const Categories = () => {
  const router = useRouter();
  const { data: categories } = useGetCatgory();
  return (
    <View>
      <View className='px-[24px] flex-row justify-between items-center '>
        <Text className='text-[#32343E] text-[20px]'>All Categories</Text>
        <Pressable onPress={() => router.push('/categories')}>
          <View className='flex-row items-center gap-[10px]'>
            <Text className='text-[#333333] text-[16px] '>See All</Text>
            <Image
              tintColor={"#A0A5BA"}
              source={icons.arrow}
              resizeMode='contain'
              className='w-[10px] h-[10px]'
            />
          </View>
        </Pressable>
      </View>

      <FlatList className='py-[20px] '
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 7,
          paddingLeft: 24,
          paddingRight: 40,
        }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CategoryItem
            category={item}
          />
        )}
      />
    </View>
  )
}

const Restaurants = () => {
  const router = useRouter();
  const { data: restaurants } = useGetRestaurant(1, 3);
  return (
    <Pressable
      className='mt-[12px] px-[24px]'
      onPress={() => router.push('/restaurants')}>
      <View className='flex-row justify-between items-center '>
        <Text className='text-[#32343E] text-[20px]'>Famous Restaurants</Text>

        <Pressable onPress={() => router.push('/restaurants')}>
          <View className='flex-row items-center gap-[10px]'>
            <Text className='text-[#333333] text-[16px] '>See All</Text>
            <Image
              tintColor={"#A0A5BA"}
              source={icons.arrow}
              resizeMode='contain'
              className='w-[10px] h-[10px]'
            />
          </View>
        </Pressable>
      </View>

      <FlatList<Restaurant>
        className='py-[20px]'
        data={restaurants}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 28,
        }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RestaurantItem
            restaurant={item}
          />
        )}
      />
    </Pressable >
  )
}


export default Index
