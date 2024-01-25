import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const ProductDetail = () => {
  const route = useRoute();
  const { product } = route.params;
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCartPress = () => {
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
    alert('Sản phẩm đã được thêm vào giỏ hàng');
    navigation.navigate('Home', { product }); // Điều hướng về trang "Home" và truyền thông tin sản phẩm qua route params
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>Giá: ${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>

      <TouchableOpacity
        style={styles.buyButton}
        onPress={handleAddToCartPress}
      >
        <Text style={styles.buyButtonText}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: 'white',
  },
  price: {
    fontSize: 20,
    marginBottom: 12,
    color: 'green',
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    marginBottom: 12,
    color: 'white',
  },
  buyButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 16,
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default ProductDetail;