import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '@/context/AuthProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const { user, signOut } = useAuth();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Profile</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{user?.name || "Customer"}</Text>
                
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{user?.email || "No Email"}</Text>

                <Text style={styles.label}>Role:</Text>
                <Text style={styles.value}>{user?.role || "customer"}</Text>
            </View>

            <TouchableOpacity style={styles.logoutBtn} onPress={signOut}>
                <Text style={styles.logoutBtnText}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f4',
        padding: 24,
    },
    header: {
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 16,
        marginBottom: 32,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    label: {
        fontSize: 12,
        color: '#888',
        textTransform: 'uppercase',
        marginBottom: 4,
        marginTop: 16,
    },
    value: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    logoutBtn: {
        backgroundColor: '#a63300',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    logoutBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
