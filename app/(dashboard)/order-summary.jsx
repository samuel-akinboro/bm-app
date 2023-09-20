import { StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Text, View } from '../../components/Themed';
import Sizes from '../../constants/Sizes';
import { chevronRightIcon, tickCircleIcon } from '../../constants/Icons';
import Colors from '../../constants/Colors';
import { Link } from 'expo-router';
import { useSelector } from 'react-redux';
import { totalAmount } from '../../providers/cart';
import CurrencyFormatter from '../../utility/currencyFormatter';
import { router } from 'expo-router';
import { useState } from 'react';
import Modal from "react-native-modal";

export default function OrderSummaryScreen() {
  const SHIPPING_FEE = 20;
  const cartItems = useSelector(state => state.cart.cart);
  const totalPrice = useSelector(totalAmount);
  const [showSuccessModal, setShowSuccessModal] = useState(false)

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
            {cartItems.map((item, i) => (
              <View style={[styles.subSection, {marginTop: 0}]} key={i}>
                <Text style={styles.subSectionTitle}>{item.name}</Text>
                <View style={styles.subSectionRow}>
                  <Text style={styles.itemDetail}>{item.brand} . {item.color} . {item.size} . Qty {item.quantity}</Text>
                  <Text style={styles.itemPrice}>{CurrencyFormatter(item.price * item.quantity)}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* payment detail */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Detail</Text>
          <View style={styles.subSectionRow}>
            <Text style={styles.itemDetail}>Sub Total</Text>
            <Text style={[styles.itemPrice, {fontSize: 16}]}>{CurrencyFormatter(totalPrice)}</Text>
          </View>
          <View style={[styles.subSectionRow, {marginTop: 20}]}>
            <Text style={styles.itemDetail}>Shipping</Text>
            <Text style={[styles.itemPrice, {fontSize: 16}]}>{CurrencyFormatter(SHIPPING_FEE)}</Text>
          </View>
          <View style={{
            height: 1,
            backgroundColor: '#F3F3F3',
            marginVertical: 15
          }} />
          <View style={styles.subSectionRow}>
            <Text style={styles.itemDetail}>Total Order</Text>
            <Text style={[styles.itemPrice, {fontSize: 18}]}>{CurrencyFormatter(totalPrice + SHIPPING_FEE)}</Text>
          </View>
        </View>

        {/* spacing */}
        <View style={{height: 50}} />
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <Text style={styles.footerPriceTag}>Grand Total</Text>
          <Text style={styles.footerPrice}>{CurrencyFormatter(totalPrice + SHIPPING_FEE)}</Text>
        </View>
        <TouchableOpacity style={styles.footerBtn} onPress={() => setShowSuccessModal(true)}>
          <Text style={styles.footerBtnText}>PAYMENT</Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={showSuccessModal}
        style={{
          justifyContent: 'flex-end',
          margin: 0
        }}
        swipeDirection="down"
        avoidKeyboard={true}
        onBackButtonPress={() => setShowSuccessModal(false)}
        onDismiss={() => setShowSuccessModal(false)}
        onBackdropPress={() => setShowSuccessModal(false)}
        onSwipeComplete={() => setShowSuccessModal(false)}
      > 
        <View style={styles.modalContainer}>
          <View style={styles.modalHandle} />
          <Image 
            source={tickCircleIcon} 
            style={{
              height: 100,
              width: 100,
              objectFit: 'contain',
              alignSelf: 'center',
              marginTop: 25,
              marginBottom: 10,
            }}
          />
          <Text 
            style={[
              styles.modalTopText,
              {
                textAlign: 'center',
                fontFamily: 'semibold',
                fontSize: 24,
                marginBottom: 20
              }
            ]}
          >Order Created !</Text>
          
          {/* footer */}
          <View style={[styles.modalFooter, {gap: 15}]}>

            <TouchableOpacity 
              onPress={() => {
                setShowSuccessModal(false);
                router.push('/')
              }}
              style={[styles.footerBtn, {flex: 1}]}
            >
              <Text style={styles.footerBtnText}>BACK TO EXPLORE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: Sizes.padding,
    borderTopRightRadius: Sizes.radius,
    borderTopLeftRadius: Sizes.radius
  },
  modalFooter: {
    height: 57,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginTop: 5
  },
  modalHandle: {
    height: 4,
    width: 44,
    backgroundColor: '#E7E7E7',
    borderRadius: 10,
    alignSelf: 'center'
  },
  modalTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25
  },
  modalTopText: {
    fontSize: 20,
    fontFamily: 'bold',
    color: Colors.light.text
  },
  modalTopIcon: {
    height: 18,
    width: 18,
    objectFit: 'contain'
  },
  quantityTitle: {
    fontFamily: 'bold',
    color: Colors.light.text
  },
  quantityBox: {
    marginVertical: 20,
    borderBottomWidth: 1,
    borderColor: Colors.light.text,
    paddingBottom: 10
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  quantityInput: {
    flex: 1,
    paddingVertical: 10,
    paddingTop: 15
  },
  quantityBtns: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center'
  },
  quantityBtn: {
    objectFit: 'contain',
    height: 24, 
    width: 24
  }
});
