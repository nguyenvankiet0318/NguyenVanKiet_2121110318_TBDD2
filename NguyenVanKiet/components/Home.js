import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();
    const route = useRoute(); // Lấy đối tượng route
    const handleProductPress = (product) => {
        navigation.navigate('SingleProduct', { product });
    };
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    useEffect(() => {
        getAllProduct();
    }, []);
    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                const { product } = route.params || {}; // Lấy thông tin sản phẩm từ route params

                if (product) {
                    // Thêm sản phẩm vào trạng thái state cartItems
                    const existingItem = cartItems.find((item) => item.id === product.id);
                    if (existingItem) {
                        setCartItems((prevCartItems) =>
                            prevCartItems.map((item) =>
                                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                            )
                        );
                    } else {
                        setCartItems((prevCartItems) => [...prevCartItems, { ...product, quantity: 1 }]);
                    }
                }
            });

            return unsubscribe;
        }, [navigation, route.params, cartItems])
    );
    useEffect(() => {
        // alert('Cart items have been updated: ');
    }, [cartItems]);
    const handleCategoryPress = (category) => {
        navigation.navigate('Category', { category });
    };
    const getAllProduct = () => {
        axios
            .get('https://fakestoreapi.com/products')
            .then(function (response) {
                const filteredProducts = response.data.filter((product) =>
                    product.title.toLowerCase().includes(searchInput.toLowerCase())
                );
                setProducts(filteredProducts);
            })
            .catch(function (error) {
                alert(error.message);
            })
            .finally(function () {
                // alert('Finally called');
            });
    };
    const handleSearchInputChange = (text) => {
        setSearchInput(text);
    };
    const handleAddToCartPress = (product) => {
        const existingItem = cartItems.find((item) => item.id === product.id);
        if (existingItem) {
            // Nếu mặt hàng đã tồn tại trong giỏ hàng, tăng số lượng lên 1
            setCartItems((prevCartItems) =>
                prevCartItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
        } else {
            // Nếu mặt hàng không tồn tại trong giỏ hàng, thêm nó với số lượng là 1
            setCartItems((prevCartItems) => [...prevCartItems, { ...product, quantity: 1 }]);
        }
        // alert('Sản phẩm đã được thêm vào giỏ hàng');
    };
    const handleRemoveFromCart = (productId) => {
        setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== productId));
        alert('Sản phẩm đã được xóa khỏi giỏ hàng');
    };
    const handleCartPress = () => {
        navigation.navigate('Cart', {
            cartItems,
            onRemoveFromCart: handleRemoveFromCart, // Pass the callback function to the Cart component
        });
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sản phẩm</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    value={searchInput}
                    onChangeText={handleSearchInputChange}
                />
                <TouchableOpacity style={styles.searchButton} onPress={getAllProduct}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.categoryContainer}>
            <ScrollView horizontal>
                <TouchableOpacity style={styles.categoryButton1} onPress={() => handleCategoryPress("men's clothing")}>
                <Text style={styles.buttonText}>Men's Clothing</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton2} onPress={() => handleCategoryPress("jewelery")}>
                <Text style={styles.buttonText}>Jewelry</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton3} onPress={() => handleCategoryPress("electronics")}>
                <Text style={styles.buttonText}>Electronics</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton4} onPress={() => handleCategoryPress("women's clothing")}>
                <Text style={styles.buttonText}>Women's Clothing</Text>
            </TouchableOpacity>
            </ScrollView>
            </View>
            <ScrollView contentContainerStyle={styles.productContainer}>
                {products.map((product) => (
                    <TouchableOpacity
                        style={styles.productItem}
                        key={product.id}
                        onPress={() => handleProductPress(product)}
                    >
                        <Image style={styles.productImage} source={{ uri: product.image }} />
                        <View style={styles.productDetails}>
                            <Text style={styles.productName}>{product.title}</Text>
                            <Text style={styles.productPrice}>Price: ${product.price.toFixed(2)}</Text>
                            <View style={styles.ratingContainer}>
                                <Text style={styles.ratingText}>Rating: </Text>
                                <FontAwesome name="star" style={styles.starIcon} />
                                <Text style={styles.ratingValue}>{product.rating.rate.toFixed(1)}</Text>
                                <Text style={styles.ratingCount}>({product.rating.count} reviews)</Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.detailsButton}
                                    onPress={() => handleProductPress(product)}
                                >
                                    <Text style={styles.buttonText}>Chi tiết</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.cartButton}
                                    onPress={() => handleAddToCartPress(product)}
                                >
                                    <Text style={styles.buttonText}>Add Cart</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.allcart} onPress={handleCartPress}>
                <Text style={styles.buttonCartText}>Giỏ hàng</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        width: '100%',
        borderRadius: 2,
        elevation: 2,
        backgroundColor: '#fff',
    },
    productContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    productItem: {
        width: '48%',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
    },
    productImage: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    productDetails: {
        padding: 8,
    },
    productName: {
        color: 'black',
        textAlign: 'center',
        marginBottom: 4,
        fontSize: 16,
        fontWeight: 'bold',
    },
    productPrice: {
        color: 'black',
        textAlign: 'center',
        marginBottom: 4,
        fontSize: 14,
    },
    ratingContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginBottom: 2,

    },
    ratingText: {
        color: 'black',
    },
    starIcon: {
        color: 'gold',
        fontSize: 16,
        marginRight: 2,
    },
    ratingValue: {
        color: 'black',
        marginRight: 2,
    },
    ratingCount: {
        color: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    detailsButton: {
        flex: 1,
        marginRight: 4,
        backgroundColor: 'purple',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
    },
    cartButton: {
        flex: 1,
        marginLeft: 4,
        backgroundColor: 'orange',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
    },
    allcart: {
        height: 30,
        backgroundColor: 'violet',
        borderRadius: 4,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonCartText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        paddingHorizontal: 10,
    },
    searchButton: {
        backgroundColor: 'pink',
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginLeft: 10,
        borderRadius: 4,
    },
    searchButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    categoryContainer: {
        flexDirection: 'row',
        marginBottom: 10,    
    },
    categoryButton1: {
        paddingHorizontal: 12,
        paddingVertical: 15,
        marginLeft: 10,
        borderRadius: 4,
        backgroundColor: "black"
    },
    categoryButton2: {
        paddingHorizontal: 12,
        paddingVertical: 15,
        marginLeft: 10,
        borderRadius: 4,
        backgroundColor: "red"
    },
    categoryButton3: {
        paddingHorizontal: 12,
        paddingVertical: 15,
        marginLeft: 10,
        borderRadius: 4,
        backgroundColor: "blue"
    },
    categoryButton4: {
        paddingHorizontal: 12,
        paddingVertical: 15,
        marginLeft: 10,
        borderRadius: 4,
        backgroundColor: "green"
    },
});