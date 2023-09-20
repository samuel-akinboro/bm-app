import { StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, FlatList } from 'react-native';
import { Text, View } from '../../components/Themed';
import Sizes from '../../constants/Sizes';
import Colors from '../../constants/Colors';
import CartItem from '../../components/cart/CartItem';
import { useSelector } from 'react-redux';
import { totalAmount } from '../../providers/cart';
import CurrencyFormatter from '../../utility/currencyFormatter';
import { router } from 'expo-router';

export default function CartScreen() {
  const cartItems = useSelector(state => state.cart.cart);
  const totalPrice = useSelector(totalAmount)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <FlatList
        data={cartItems}
        style={styles.flatlist}
        keyExtractor={(item, i) => `${item.id}-${i}`}
        contentContainerStyle={{gap: 30}}
        renderItem={({item, index}) => (
          <CartItem item={item} index={index} />
        )}
      />
      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <Text style={styles.footerPriceTag}>Grand Total</Text>
          <Text style={styles.footerPrice}>{CurrencyFormatter(totalPrice)}</Text>
        </View>
        <TouchableOpacity 
          style={styles.footerBtn}
          onPress={() => {
            router.push('/order-summary')
          }}
        >
          <Text style={styles.footerBtnText}>CHECKOUT</Text>
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
  flatlist: {
    flex: 1,
    paddingTop: Sizes.padding
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
});
