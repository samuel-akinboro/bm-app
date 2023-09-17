import { FlatList, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, Animated, StatusBar } from 'react-native';
import { Text, View } from '../../components/Themed';
import Sizes from '../../constants/Sizes';
import { StarIcon, checkIcon, chevronRightIcon, filterWhiteIcon } from '../../constants/Icons';
import Colors from '../../constants/Colors';
import Gallery from '../../components/common/Gallery';
import { useRef, useState } from 'react';
import ReviewCard from '../../components/common/ReviewCard';
import { Link } from 'expo-router';

const demoDetails = {
  ratings: 3.5,
  reviews: {
    count: 1023
  },
  availableSizes: ["39", "39.5", "40", "40.5", "41"],
  availableColors: ["#fff", "#101010", "#638b8b", "#2952cc"]
}

export default function OrderSummaryScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [selectedSize, setSelectedSize] = useState(demoDetails.availableSizes[0])
  const [selectedColor, setSelectedColor] = useState(demoDetails.availableColors[0]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <ScrollView style={styles.scrollView}>
        {/* information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Information</Text>
          <Link href='/order-summary' asChild>
            <TouchableOpacity style={styles.link}>
              <View>
                <Text style={styles.linkTitle}>Payment Method</Text>
                <Text style={styles.linkText}>Credit Card</Text>
              </View>
              <Image 
                style={styles.linkIcon}
                source={chevronRightIcon} 
              />
            </TouchableOpacity>
          </Link>
          <View style={{
            height: 1,
            backgroundColor: '#F3F3F3',
            marginVertical: 15
          }} />
          <Link href='/order-summary' asChild>
            <TouchableOpacity style={styles.link}>
              <View>
                <Text style={styles.linkTitle}>Location</Text>
                <Text style={styles.linkText}>Semarang, Indonesia</Text>
              </View>
              <Image 
                style={styles.linkIcon}
                source={chevronRightIcon} 
              />
            </TouchableOpacity>
          </Link>
        </View>

        {/* Order detail */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Detail</Text>
          <View style={styles.orderList}>
            <View style={[styles.subSection, {marginTop: 0}]}>
              <Text style={styles.subSectionTitle}>Jordan 1 Retro High Tie Dye</Text>
              <View style={styles.subSectionRow}>
                <Text style={styles.itemDetail}>Nike . Red Grey . 40 . Qty 1</Text>
                <Text style={styles.itemPrice}>$235,00</Text>
              </View>
            </View>
            <View style={[styles.subSection, {marginTop: 0}]}>
              <Text style={styles.subSectionTitle}>Jordan 1 Retro High Tie Dye</Text>
              <View style={styles.subSectionRow}>
                <Text style={styles.itemDetail}>Nike . Red Grey . 40 . Qty 1</Text>
                <Text style={styles.itemPrice}>$235,00</Text>
              </View>
            </View>
            <View style={[styles.subSection, {marginTop: 0}]}>
              <Text style={styles.subSectionTitle}>Jordan 1 Retro High Tie Dye</Text>
              <View style={styles.subSectionRow}>
                <Text style={styles.itemDetail}>Nike . Red Grey . 40 . Qty 1</Text>
                <Text style={styles.itemPrice}>$235,00</Text>
              </View>
            </View>
          </View>
        </View>

        {/* spacing */}
        <View style={{height: 50}} />
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <Text style={styles.footerPriceTag}>Grand Total</Text>
          <Text style={styles.footerPrice}>$235.00</Text>
        </View>
        <TouchableOpacity style={styles.footerBtn}>
          <Text style={styles.footerBtnText}>PAYMENT</Text>
        </TouchableOpacity>
      </View>
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
  section: {
    marginTop: Sizes.padding * 2
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'semibold',
    marginBottom: 20
  },
  subSection: {
    marginTop: Sizes.padding
  },
  subSectionTitle: {
    fontSize: 16,
    fontFamily: 'semibold',
    marginBottom: 10
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  linkIcon: {
    height: 16,
    width: 16,
    objectFit: 'contain'
  },
  linkTitle: {
    color: Colors.light.text,
    fontFamily: 'bold',
    marginBottom: 10
  },
  linkText: {
    color: '#666666',
    fontFamily: 'regular'
  },
  subSectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemDetail: {
    color: '#666666',
    fontFamily: 'regular',
    textTransform: 'capitalize'
  },
  itemPrice: {
    color: Colors.light.text,
    fontFamily: 'bold'
  },
  orderList: {
    gap: 20
  }
});
