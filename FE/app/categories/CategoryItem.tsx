import { useRouter } from "expo-router";
import { MotiView, View } from "moti";
import { Image, Pressable, Text } from "react-native";

const CategoryItem = ({ category }: { category: Category }) => {
    const router = useRouter();
    return (
        <Pressable onPress={() => router.push({
            pathname: '/categories/detail_category',
            params: {
                id: category.id,
                name: category.name,
                description: category.description,
                image: category.image,
                createdAt: category.createdAt
            },
        })}>
            {({ pressed }) => (
                <MotiView
                    className='relative w-[160px]'
                    animate={{ scale: pressed ? 0.95 : 1 }}
                    transition={{ type: 'timing', duration: 100 }}
                >
                    <View className="w-full p-[8px] rounded-[12px] bg-white h-[200px] drop-shadow-sm">
                        <Image
                            source={category.image ? { uri: category.image } : undefined}
                            className='w-full h-[84px] rounded-[12px] bg-accent'
                        />
                        <Text numberOfLines={1} className='font-bold mt-[15px] text-[15px] '>
                            {category.name}
                        </Text>
                        <Text numberOfLines={3} className='mt-[5px] text-[13px]'>
                            {category.description}
                        </Text>
                    </View>
                </MotiView>
            )}
        </Pressable>
    );
};
export default CategoryItem;