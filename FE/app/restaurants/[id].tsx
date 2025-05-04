import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Restaurant = () => {
    const { id } = useLocalSearchParams();
    return (
        <View>
            <Text>Restaurant:{id}</Text>
        </View>
    )
}

export default Restaurant

const styles = StyleSheet.create({})