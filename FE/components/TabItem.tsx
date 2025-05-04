import SVG from '@/components/SvgImage'
import TextDefault from '@/components/TextDefault'
import { StyleSheet, Text, View } from 'react-native'
interface TabItemProps {
    url: string
    color: string
    title: string
}

const TabItem = ({ url, color, title }: TabItemProps) => {
    return (
        <View className='mt-3 w-[100px] items-center justify-center'>
            <SVG
                color={color}
                url={url} />
            <TextDefault className='' style={{ color: color }}>{title}</TextDefault>
        </View>
    )
}

export default TabItem

const styles = StyleSheet.create({})