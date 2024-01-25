import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.container}>
      <Text style={styles.additionalText}>Bạn quên mật khẩu? Đăng ký?</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  additionalText: {
    color: 'white',
    marginTop: 5,
  },
});