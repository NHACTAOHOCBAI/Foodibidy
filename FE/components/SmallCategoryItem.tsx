import { Image, Pressable, Text, View } from 'react-native'
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
interface SmallCategoryItemProps {
    id: number,
    name: string;
    image?: string;
}
const SmallCategoryItem = ({ name, image, id }: SmallCategoryItemProps) => {
    const router = useRouter();
    const onPress = () => {
        if (id === 0) {
            router.push('/categories')
        }
        else
            router.push('/categories/[id]')
    }
    return (
        <Pressable
            onPress={onPress}
        >
            {({ pressed }) => (
                <MotiView
                    className="flex-row items-center rounded-full px-[8px] py-[8px] gap-[12px] min-w-[104px]"
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
                        source={image ? { uri: image } : undefined}
                        className='w-[45px] h-[45px] rounded-full bg-accent'
                    />
                    <Text className='font-bold'>{name}</Text>
                </MotiView>
            )}
        </Pressable>

    )
}

export default SmallCategoryItem