import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { addCircleIcon, minusCircleIcon, trashIcon } from '../../constants/Icons';
import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';
import CurrencyFormatter from '../../utility/currencyFormatter';
import { incrementDecrementItem, removeItem } from '../../providers/cart';
import { useDispatch } from 'react-redux';

const CartItem = ({item, index}) => {
  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch(removeItem({index}))
  }

  const renderRightActions = (_, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, Sizes.width * 0.225],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity onPress={deleteItem}>
        <Animated.View style={[
            styles.delete,
            { transform: [{ translateX: trans }], }
          ]}
        >
          <Image source={trashIcon} style={styles.deleteIcon} />
        </Animated.View>
      </TouchableOpacity>
    )
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.container}>
        <View style={styles.productImageBackground}>
          <Image
            style={styles.productImage}
            source={{uri: item.image}}
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.boxTitle} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.boxDesc}>{item.brand} . {item.color} . {item.size}</Text>
          <View style={styles.boxRow}>
            <Text style={styles.price}>{CurrencyFormatter(item.price)}</Text>
            <View style={styles.cartBtns}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(incrementDecrementItem({
                    index,
                    type: 'decrement'
                  }))
                }}
              >
                <Image
                  source={minusCircleIcon}
                  style={[styles.cartBtn, {
                    tintColor: item.quantity > 1 ? Colors.light.text : '#b7b7b7'
                  }]}
                />
              </TouchableOpacity>
              <Text style={styles.itemCount}>{item.quantity}</Text>
              <TouchableOpacity
                onPress={() => {
                  dispatch(incrementDecrementItem({
                    index,
                    type: 'increment'
                  }))
                }}
              >
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
    borderBottomLeftRadius: Sizes.radius,
    flex: 1
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