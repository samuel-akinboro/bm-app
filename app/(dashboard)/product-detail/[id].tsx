import { FlatList, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, Animated, StatusBar, TextInput, Keyboard } from 'react-native';
import { Text, View } from '../../../components/Themed';
import Sizes from '../../../constants/Sizes';
import { StarIcon, addCircleIcon, checkIcon, closeIcon, minusCircleIcon, tickCircleIcon } from '../../../constants/Icons';
import Colors from '../../../constants/Colors';
import Gallery from '../../../components/common/Gallery';
import { useEffect, useRef, useState } from 'react';
import ReviewCard from '../../../components/common/ReviewCard';
import { Link, router } from 'expo-router';
import Modal from "react-native-modal";
import { useLocalSearchParams } from 'expo-router';
import { database } from '../../../firebase/firebase'
import { ref, child, get, query, orderByChild, limitToFirst } from 'firebase/database';

const demoDetails = {
  ratings: 3.5,
  reviews: {
    count: 1023
  },
  availableSizes: ["39", "39.5", "40", "40.5", "41"],
  availableColors: ["#fff", "#101010", "#638b8b", "#2952cc"]
}

export default function ProductDetailScreen() {
  const item = useLocalSearchParams();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [availableColors, setAvailableColors] = useState([]);
  const [numberOfReviews, setNumberOfReviews] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState(item?.availableSizes[0])
  const [selectedColor, setSelectedColor] = useState(demoDetails.availableColors[0]);

  async function fetchAvailableColors(itemId) {
    const itemRef = ref(database, `/${itemId}/availableColors`);
    
    try {
      const snapshot = await get(itemRef);
      if (snapshot.exists()) {
        // Convert the snapshot into an array
        const availableColors = [];
        snapshot.forEach((childSnapshot) => {
          availableColors.push(childSnapshot.val());
        });
        return availableColors;
      } else {
        console.log("No data available for the item");
        return null;
      }
    } catch (error) {
      console.error("Error fetching available colors:", error);
      return null;
    }
  }

  async function fetchReviews(itemId) {
    const reviewCountRef = ref(database, `/${itemId}/reviews/count`);
    const reviewsRef = ref(database, `/${itemId}/reviews/reviews`);
    const reviewsQuery = query(reviewsRef, orderByChild('rating'), limitToFirst(3));
    
    try {
      const snapshot = await get(reviewCountRef);
      const snapshot2 = await get(reviewsQuery);
      if (snapshot.exists() && snapshot2.exists()) {
        const reviewCount = snapshot.val();
        const reviews = [];
        snapshot2.forEach((childSnapshot) => {
          reviews.push(childSnapshot.val());
        });

        setNumberOfReviews(reviewCount)
        setReviews(reviews)
        
      } else {
        console.log("No data available for the item");
        return null;
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return null;
    }
  }

  useEffect(() => {
    fetchAvailableColors(item.firebaseId).then((colors) => {
      if (colors) {
        setAvailableColors(colors)
      }
    });
    fetchReviews(item.firebaseId)
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <ScrollView style={styles.scrollView}>

        {/* Carousel */}
        <View style={styles.carousel}>
          <FlatList
            style={styles.flatlist}
            data={item?.gallery?.split(',')}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            scrollEventThrottle={16}
            bounces={false}
            renderItem={({item, index}) => (
              <Gallery uri={item} key={index} />
            )}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
          />

          {/* Widget */}
          <View style={styles.widgetBox}>
            {/* Carousel dots */}
            <View style={styles.dotRow}>
              {["", "", ""].map((_, index) => {
                const width = Sizes.width - (Sizes.padding * 2);
                const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
                const dotOpacity = scrollX.interpolate({
                  inputRange,
                  outputRange: [0.15, 1, 0.15],
                  extrapolate: 'clamp',
                });

                return (
                  <Animated.View
                    key={index}
                    style={[styles.dot, {opacity: dotOpacity}]}
                  />
                );
              })}
            </View>
            
            {/* change shoe color */}
            <View style={styles.widget}>
              {availableColors.map((color, i) => (
                <TouchableOpacity 
                  key={i} 
                  style={[
                    styles.pickColor, 
                    {backgroundColor: color?.value}
                  ]} 
                  onPress={() => setSelectedColor(color)}
                >
                  {selectedColor === color && (
                    <Image 
                      source={checkIcon} 
                      style={{
                        width: '50%', 
                        height: '50%', 
                        objectFit: 'contain', 
                        tintColor: color?.name?.toLowerCase() === 'white' ? Colors.light.text : '#fff'
                      }} 
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        {/* End of Carousel */}
        
        {/* Details */}
        <View style={styles.section}>
          <View style={styles.info}>
            <Text 
              style={styles.name}
              ellipsizeMode='tail'
              numberOfLines={1}
            >
              {item?.name}
            </Text>
            <View style={styles.ratingBox}>
              <View style={styles.ratingStars}>
                {
                  Array(Math.floor(item?.rating))
                    .fill('')
                    .map((_, i) => (
                      <Image source={StarIcon} style={styles.star} key={i} />
                    ))
                }
                {
                  Array(Math.ceil(5 - item?.rating))
                    .fill('')
                    .map((_, i) => (
                      <Image key={i} source={StarIcon} style={[styles.star, {tintColor: Colors.light.inactiveText}]} />
                    ))
                }
              </View>
              <Text style={styles.rating}>{item?.rating}</Text>
              <Text style={styles.review}>({numberOfReviews} Reviews)</Text>
            </View>
          </View>
        </View>

        {/* Sizes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.availableSizes}>
            {demoDetails.availableSizes.map((size, i) => (
              <TouchableOpacity key={i} style={[styles.sizeBtn, {backgroundColor: selectedSize === size ? Colors.light.text : '#fff'}]} onPress={() => setSelectedSize(size)}>
                <Text style={[styles.sizeBtnText, {color: selectedSize === size ? '#fff' : '#6F6F6F'}]}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{item?.description}</Text>
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews ({numberOfReviews})</Text>
          <View style={styles.reviewsContainer}>
            {reviews.map((review, i) => <ReviewCard key={i} item={review} />)}
          </View>
          <Link href='/product-review' asChild>
            <TouchableOpacity style={styles.seeReviewsBtn}>
              <Text style={styles.seeReviewsBtnText}>SEE ALL REVIEW</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* spacing */}
        <View style={{height: 50}} />
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <Text style={styles.footerPriceTag}>Price</Text>
          <Text style={styles.footerPrice}>$235.00</Text>
        </View>
        <TouchableOpacity 
          style={styles.footerBtn}
          onPress={() => setShowAddToCartModal(true)}
        >
          <Text style={styles.footerBtnText}>ADD TO CART</Text>
        </TouchableOpacity>
      </View>

      {/* Add to Cart Modal */}
      <Modal
        isVisible={showAddToCartModal}
        style={{
          justifyContent: 'flex-end',
          margin: 0
        }}
        swipeDirection="down"
        avoidKeyboard={true}
        onBackButtonPress={() => setShowAddToCartModal(false)}
        onDismiss={() => setShowAddToCartModal(false)}
        onBackdropPress={() => setShowAddToCartModal(false)}
        onSwipeComplete={() => setShowAddToCartModal(false)}
      > 
        <View style={styles.modalContainer}>
          <View style={styles.modalHandle} />

          {/* top */}
          <View style={styles.modalTop}>
            <Text style={styles.modalTopText}>Add to cart</Text>
            <TouchableOpacity>
              <Image source={closeIcon} style={styles.modalTopIcon} />
            </TouchableOpacity>
          </View>

          {/* Quantity*/}
          <View style={styles.quantityBox}>
            <Text style={styles.quantityTitle}>Quantity</Text>
            <View style={styles.quantityRow}>
              <TextInput
                keyboardType='numeric'
                value="1"
                style={styles.quantityInput}
              />
              <View style={styles.quantityBtns}>
                <TouchableOpacity>
                  <Image source={minusCircleIcon} style={styles.quantityBtn} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={addCircleIcon} style={styles.quantityBtn} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          {/* footer */}
          <View style={styles.modalFooter}>
            <View style={styles.footerLeft}>
              <Text style={styles.footerPriceTag}>Total Price</Text>
              <Text style={styles.footerPrice}>$235.00</Text>
            </View>
            <TouchableOpacity style={styles.footerBtn} onPress={() => {
              setShowAddToCartModal(false)
              setTimeout(() => {
                setShowSuccessModal(true);
              }, 500)
            }}>
              <Text style={styles.footerBtnText}>ADD TO CART</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Added to Cart Succes Modal */}
      <Modal
        isVisible={showSuccessModal}
        style={{
          justifyContent: 'flex-end',
          margin: 0
        }}
        swipeDirection="down"
        avoidKeyboard={true}
        onBackButtonPress={() => setShowSuccessModal(false)}
        onDismiss={() => setShowSuccessModal(false)}
        onBackdropPress={() => setShowSuccessModal(false)}
        onSwipeComplete={() => setShowSuccessModal(false)}
      > 
        <View style={styles.modalContainer}>
          <View style={styles.modalHandle} />
          <Image 
            source={tickCircleIcon} 
            style={{
              height: 100,
              width: 100,
              objectFit: 'contain',
              alignSelf: 'center',
              marginTop: 15,
              marginBottom: 10
            }}
          />
          <Text 
            style={[
              styles.modalTopText,
              {
                textAlign: 'center',
                fontFamily: 'semibold',
                fontSize: 24
              }
            ]}
          >Add to cart</Text>

          <Text 
            style={
              {
                textAlign: 'center',
                fontFamily: 'regular',
                color: '#6F6F6F',
                marginTop: 5,
                marginBottom: 15
              }
            }
          >1 Item Total</Text>
          
          {/* footer */}
          <View style={[styles.modalFooter, {gap: 15}]}>
            <TouchableOpacity 
              onPress={() => {
                setShowSuccessModal(false);
                router.back()
              }}
              style={[styles.footerBtn, {borderWidth: 1, borderColor: '#E7E7E7', backgroundColor: '#fff', flex: 1}]}
            >
              <Text style={[styles.footerBtnText, {color: Colors.light.text}]}>BACK TO EXPLORE</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => {
                setShowSuccessModal(false);
                router.push('/cart')
              }}
              style={[styles.footerBtn, {flex: 1}]}
            >
              <Text style={styles.footerBtnText}>TO CART</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: Sizes.padding
  },
  flatlist: {
    borderRadius: Sizes.radius
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
  widgetBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: Sizes.padding,
    left: Sizes.padding,
    right: Sizes.padding,
    flex: 1,
  },
  dotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sizes.width * 0.02
  },
  dot: {
    width: Sizes.width * 0.02,
    height: Sizes.width * 0.02,
    backgroundColor: Colors.light.text,
    borderRadius: Sizes.width * 0.02
  },
  widget: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: Sizes.width * 0.02,
    borderRadius: Sizes.radius,
    gap: Sizes.width * 0.03,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity:  0.12,
    shadowRadius: 2.54,
    elevation: 3
  },
  pickColor: {
    width: Sizes.width * 0.06,
    height: Sizes.width * 0.06,
    backgroundColor: Colors.light.text,
    borderRadius: Sizes.width * 0.06,
    borderWidth: 0.5,
    borderColor: Colors.light.text,
    justifyContent: 'center',
    alignItems: 'center'
  },
  carousel: {
    paddingTop: Sizes.padding / 2
  },
  section: {
    marginTop: Sizes.padding
  },
  info: {
    paddingTop: 10
  },
  ratingBox: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10
  },
  star: {
    width: 12,
    height: 12,
    objectFit: 'contain'
  },
  rating: {
    fontSize: 11,
    fontFamily: 'bold',
    color: Colors.light.text
  },
  review: {
    fontSize: 11,
    fontFamily: 'regular',
    color: Colors.light.inactiveText
  },
  name: {
    fontSize: 20,
    fontFamily: 'bold'
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'semibold',
    marginBottom: 10
  },
  availableSizes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  sizeBtn: {
    width: Sizes.width * 0.11,
    height: Sizes.width * 0.11,
    borderRadius: Sizes.width * 0.11,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7E7E7'
  },
  sizeBtnText: {
    fontFamily: 'bold',
  },
  description: {
    color: '#6F6F6F',
    fontFamily: 'regular',
    lineHeight: 24
  },
  reviewsContainer: {
    gap: 20
  },
  seeReviewsBtn: {
    marginTop: 35,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#E7E7E7',
    borderRadius: 100
  },
  seeReviewsBtnText: {
    fontFamily: 'bold',
    textAlign: 'center'
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: Sizes.padding,
    borderTopRightRadius: Sizes.radius,
    borderTopLeftRadius: Sizes.radius
  },
  modalFooter: {
    height: 57,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Keyboard.isVisible() ? 0 : 15,
    marginTop: 5
  },
  modalHandle: {
    height: 4,
    width: 44,
    backgroundColor: '#E7E7E7',
    borderRadius: 10,
    alignSelf: 'center'
  },
  modalTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25
  },
  modalTopText: {
    fontSize: 20,
    fontFamily: 'bold',
    color: Colors.light.text
  },
  modalTopIcon: {
    height: 18,
    width: 18,
    objectFit: 'contain'
  },
  quantityTitle: {
    fontFamily: 'bold',
    color: Colors.light.text
  },
  quantityBox: {
    marginVertical: 20,
    borderBottomWidth: 1,
    borderColor: Colors.light.text,
    paddingBottom: 10
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  quantityInput: {
    flex: 1,
    paddingVertical: 10,
    paddingTop: 15
  },
  quantityBtns: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center'
  },
  quantityBtn: {
    objectFit: 'contain',
    height: 24, 
    width: 24
  }
});
