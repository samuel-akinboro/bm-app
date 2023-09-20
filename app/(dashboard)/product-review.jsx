import { FlatList, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { View } from '../../components/Themed';
import Sizes from '../../constants/Sizes';
import Categories from '../../components/common/Categories';
import { useEffect, useState } from 'react';
import ReviewCard from '../../components/common/ReviewCard';
import { useLocalSearchParams } from 'expo-router';
import { database } from '../../firebase/firebase';
import { ref, get } from 'firebase/database';
import filterReviewByRating from '../../utility/filterReviewsByRating'

const demoDetails = {
  ratings: 3.5,
  reviews: {
    count: 1023
  },
  availableSizes: ["39", "39.5", "40", "40.5", "41"],
  availableColors: ["#fff", "#101010", "#638b8b", "#2952cc"]
}

export default function ProductReviewScreen() {
  const id = useLocalSearchParams();
  const [allReviews, setAllReviews] = useState([]);
  const [sortBy, setSortBy] = useState('all');
  
  async function fetchReviews(shoeId) {
    const reviewsRef = ref(database, `/${shoeId}/reviews/reviews`);

    try {
      const snapshot = await get(reviewsRef);
      if (snapshot.exists()) {
        const reviewsData = snapshot.val();
        setAllReviews(reviewsData)
        return reviewsData;
      } else {
        console.log('Shoe not found.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching shoe:', error);
      return null;
    }
  }

  useEffect(() => {
    fetchReviews(id["0"])
  }, [])

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
        selected={sortBy}
        setSelected={setSortBy}
      />
      <FlatList
        style={{
          flex: 1, 
          paddingTop: 10,
          paddingHorizontal: Sizes.padding
        }} 
        data={sortBy === 'all' ? allReviews : filterReviewByRating(allReviews, sortBy)}
        renderItem={({item, index}) => (
          <ReviewCard 
            key={index} 
            item={item}
          />
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
