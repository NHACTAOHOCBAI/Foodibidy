import { Image, Pressable, Text } from 'react-native'
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
interface Props {
    category: Category
}
interface Category {
    id: number;
    name: string;
    description: string;
    image: string;
    createdAt: string;
}
const CategoryItem = ({ category }: Props) => {
    const router = useRouter();
    const onPress = () => router.push({
        pathname: '/categories/[id]',
        params: {
            id: category.id,
            name: category.name,
            description: category.description,
            image: category.image,
            createdAt: category.createdAt
        },
    })
    return (
        <Pressable
            onPress={onPress}
        >
            {({ pressed }) => (
                <MotiView
                    className="flex-row items-center rounded-full px-[8px] py-[8px] gap-[12px] "
                    style={{
                        boxShadow: " 0 1px 4px 0 rgba(0, 0, 0, 0.1)"
                    }}
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