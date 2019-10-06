import React, {useEffect, useState} from 'react';
import {
    SafeAreaView, 
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    TextInput,
    AsyncStorage,
    Alert
} from 'react-native';
import api from '../services/api';

export default function Book({navigation}) {
    const id = navigation.getParam('id');
    const [date,setDate] = useState('01/10/2000');

    async function handleSubmit() {
        const userid = await AsyncStorage.getItem('user');
        const response = await api.post(`/spots/${id}/bookings`, {date}, { headers: {userid}});

        Alert.alert('Solicitacao enviada');

        navigation.navigate('List');
    }
    function handleCancelSubmit() {
        navigation.navigate('List');
    }
    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.label}>Data de interesse*</Text>
            <TextInput
                style={styles.input}
                placeholder="Qual data você quer?"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={text => setDate(text)}
            />
            <TouchableOpacity style={styles.button}
                onPress={handleSubmit}
                >
                <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button,styles.cancelButton]}
                onPress={handleCancelSubmit}
                >
                <Text style={styles.buttonText}>Cancelar reserva</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 30
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 30
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    button : {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    cancelButton: {
        backgroundColor: '#ccc',
        marginTop: 10
    }
});