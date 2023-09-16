import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Text, View } from '../Themed'
import Sizes from '../../constants/Sizes'
import Colors from '../../constants/Colors'

const ProductCard = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View>
        <View style={styles.imageContainer}>
          <Image 
            style={styles.shoeImage}
            source={require('../../assets/images/shoe.png')}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ProductCard

const cardWidth = ((Sizes.width - (Sizes.padding * 2)) - 20) / 2;
const shoeImageHeight = cardWidth * 0.55

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    marginBottom: 30
  },
  imageContainer: {
    borderRadius:Sizes.radius,
    backgroundColor: Colors.light.gray,
    padding: 20,
    height: cardWidth,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  shoeImage: {
    height: shoeImageHeight,
    objectFit: 'contain',
    // width: shoeImageHeight,
    // backgroundColor: 'red',
  }
})