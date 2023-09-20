import { FlatList, StyleSheet, TouchableOpacity, Image, StatusBar, ActivityIndicator } from 'react-native';
import { Text, View } from '../../components/Themed';
import Header from '../../components/home/Header';
import Sizes from '../../constants/Sizes';
import Categories from '../../components/common/Categories';
import ProductCard from '../../components/home/ProductCard';
import { filterWhiteIcon } from '../../constants/Icons';
import Colors from '../../constants/Colors';
import { Link } from 'expo-router';
import { database } from '../../firebase/firebase'
import {ref, orderByKey, limitToFirst, get, query, startAfter, orderByChild, equalTo, startAt, endAt } from 'firebase/database';
import { useEffect, useState } from 'react';
import { capitalizeString, filterShoes } from '../../utility/filterShoes';
import { useSelector } from 'react-redux';

const INITIAL_BATCH_SIZE = 10;

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [brand, setBrand] = useState('all');
  const [loading, setLoading] = useState(true);
  const filters = useSelector(state => state.filter)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const initialData = [];
        const dataRef = ref(database, '/');

        let finalRef = dataRef;
        
        if(filters.brand) {
          finalRef = query(dataRef, orderByChild("brand"), equalTo(capitalizeString(filters.brand)), limitToFirst(INITIAL_BATCH_SIZE))
        }

        if(filters.priceRange) {
          finalRef = query(dataRef, orderByChild("price"), startAt(filters.priceRange[0]), endAt(filters.priceRange[1]), limitToFirst(INITIAL_BATCH_SIZE))
        }


        const snapshot = await get(
          finalRef
        );

        snapshot.forEach((childSnapshot) => {
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
    // filterShoes({brand: 'nike', priceRange: [0, 0]})
  }, [filters]);

  const handleEndReached = async () => {
    setLoading(true)
    if(data.length > 0) {
      try {
        const lastItem = data[data.length - 1];
        const lastItemKey = lastItem ? lastItem.key : null; 
        const dataRef = ref(database, '/');
        const snapshot = await get(
          query(dataRef, orderByKey(), startAfter(`${data.length - 1}`), limitToFirst(INITIAL_BATCH_SIZE))
        );
    
        const newData = [];
        snapshot.forEach((childSnapshot) => {
          newData.push(childSnapshot.val());
        });
    
        setData([...data, ...newData]);
      } catch (error) {
        console.error('Error fetching more data:', error);
      }
    }

    setLoading(false)
  };
  

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
        ListFooterComponent={(
          <View style={{height: 80}}>
            {loading && <ActivityIndicator size='large' />}
          </View>
        )}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
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
