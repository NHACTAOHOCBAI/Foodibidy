import TextDefault from '@/components/TextDefault'
import { Link } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'


const index = () => {
  return (
    <View>
      <TextDefault >hello</TextDefault>
      <Link href={"/search"}>Go to Search</Link>
      <Link href={{
        pathname: "/restaurants/[id]",
        params: { id: 1 }
      }}>Go to restaurant 1</Link>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})