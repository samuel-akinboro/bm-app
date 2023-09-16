import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { View, Text } from '../Themed'
import React from 'react'
import Sizes from '../../constants/Sizes'
import Colors from '../../constants/Colors'

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover</Text>
      <TouchableOpacity>
        <Image style={styles.cartIcon} source={require('../../assets/images/cart.png')} />
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
    paddingHorizontal: Sizes.padding,
  },
  title: {
    fontFamily: 'bold',
    fontSize: 30,
    color: Colors.light.text
  },
  cartIcon: {
    height: 24,
    width: 24
  }
})