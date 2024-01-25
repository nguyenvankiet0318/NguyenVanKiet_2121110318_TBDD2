import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

const Category = ({ route, navigation }) => {
    const { category } = route.params;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getCategoryProducts();
    }, []);

    const getCategoryProducts = () => {
        axios
            .get('https://fakestoreapi.com/products')
            .then(function (response) {
                const filteredProducts = response.data.filter(
                    (product) => product.category.toLowerCase() === category.toLowerCase()
                );
                setProducts(filteredProducts);
            })
            .catch(function (error) {
                alert(error.message);
            });
    };

    const handleProductPress = (product) => {
        navigation.navigate('SingleProduct', { product });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleProductPress(item)}>
                        <View style={styles.productContainer}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.price}>{item.price}</Text>
                                <View style={styles.ratingContainer}>
                                <Text style={styles.ratingText}>Rating: </Text>
                                <FontAwesome name="star" style={styles.starIcon} />
                                <Text style={styles.ratingValue}>{item.rating.rate.toFixed(1)}</Text>
                                <Text style={styles.ratingCount}>({item.rating.count} reviews)</Text>
                            </View>
                            </View>
                        
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    productContainer: {
        marginBottom: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 16,
        flexDirection: 'row',
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    price: {
        fontSize: 14,
        color: '#888',
    },
});

export default Category;