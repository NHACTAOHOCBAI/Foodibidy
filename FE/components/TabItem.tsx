import SVG from '@/components/SvgImage'
import TextDefault from '@/components/TextDefault'
import { StyleSheet, Text, View } from 'react-native'
interface TabItemProps {
    url?: string
    title: string
    focus: boolean
}

const TabItem = ({ url, title, focus }: TabItemProps) => {
    return (
        <View className='mt-3 w-[100px] items-center justify-center'>
            {url && <SVG
                color={focus ? "#FF7622" : "#A5A7B9"}
                url={url} />}
            <Text className='' style={{
                color: focus ? "#FF7622" : "#A5A7B9",
                fontWeight: focus ? "bold" : "regular"
            }}>{title}</Text>
        </View>
    )
}

export default TabItem

const styles = StyleSheet.create({})