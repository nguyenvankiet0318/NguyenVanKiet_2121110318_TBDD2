import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      <Image source={require('../images/logo.png')} style={styles.logo} />
      <Text style={[styles.text, styles.largeText]}>Shop Công Thương</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    flexDirection: 'row',
    paddingBottom: 2
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 7,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
  },
  largeText: {
    fontSize: 18,
  },
});