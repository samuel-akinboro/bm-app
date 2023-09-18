import { StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, FlatList } from 'react-native';
import { Text, View } from '../../components/Themed';
import Sizes from '../../constants/Sizes';
import Colors from '../../constants/Colors';
import CartItem from '../../components/cart/CartItem';

export default function CartScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <FlatList
        data={['', '', '']}
        style={styles.flatlist}
        contentContainerStyle={{gap: 30}}
        renderItem={({item, index}) => (
          <CartItem key={index} />
        )}
      />
      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <Text style={styles.footerPriceTag}>Grand Total</Text>
          <Text style={styles.footerPrice}>$235.00</Text>
        </View>
        <TouchableOpacity style={styles.footerBtn}>
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
