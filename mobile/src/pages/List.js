import React, {useState, useEffect} from 'react';
import {
    SafeAreaView, 
    AsyncStorage,
    Image,
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native';
import SpotList from './components/SpotList';
import socketio from 'socket.io-client';

import logo from '../../assets/logo.png';

export default function List() {
    const [techs, setTechs] = useState([]);
    
    useEffect(() => {
        AsyncStorage.getItem('user').then(userid => {
            const socket = socketio('http://192.168.15.10:3333', {
                query: { userid }
            });

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva foi ${booking.approved ? 'APROVADA': 'REJEITADA'} no dia ${booking.date}`);
            })
        });
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(itens => {
            const techsArray = itens.split(',').map(item => item.trim());
            setTechs(techsArray);
        })
    }, []);
    
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo}/>
            <ScrollView>
            {
                techs.map( tech => <SpotList key={tech} tech={tech}/>)
            }
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10
    }
});