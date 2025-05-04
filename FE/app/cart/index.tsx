import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Cart = () => {
    const { id } = useLocalSearchParams();
    return (
        <View>
            <Text>Cart</Text>
        </View>
    )
}

export default Cart

const styles = StyleSheet.create({})