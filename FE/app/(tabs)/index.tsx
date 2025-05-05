
import SearchInput from '@/components/SearchInput'
import SmallCategoryItem from '@/components/SmallCategoryItem'
import SmallFoodItem from '@/components/SmallFoodItem'
import SmallRestaurantItem from '@/components/SmallRestaurantItem'
import { icons } from '@/constants/icons'
import { Link } from 'expo-router'
import { FlatList, Image, ScrollView, Text, View } from 'react-native'
const categories = [
  {
    id: 1,
    name: 'Hot Dog',
  },
  {
    id: 2,
    name: 'Burger',
  },
  {
    id: 3,
    name: 'Pizza',
  },
  {
    id: 4,
    name: 'Salad',
  }
]
const restaurants = [
  {
    id: 1,
    name: 'Burger King',
    image: '',
    rate: 4.5,
    categories: [
      'Burger', 'Fast Food'
    ]
  },
  {
    id: 2,
    name: 'Pizza Hut',
    image: '',
    rate: 4.6,
    categories: [
      'Pizza', 'Fast Food'
    ]
  },
  {
    id: 3,
    name: 'KFC',
    image: '',
    rate: 4.7,
    categories: [
      'Chicken', 'Fast Food', 'Fried Chicken'
    ]
  }
]
const foods = [
  {
    id: 1,
    name: 'Burger',
    image: '',
    price: 10,
    restaurantName: 'Burger King',
  },
  {
    id: 2,
    name: 'Pizza',
    image: '',
    price: 15,
    restaurantName: 'Pizza Hut',
  },
  {
    id: 3,
    name: 'Fried Chicken',
    image: '',
    price: 20,
    restaurantName: 'KFC',
  },
  {
    id: 4,
    name: 'Salad',
    image: '',
    price: 5,
    restaurantName: 'Healthy Food',
  },
  {
    id: 5,
    name: 'Sushi',
    image: '',
    price: 18,
    restaurantName: 'Tokyo Sushi',
  },
  {
    id: 6,
    name: 'Tacos',
    image: '',
    price: 12,
    restaurantName: 'Taco Bell',
  },
  {
    id: 7,
    name: 'Pho',
    image: '',
    price: 9,
    restaurantName: 'Pho 24',
  },
  {
    id: 8,
    name: 'Banh Mi',
    image: '',
    price: 4,
    restaurantName: 'Banh Mi Saigon',
  },
  {
    id: 9,
    name: 'Pasta',
    image: '',
    price: 14,
    restaurantName: 'Little Italy',
  },
  {
    id: 10,
    name: 'Steak',
    image: '',
    price: 25,
    restaurantName: 'Texas Grill',
  },
];

const categoriesList = [{ id: 0, name: 'All' }, ...categories]
const index = () => {
  return (
    <View className='flex-1 bg-slate-500 items-center '>
      <Header />
      <ScrollView className='bg-slate-100 w-full h-full pt-[250px]'>
        <Categories />
        <Restaurants />
        <Foods />
      </ScrollView>
    </View>
  )
}

const Header = () => (
  <View className='px-[24px] absolute z-[1] h-fit pb-[10px] bg-white w-full '>

    <View className='flex-row mt-[54px] items-center'>
      <Image
        className='w-[45px] h-[45px] rounded-full bg-accent'
      />

      <View className='ml-[18px] gap-[3px]'>
        <Text className='font-bold uppercase text-[12px] text-primary'>Deliver to</Text>
        <View className='flex-row items-center gap-[9px]'>
          <Text className='text-[#676767]'>Halal Lab office</Text>
          <Image source={icons.triangle} resizeMode='contain' className='w-[10px] h-[10px]' />
        </View>
      </View>

      <View className='ml-auto w-[45px] h-[45px] rounded-full items-center justify-center bg-secondary'>
        <Image source={icons.bag} resizeMode='contain' className='w-[24px] h-[24px]' />
      </View>
    </View>

    <View className='mt-[24px]' >
      <Text className='text-[16px] text-[#1E1D1D]'>Hey Halal, <Text className='font-bold'>Good Afternoon!</Text></Text>
    </View>

    <View className='mt-[16px]'>
      <SearchInput placeholder=' Search for food, groceries, drinks...' />
    </View>

  </View>
)
const Categories = () => (
  <View className=''>
    <View className='px-[24px] flex-row justify-between items-center '>
      <Text className='text-[#32343E] text-[20px]'>All Categories</Text>
      <Link href={'/categories'}>
        <View className='flex-row items-center gap-[10px]'>
          <Text className='text-[#333333] text-[16px] '>See All</Text>
          <Image tintColor={"#A0A5BA"} source={icons.arrow} resizeMode='contain' className='w-[10px] h-[10px]' />
        </View>
      </Link>
    </View>

    <FlatList className='py-[20px] '
      data={categoriesList}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 7,
        paddingLeft: 24,
        paddingRight: 40,
      }}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <SmallCategoryItem
          id={item.id}
          name={item.name}
        />
      )}
    />
  </View>
)
const Restaurants = () => (
  <View className='mt-[12px]'>
    <View className='px-[24px] flex-row justify-between items-center '>
      <Text className='text-[#32343E] text-[20px]'>Open Restaurants</Text>
      <Link href={'/restaurants'}>
        <View className='flex-row items-center gap-[10px]'>
          <Text className='text-[#333333] text-[16px] '>See All</Text>
          <Image tintColor={"#A0A5BA"} source={icons.arrow} resizeMode='contain' className='w-[10px] h-[10px]' />
        </View>
      </Link>
    </View>

    <FlatList className='py-[20px]'
      data={restaurants}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        gap: 28,
        paddingHorizontal: 24,
      }}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <SmallRestaurantItem
          image={item.image}
          rate={item.rate}
          categories={item.categories}
          id={item.id}
          name={item.name}
        />
      )}
    />
  </View>
)
const Foods = () => (
  <View className='mt-[12px]'>
    <View className='px-[24px] flex-row justify-between items-center '>
      <Text className='text-[#32343E] text-[20px]'>Popular Foods</Text>
    </View>

    <FlatList className='py-[20px] pb-[400px]'
      data={foods}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 24,
        gap: 28,
      }}
      columnWrapperStyle={{
        justifyContent: 'space-between',

      }}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <SmallFoodItem
          image={item.image}
          price={item.price}
          restaurantName={item.restaurantName}
          id={item.id}
          name={item.name}
        />
      )}
    />
  </View>
)
export default index
