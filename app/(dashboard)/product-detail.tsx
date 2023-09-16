import { FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, View } from '../../components/Themed';
import Header from '../../components/home/Header';
import Sizes from '../../constants/Sizes';
import Categories from '../../components/home/Categories';
import ProductCard from '../../components/home/ProductCard';
import { filterWhiteIcon } from '../../constants/Icons';
import Colors from '../../constants/Colors';

export default function ProductDetailScreen() {
  return (
    <View style={styles.container}>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  productList: {
    flex: 1,
    marginTop: 15,
    paddingHorizontal: Sizes.padding
  },
  filterBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.light.text,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    position: 'absolute',
    bottom: 35,
    alignSelf: 'center',
    borderRadius: 100
  },
  filterIcon: {
    width: 20,
    height: 20,
    objectFit: 'contain',
  },
  filterBtnText: {
    color: 'white',
    fontFamily: 'bold'
  }
});
