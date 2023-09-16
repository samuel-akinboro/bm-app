import { StyleSheet } from 'react-native'
import React from 'react'
import { Text, View } from '../Themed'
import Sizes from '../../constants/Sizes'

const ProductCard = () => {
  return (
    <View style={styles.container}>
      <Text>ProductCard</Text>
    </View>
  )
}

export default ProductCard

const styles = StyleSheet.create({
  container: {
    width: ((Sizes.width - (Sizes.padding * 2)) - 20) / 2,
    backgroundColor: 'red',
    marginBottom: 30
  }
})