import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { View, Text } from './Themed'
import React from 'react'

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover</Text>
      <TouchableOpacity>
        <Image style={styles.cartIcon} source={require('../assets/images/cart.png')} />
      </TouchableOpacity>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'bold',
    fontSize: 30
  },
  cartIcon: {
    height: 24,
    width: 24
  }
})