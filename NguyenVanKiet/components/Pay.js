import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function Payment({ route }) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const handleClearCart = route.params.onClearCart;
  const handlePayment = () => {
    handleClearCart(); // Gọi hàm handleClearCart để xóa sạch giỏ hàng
    Alert.alert('Thanh toán thành công', 'Cảm ơn bạn đã mua hàng!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thanh Toán</Text>
      <TextInput
        style={styles.input}
        placeholder="Mã Thẻ Ngân Hàng"
        value={cardNumber}
        onChangeText={setCardNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Số Tài Khoảng"
        value={cardHolder}
        onChangeText={setCardHolder}
      />
      <TouchableOpacity style={styles.paymentButton} onPress={handlePayment} >
        <Text style={styles.paymentButtonText}>Thanh toán</Text>
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
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  paymentButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    borderRadius: 4,
  },
  paymentButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});