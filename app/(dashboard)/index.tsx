import { FlatList, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Text, View } from '../../components/Themed';
import Header from '../../components/home/Header';
import Sizes from '../../constants/Sizes';
import Categories from '../../components/common/Categories';
import ProductCard from '../../components/home/ProductCard';
import { filterWhiteIcon } from '../../constants/Icons';
import Colors from '../../constants/Colors';
import { Link } from 'expo-router';
import { database } from '../../firebase/firebase'
import { getDatabase, ref, orderByKey, limitToFirst, DataSnapshot, get, query } from 'firebase/database';
import { useEffect, useState } from 'react';

const INITIAL_BATCH_SIZE = 10;

export default function HomeScreen() {
  const [data, setData] = useState<any>([]);
  const [brand, setBrand] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const initialData:any = [];
        const dataRef = ref(database, '/');
        const snapshot = await get(
          query(dataRef, orderByKey(), limitToFirst(INITIAL_BATCH_SIZE))
        );

        snapshot.forEach((childSnapshot: DataSnapshot) => {
          initialData.push(childSnapshot.val());
        });
        
        setData(initialData.map((data, i) => ({firebaseId: i, ...data})));
        setLoading(false);
      } catch (error) {
        setLoading(false)
        console.error('Error fetching initial data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header />
      <Categories 
        data={['All', 'Nike', 'Jordan', 'Adidas', 'Reebok', 'Vans', 'Puma', '']}
        style={{marginTop: 15}} 
        selected={brand}
        setSelected={setBrand}
      />
      <FlatList
        style={styles.productList}
        data={data}
        numColumns={2}
        keyExtractor={(item) => item?.id}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={({item}) => <ProductCard item={item} />}
        ListFooterComponent={<View style={{height: 80}} />}
      />
      <Link href='/filter' asChild>
        <TouchableOpacity style={styles.filterBtn}>
          <Image source={filterWhiteIcon} style={styles.filterIcon} />
          <Text style={styles.filterBtnText}>FILTER</Text>
        </TouchableOpacity>
      </Link>
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
