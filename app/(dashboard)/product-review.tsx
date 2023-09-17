import { FlatList, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, Animated, StatusBar } from 'react-native';
import { Text, View } from '../../components/Themed';
import Sizes from '../../constants/Sizes';
import Categories from '../../components/common/Categories';
import Colors from '../../constants/Colors';
import { useRef, useState } from 'react';
import ReviewCard from '../../components/common/ReviewCard';

const demoDetails = {
  ratings: 3.5,
  reviews: {
    count: 1023
  },
  availableSizes: ["39", "39.5", "40", "40.5", "41"],
  availableColors: ["#fff", "#101010", "#638b8b", "#2952cc"]
}

export default function ProductReviewScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [selectedSize, setSelectedSize] = useState(demoDetails.availableSizes[0])
  const [selectedColor, setSelectedColor] = useState(demoDetails.availableColors[0]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Categories
        data={[
          "All",
          "5 stars",
          "4 stars",
          "3 stars",
          "2 stars",
          "1 star"
        ]}
        style={{
          marginVertical: 10
        }}
      />
      <FlatList
        style={{
          flex: 1, 
          paddingTop: 10,
          paddingHorizontal: Sizes.padding
        }} 
        data={Array(10).fill("")}
        renderItem={({item, index}) => (
          <ReviewCard key={index} />
        )}
        contentContainerStyle={{
          gap: 20
        }}
        ListFooterComponent={<View style={{height: 40}} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  reviewsContainer: {
    gap: 20
  }
});
