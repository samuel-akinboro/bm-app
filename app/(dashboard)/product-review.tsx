import { FlatList, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, Animated, StatusBar } from 'react-native';
import { Text, View } from '../../components/Themed';
import Header from '../../components/home/Header';
import Sizes from '../../constants/Sizes';
import Categories from '../../components/home/Categories';
import ProductCard from '../../components/home/ProductCard';
import { StarIcon, checkIcon, filterWhiteIcon } from '../../constants/Icons';
import Colors from '../../constants/Colors';
import Gallery from '../../components/common/Gallery';
import { useRef, useState } from 'react';
import ReviewCard from '../../components/common/ReviewCard';

const demoDetails = {
  ratings: 3.5,
  reviews: {
    count: 1023
  },
  availableSizes: ["39", "39.5", "40", "40.5", "41"],
  availableColors: ["#fff", "#101010", "#638b8b", "#2952cc"]
}

export default function ProductReviewScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [selectedSize, setSelectedSize] = useState(demoDetails.availableSizes[0])
  const [selectedColor, setSelectedColor] = useState(demoDetails.availableColors[0]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: Sizes.padding
  },
  flatlist: {
    borderRadius: Sizes.radius
  },
  footer: {
    height: 90,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity:  0.05,
    shadowRadius: 1.54,
    elevation: -2,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Sizes.padding
  },
  footerLeft: {
    gap: 10
  },
  footerPriceTag: {
    fontSize: 12,
    fontFamily: 'regular',
    color: Colors.light.inactiveText
  },
  footerPrice: {
    fontSize: 20,
    fontFamily: 'bold',
    color: Colors.light.text
  },
  footerBtn: {
    backgroundColor: Colors.light.text,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderRadius: 100
  },
  footerBtnText: {
    color: '#fff',
    fontFamily: 'bold'
  },
  widgetBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: Sizes.padding,
    left: Sizes.padding,
    right: Sizes.padding,
    flex: 1,
  },
  dotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sizes.width * 0.02
  },
  dot: {
    width: Sizes.width * 0.02,
    height: Sizes.width * 0.02,
    backgroundColor: Colors.light.text,
    borderRadius: Sizes.width * 0.02
  },
  widget: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: Sizes.width * 0.02,
    borderRadius: Sizes.radius,
    gap: Sizes.width * 0.03,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity:  0.12,
    shadowRadius: 2.54,
    elevation: 3
  },
  pickColor: {
    width: Sizes.width * 0.06,
    height: Sizes.width * 0.06,
    backgroundColor: Colors.light.text,
    borderRadius: Sizes.width * 0.06,
    borderWidth: 0.5,
    borderColor: Colors.light.text,
    justifyContent: 'center',
    alignItems: 'center'
  },
  carousel: {
    paddingTop: Sizes.padding / 2
  },
  section: {
    marginTop: Sizes.padding
  },
  info: {
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
  name: {
    fontSize: 20,
    fontFamily: 'bold'
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'semibold',
    marginBottom: 10
  },
  availableSizes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  sizeBtn: {
    width: Sizes.width * 0.11,
    height: Sizes.width * 0.11,
    borderRadius: Sizes.width * 0.11,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7E7E7'
  },
  sizeBtnText: {
    fontFamily: 'bold',
  },
  description: {
    color: '#6F6F6F',
    fontFamily: 'regular',
    lineHeight: 24
  },
  reviewsContainer: {
    gap: 20
  },
  seeReviewsBtn: {
    marginTop: 35,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#E7E7E7',
    borderRadius: 100
  },
  seeReviewsBtnText: {
    fontFamily: 'bold',
    textAlign: 'center'
  }
});
