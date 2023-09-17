import { FlatList, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, Animated, StatusBar } from 'react-native';
import { Text, View } from '../../components/Themed';
import Header from '../../components/home/Header';
import Sizes from '../../constants/Sizes';
import Categories from '../../components/home/Categories';
import ProductCard from '../../components/home/ProductCard';
import { StarIcon, checkIcon, filterWhiteIcon } from '../../constants/Icons';
import Colors from '../../constants/Colors';
import Gallery from '../../components/common/Gallery';
import { useRef, useState } from 'react';

const demoDetails = {
  ratings: 3.5,
  reviews: 1023,
  availableSizes: ["39", "39.5", "40", "40.5", "41"],
  availableColors: ["#fff", "#101010", "#638b8b", "#2952cc"]
}

export default function ProductDetailScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [selectedSize, setSelectedSize] = useState(demoDetails.availableSizes[0])
  const [selectedColor, setSelectedColor] = useState(demoDetails.availableColors[0]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <ScrollView style={styles.scrollView}>

        {/* Carousel */}
        <View style={styles.carousel}>
          <FlatList
            style={styles.flatlist}
            data={['', '', '']}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            scrollEventThrottle={16}
            bounces={false}
            renderItem={({item}) => (
              <Gallery />
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
              {demoDetails.availableColors.map((color, i) => (
                <TouchableOpacity key={i} style={[styles.pickColor, {backgroundColor: color}]} onPress={() => setSelectedColor(color)}>
                  {selectedColor === color && <Image source={checkIcon} style={{width: '50%', height: '50%', objectFit: 'contain', tintColor: color === '#fff' ? Colors.light.text : '#fff'}} />}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        {/* End of Carousel */}
        
        {/* Details */}
        <View style={styles.section}>
          <View style={styles.description}>
            <Text 
              style={styles.name}
              ellipsizeMode='tail'
              numberOfLines={1}
            >
              Jordan 1 Retro High Tie Dye
            </Text>
            <View style={styles.ratingBox}>
              <View style={styles.ratingStars}>
                {
                  Array(Math.floor(demoDetails.ratings))
                    .fill('')
                    .map((_, i) => (
                      <Image source={StarIcon} style={styles.star} />
                    ))
                }
                {
                  Array(Math.ceil(5 - demoDetails.ratings))
                    .fill('')
                    .map((_, i) => (
                      <Image source={StarIcon} style={[styles.star, {tintColor: Colors.light.inactiveText}]} />
                    ))
                }
              </View>
              <Text style={styles.rating}>{demoDetails.ratings}</Text>
              <Text style={styles.review}>({demoDetails.reviews} Reviews)</Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.availableSizes}>
            {demoDetails.availableSizes.map((size, i) => (
              <TouchableOpacity style={[styles.sizeBtn, {backgroundColor: selectedSize === size ? Colors.light.text : '#fff'}]} onPress={() => setSelectedSize(size)}>
                <Text style={[styles.sizeBtnText, {color: selectedSize === size ? '#fff' : '#6F6F6F'}]}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}></View>
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
    height: 40
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
  description: {
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
  }
});
