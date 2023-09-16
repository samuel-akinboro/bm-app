import { FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, View } from '../../components/Themed';
import Header from '../../components/home/Header';
import Sizes from '../../constants/Sizes';
import Categories from '../../components/home/Categories';
import ProductCard from '../../components/home/ProductCard';
import { filterWhiteIcon } from '../../constants/Icons';
import Colors from '../../constants/Colors';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <Categories style={{marginTop: 15}} />
      <FlatList
        style={styles.productList}
        data={Array(10).fill('')}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={({item}) => <ProductCard />}
        ListFooterComponent={<View style={{height: 80}} />}
      />
      <TouchableOpacity style={styles.filterBtn}>
        <Image source={filterWhiteIcon} style={styles.filterIcon} />
        <Text style={styles.filterBtnText}>FILTER</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Sizes.statusbar,
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
