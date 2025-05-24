import SearchInput from '@/components/SearchInput'
import { icons } from '@/constants/icons'
import { Link, useRouter } from 'expo-router'
import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, Text, View } from 'react-native'
import RestaurantItem from '@/components/RestaurantItem'
import FoodItem from '@/components/FoodItem'
import { useEffect, useState } from 'react'
import { getCategoriesPaginated, getMyProfile, getRestaurantsPaginated } from '@/services/mockAPI'
import CategoryItem from '@/components/CategoryItem'
import { useGetCatgory } from '@/hooks/useCategory'
import { useGetRestaurant } from '@/hooks/useRestaurants'
const PAGE_SIZE = 4;
const index = () => {
  return (
    <View className='flex-1 bg-white  '>
      <Header />
      <ScrollView
        className='flex-1 pt-[250px]'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 400
        }}
      >
        <Categories />
        <Restaurants />
        {/* <Foods />  */}
      </ScrollView>
    </View>
  )
}

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
  const { data: restaurants } = useGetRestaurant();
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

const Foods = ({ foods }: { foods: Food[] }) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);

  // Hàm load thêm dữ liệu
  const handleLoadMore = () => {
    if (visibleCount >= foods.length || loadingMore) return;

    setLoadingMore(true);

    // Mô phỏng delay tải dữ liệu (API call)
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, foods.length));
      setLoadingMore(false);
    }, 2000);
  };

  return (
    <View className="mt-[12px] px-[24px]">
      <Text className="text-[#32343E] text-[20px]">Popular Foods</Text>

      <FlatList
        className="py-[20px]"
        data={foods.slice(0, visibleCount)} // Chỉ hiển thị phần tử từ 0 đến visibleCount
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 28 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <FoodItem food={item} />}

        // Lazy loading props
        onEndReached={handleLoadMore} // Gọi khi cuộn tới cuối danh sách
        onEndReachedThreshold={0.8} // Khi cuộn đến 50% cuối danh sách
        initialNumToRender={PAGE_SIZE} // Render ban đầu
        maxToRenderPerBatch={PAGE_SIZE} // Tối đa render mỗi batch

        ListFooterComponent={loadingMore ? (
          <ActivityIndicator size="small" color="#999" style={{ marginVertical: 10 }} />
        ) : null} // Hiển thị loader khi đang tải thêm
      />
    </View>
  );
};

export default index
