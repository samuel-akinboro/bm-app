import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { addCircleIcon, minusCircleIcon, trashIcon } from '../../constants/Icons';
import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const CartItem = () => {
  const renderRightActions = () => (
    <TouchableOpacity style={styles.delete} onPress={() => {}}>
      <Image source={trashIcon} style={styles.deleteIcon} />
    </TouchableOpacity>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.container}>
        <View style={styles.productImageBackground}>
          <Image
            style={styles.productImage}
            source={require('../../assets/images/shoe.png')}
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.boxTitle} numberOfLines={1}>Jordan 1 Retro High Tie Dye</Text>
          <Text style={styles.boxDesc}>Adidas . Grey . 42</Text>
          <View style={styles.boxRow}>
            <Text style={styles.price}>$250.00</Text>
            <View style={styles.cartBtns}>
              <TouchableOpacity>
                <Image
                  source={minusCircleIcon}
                  style={styles.cartBtn}
                />
              </TouchableOpacity>
              <Text style={styles.itemCount}>1</Text>
              <TouchableOpacity>
                <Image
                  source={addCircleIcon}
                  style={styles.cartBtn}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: Sizes.padding
  },
  delete: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.red,
    width: Sizes.width * 0.225,
    borderTopLeftRadius: Sizes.radius,
    borderBottomLeftRadius: Sizes.radius
  },
  deleteIcon: {
    width: 24,
    height: 24,
    objectFit: 'contain'
  },
  productImageBackground: {
    width: Sizes.width * 0.225,
    height: Sizes.width * 0.225,
    backgroundColor: Colors.light.gray,
    borderRadius: Sizes.radius,
    justifyContent: 'center',
    alignItems: 'center'
  },
  productImage: {
    height: '80%',
    width: '80%',
    objectFit: 'contain'
  },
  box: {
    gap: 12,
    paddingTop: 5,
    flex: 1
  },
  price: {
    fontFamily: 'bold',
    color: Colors.light.text
  },
  boxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  boxTitle: {
    fontSize: 16,
    color: Colors.light.text,
    fontFamily: 'semibold'
  },
  boxDesc: {
    color: Colors.light.gray2,
    fontFamily: 'regular',
    fontSize: 12
  },
  cartBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  cartBtn: {
    height: 24,
    width: 24,
    objectFit: 'contain'
  },
  itemCount: {
    fontFamily: 'bold',
    color: Colors.light.text
  }
})