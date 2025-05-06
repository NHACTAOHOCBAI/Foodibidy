import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { View, Text, Pressable, Image } from 'react-native'
interface SuggesteItemProps {
    type: "recentKeywords" | "categories"
    recentKeywords?: string
    categories?: {
        id: number,
        name: string,
    },
}
const SuggestedItem = ({ categories, recentKeywords, type }: SuggesteItemProps) => {
    // const router = useRouter();
    // const onPress = () => {
    //     if (categories.id === 0) {
    //         router.push('/categories')
    //     }
    //     else
    //         router.push('/categories/[id]')
    // }
    return (
        <Pressable
        // onPress={onPress}
        >
            {({ pressed }) => (
                <MotiView
                    className="flex-row items-center rounded-full px-[8px] h-[46px] min-w-[60px] justify-center max-w-[130px]"
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
                    {type === 'categories' && <Text numberOfLines={1} className='font-bold'>{categories?.name}</Text>}
                    {type === 'recentKeywords' && <Text numberOfLines={1} className='font-bold'>{recentKeywords}</Text>}
                </MotiView>
            )}
        </Pressable>

    )
}

export default SuggestedItem;