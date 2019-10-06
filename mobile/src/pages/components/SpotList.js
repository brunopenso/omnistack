import React, { useState, useEffect} from 'react';
import {
    View, 
    Text, 
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native';
import {withNavigation} from 'react-navigation';

import api from '../../services/api';

function SpotList({tech, navigation}) {
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function loadSpots() {
            const response = await api.get('/spots',{
                params: {tech}
            });

            setSpots(response.data);
        }

        loadSpots();
    }, []);

    function handleNavigation(id) {
        navigation.navigate('Book', { id } );
    }
    function getUrl(text) {
        return text;
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>

            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image source={{ uri: getUrl(item.thumbnail_url)}} style={styles.thumbnail}/>
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `R$${item.price}/dia`: 'Gratuito'}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => handleNavigation(item._id)}>
                            <Text style={styles.buttonText}>Solicitar reserva</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },
    title: {
        fontSize:20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    bold: {
        fontWeight: 'bold'
    },
    list: {
        paddingHorizontal: 20
    },
    listItem: {
        marginRight: 15
    },
    company: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2
    },
    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5
    },
    button : {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15
    }
});
//use withNavigation becaause it is not a page declared on the routes.js
export default withNavigation(SpotList);