
import { MotiView } from 'moti'
import { FlatList, Image, Pressable, ScrollView, Text, View } from 'react-native'

const AllCategories = () => {
    return (
        <View className='pt-[120px] bg-slate-100'>
            <ScrollView className='bg-slate-100 w-full h-full z-[1]'>
                <View className='mt-[12px]'>
                    <View className='px-[24px] flex-row justify-between items-center '>
                        <Text className='text-[#32343E] text-[20px]'>Popular Categories</Text>
                    </View>

                    <FlatList className='py-[20px] pb-[400px]'
                        data={categories}
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
                            <CategoryItem
                                category={item}
                            />
                        )}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const CategoryItem = ({ category }: { category: Category }) => {
    return (
        <Pressable>
            {({ pressed }) => (
                <MotiView className='relative w-[160px] '
                    animate={{
                        scale: pressed ? 0.85 : 1,
                    }}
                    transition={{
                        type: 'timing',
                        duration: 100,
                    }}>
                    <View
                        style={{
                            boxShadow: " 0 1px 4px 0 rgba(0, 0, 0, 0.1)",
                        }}
                        className="w-full p-[8px] rounded-[12px] bg-transparent h-[200px]"
                    >
                        <Image
                            source={category.image ? { uri: category.image } : undefined}
                            className='w-full h-[84px] rounded-[12px] bg-accent'
                        />
                        <Text numberOfLines={1} className='font-bold mt-[15px] text-[15px]'>{category.name}</Text>
                        <Text numberOfLines={3} className='mt-[5px] text-[13px]'>{category.note}</Text>
                    </View>
                </MotiView>
            )}
        </Pressable>

    )
}
const categories: Category[] = [
    {
        id: 1,
        name: 'Hot Dog',
        note: 'A popular fast food with sausage and bun.',
        createdAt: '2025-05-01T09:00:00.000Z',
        image: ""
    },
    {
        id: 2,
        name: 'Pizza',
        note: 'An Italian baked dish with various toppings.',
        createdAt: '2025-05-02T09:00:00.000Z',
        image: ""
    },
    {
        id: 3,
        name: 'Sushi',
        note: 'A Japanese dish made with rice and fresh seafood.',
        createdAt: '2025-05-03T09:00:00.000Z',
        image: ""
    },
    {
        id: 4,
        name: 'Burger',
        note: 'An American sandwich with meat, cheese, and veggies.',
        createdAt: '2025-05-04T09:00:00.000Z',
        image: ""
    },
    {
        id: 5,
        name: 'Salad',
        note: 'A healthy mix of vegetables, great for diets.',
        createdAt: '2025-05-05T09:00:00.000Z',
        image: ""
    }
];
export default AllCategories