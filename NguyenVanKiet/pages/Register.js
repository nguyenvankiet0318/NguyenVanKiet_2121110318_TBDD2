// RegisterScreen.js
import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { AuthContext } from './AuthContext';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { register } = useContext(AuthContext);

  const handleRegister = () => {
    // Gọi hàm register từ AuthContext để đăng ký người dùng
    register(email, password);
    alert('đăng ký thành công');
    navigation.navigate('Login');

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
      <TextInput
        placeholder="Xác nhận mật khẩu"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Đăng ký" onPress={handleRegister} />
    </View>
  );
};

export default Register;