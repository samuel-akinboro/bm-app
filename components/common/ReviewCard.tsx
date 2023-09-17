import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Sizes from '../../constants/Sizes'
import Colors from '../../constants/Colors'
import { StarIcon } from '../../constants/Icons'

const ReviewCard = () => {
  const rating = 5;

  return (
    <View style={styles.container}>
      <Image 
        style={styles.avatar}
        source={require('../../assets/images/user.png')} 
      />
      <View style={styles.desc}>
        <View style={styles.top}>
          <Text 
            numberOfLines={1}
            style={styles.name}
          >Nolan Carder</Text>
          <Text style={styles.day}>Today</Text>
        </View>
        <View style={styles.ratingStars}>
          {
            Array(Math.floor(rating))
              .fill('')
              .map((_, i) => (
                <Image key={i} source={StarIcon} style={styles.star} />
              ))
          }
          {
            Array(Math.ceil(5 - rating))
              .fill('')
              .map((_, i) => (
                <Image key={i} source={StarIcon} style={[styles.star, {tintColor: Colors.light.inactiveText}]} />
              ))
          }
        </View>
        <Text style={styles.description}>Perfect for keeping your feet dry and warm in damp conditions.</Text>
      </View>
    </View>
  )
}

export default ReviewCard

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 15
  },
  avatar: {
    width: Sizes.width * 0.12,
    height: Sizes.width * 0.12,
    borderRadius: Sizes.width * 0.12
  },
  name: {
    fontFamily: 'bold',
    color: Colors.light.text
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20
  },
  desc: {
    flex: 1,
    paddingTop: 5
  },
  day: {
    fontSize: 12,
    color: Colors.light.inactiveText,
    fontFamily: 'regular'
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 10
  },
  star: {
    width: 12,
    height: 12,
    objectFit: 'contain'
  },
  description: {
    fontSize: 12,
    marginTop: 10,
    fontFamily: 'regular',
    lineHeight: 22,
    color: Colors.light.text
  }
})