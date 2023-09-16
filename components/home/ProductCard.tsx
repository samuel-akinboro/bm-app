import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Text, View } from '../Themed'
import Sizes from '../../constants/Sizes'
import Colors from '../../constants/Colors'
import { StarIcon, nikeIcon } from '../../constants/Icons'
import { Link } from 'expo-router'

const ProductCard = () => {
  return (
    <Link href='/product-detail' asChild>
      <TouchableOpacity style={styles.container}>
        <View>
          <View style={styles.imageContainer}>
            <Image 
              style={styles.brandIcon}
              source={nikeIcon}
            />
            <Image 
              style={styles.shoeImage}
              source={require('../../assets/images/shoe.png')}
            />
          </View>
          <View style={styles.description}>
            <Text 
              style={styles.name}
              ellipsizeMode='tail'
              numberOfLines={1}
            >
              Jordan 1 Retro High Tie Dye
            </Text>
            <View style={styles.ratingBox}>
              <Image source={StarIcon} style={styles.star} />
              <Text style={styles.rating}>4.5</Text>
              <Text style={styles.review}>(1045 Reviews)</Text>
            </View>
            <Text style={styles.price}>$235,00</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
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
  },
  brandIcon: {
    position: 'absolute',
    top: 10,
    width: 34,
    height: 34,
    objectFit: 'contain',
    left: 20
  },
  name: {
    fontFamily: 'regular',
    fontSize: 12,
  },
  description: {
    paddingTop: 10
  },
  ratingBox: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10
  },
  star: {
    width: 12,
    height: 12,
    objectFit: 'contain'
  },
  rating: {
    fontSize: 11,
    fontFamily: 'bold',
    color: Colors.light.text
  },
  review: {
    fontSize: 11,
    fontFamily: 'regular',
    color: Colors.light.inactiveText
  },
  price: {
    color: Colors.light.text,
    fontFamily: 'bold',
    marginTop: 10
  }
})