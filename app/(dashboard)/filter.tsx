import { StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Text, View } from '../../components/Themed';
import Sizes from '../../constants/Sizes';
import { checkIcon, nikeIcon } from '../../constants/Icons';
import Colors from '../../constants/Colors';
import { Link } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';
import { useState } from 'react';
import RangePicker from '../../components/common/RangePicker';
import FilterBy from '../../components/common/FilterBy';
import FilterByColor from '../../components/common/FilterByColor';

export default function FilterScreen() {
  const [selectedBrand, setSelectedBrand] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <ScrollView style={styles.scrollView}>

        {/* Brand */}
        <View style={styles.sectionNoPadding}>
          <Text style={styles.sectionNoPaddingTitle}>Brand</Text>
          <FlatList 
            data={Array(10).fill("")}
            horizontal
            contentContainerStyle={{gap: Sizes.width * 0.10, paddingLeft: Sizes.padding}}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <TouchableOpacity>
                <View style={styles.brandImageContainer}>
                  <Image source={nikeIcon} style={styles.brandIcon} />
                  <View style={styles.checkbox}>
                    <Image source={checkIcon} style={styles.checkIcon} />
                  </View>
                </View>
                <Text style={styles.brandName}>NIKE</Text>
                <Text style={styles.itemsCount}>1001 Items</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Price Range */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Range</Text>
          <RangePicker />
        </View>

        {/* Sort By */}
        <View style={styles.sectionNoPadding}>
          <Text style={styles.sectionNoPaddingTitle}>Sort By</Text>
          <FilterBy data={[
            'Most Recent',
            'Lowest Price',
            'Highest Price'
          ]} />
        </View>

        {/* Gender */}
        <View style={styles.sectionNoPadding}>
          <Text style={styles.sectionNoPaddingTitle}>Gender</Text>
          <FilterBy data={[
            'Man',
            'Woman',
            'Unisex'
          ]} />
        </View>

        {/* Color */}
        <View style={styles.sectionNoPadding}>
          <Text style={styles.sectionNoPaddingTitle}>Color</Text>
          <FilterByColor data={[
            {value: '#FF4C5E', name: 'Red'},
            {value: '#101010', name: 'Black'},
            {value: '#FFF', name: 'White'}
          ]} />
        </View>

        {/* spacing */}
        <View style={{height: 70}} />
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={[styles.footerBtn, {borderWidth: 1, borderColor: '#E7E7E7', backgroundColor: '#fff'}]}>
          <Text style={[styles.footerBtnText, {color: Colors.light.text}]}>RESET (4)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerBtn}>
          <Text style={styles.footerBtnText}>APPLY</Text>
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
  scrollView: {
    flex: 1,
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
    marginTop: Sizes.padding * 2,
    paddingHorizontal: Sizes.padding
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'semibold',
    marginBottom: 20
  },
  sectionNoPadding: {
    marginTop: Sizes.padding * 2
  },
  sectionNoPaddingTitle: {
    fontSize: 16,
    fontFamily: 'semibold',
    marginBottom: 20,
    paddingHorizontal: Sizes.padding
  },
  brandImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Sizes.width * 0.15,
    height: Sizes.width * 0.15,
    borderRadius: Sizes.width * 0.15,
    backgroundColor: Colors.light.gray
  },
  brandIcon: {
    width: '50%',
    height: '50%',
    objectFit: 'contain',
    tintColor: Colors.light.text
  },
  checkbox: {
    position: 'absolute',
    backgroundColor: Colors.light.text,
    height: Sizes.width * 0.055,
    width: Sizes.width * 0.055,
    borderRadius: Sizes.width * 0.055,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    right: 0
  },
  checkIcon: {
    tintColor: '#fff',
    width: '50%',
    height: '50%',
    objectFit: 'contain'
  },
  brandName: {
    fontFamily: 'bold',
    textAlign: 'center',
    marginTop: 15
  },
  itemsCount: {
    textAlign: 'center',
    color: Colors.light.inactiveText,
    fontSize: 11
  }
});
