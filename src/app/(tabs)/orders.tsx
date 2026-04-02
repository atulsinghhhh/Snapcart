import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OrdersScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Orders</Text>
            <Text>Order history will appear here.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f6f6f4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    }
});
