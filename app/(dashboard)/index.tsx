import { FlatList, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import Header from '../../components/home/Header';
import Sizes from '../../constants/Sizes';
import Categories from '../../components/home/Categories';
import ProductCard from '../../components/home/ProductCard';

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
        ListFooterComponent={<View style={{height: 40}} />}
      />
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
  }
});
