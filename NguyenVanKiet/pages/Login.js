// LoginScreen.js
import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { AuthContext } from './AuthContext';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext);

  const handleLogin = () => {
     // Gọi hàm login từ AuthContext để xác thực thông tin đăng nhập
    const isLoggedIn = login(email, password);
    if (isLoggedIn==false) {
      Alert.alert('Lỗi', 'Sai email hoặc mật khẩu. Vui lòng thử lại.');
    }else{
      navigation.navigate('Home');
    }
  };

  const handleGoRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Đăng nhập" onPress={handleLogin} />
      <Text onPress={handleGoRegister}>chưa có tài khoảng? Đăng ký.</Text>
    </View>
  );
};

export default Login;