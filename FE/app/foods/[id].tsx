import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const FoodDetail = () => {
    const { id } = useLocalSearchParams();
    return (
        <View>
            <Text>Food:{id}</Text>
        </View>
    )
}

export default FoodDetail

const styles = StyleSheet.create({})