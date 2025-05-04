import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Category = () => {
    const { id } = useLocalSearchParams();
    return (
        <View>
            <Text>Category:{id}</Text>
        </View>
    )
}

export default Category

const styles = StyleSheet.create({})