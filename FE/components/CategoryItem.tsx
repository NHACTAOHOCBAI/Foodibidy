import { Image, Pressable, Text } from 'react-native'
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
interface Props {
    category: Category
}
const CategoryItem = ({ category }: Props) => {
    const router = useRouter();
    const onPress = () => router.push({
        pathname: '/categories/detail_category',
        params: { data: JSON.stringify(category) },
    })
    return (
        <Pressable onPress={onPress}>
            {({ pressed }) => (
                <MotiView
                    className="flex-row items-center rounded-full px-[8px] py-[8px] gap-[12px] shadow-md"
                    animate={{
                        backgroundColor: pressed ? '#FFA57C' : '#FFFFFF',
                        scale: pressed ? 0.85 : 1,
                    }}
                    transition={{
                        type: 'timing',
                        duration: 100,
                    }}
                >
                    <Image
                        source={category.image ? { uri: category.image } : undefined}
                        className='w-[45px] h-[45px] rounded-full bg-accent'
                    />
                    <Text
                        numberOfLines={1}
                        className='font-bold min-w-[34px] max-w-[65px]'>{category.name}</Text>
                </MotiView>
            )}
        </Pressable>

    )
}

export default CategoryItem