import { FlatList, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, Animated } from 'react-native';
import { Text, View } from '../../components/Themed';
import Header from '../../components/home/Header';
import Sizes from '../../constants/Sizes';
import Categories from '../../components/home/Categories';
import ProductCard from '../../components/home/ProductCard';
import { checkIcon, filterWhiteIcon } from '../../constants/Icons';
import Colors from '../../constants/Colors';
import Gallery from '../../components/common/Gallery';
import { useRef, useState } from 'react';

export default function ProductDetailScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const demoColors = ["#fff", "#101010", "#638b8b", "#2952cc"];
  const [selectedColor, setSelectedColor] = useState(demoColors[1]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
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
              {demoColors.map((color, i) => (
                <TouchableOpacity key={i} style={[styles.pickColor, {backgroundColor: color}]} onPress={() => setSelectedColor(color)}>
                  {selectedColor === color && <Image source={checkIcon} style={{width: '50%', height: '50%', objectFit: 'contain', tintColor: color === '#fff' ? Colors.light.text : '#fff'}} />}
                </TouchableOpacity>
              ))}
            </View>
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
    width: Sizes.width * 0.03,
    height: Sizes.width * 0.03,
    backgroundColor: Colors.light.text,
    borderRadius: Sizes.width * 0.03
  },
  widget: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: Sizes.width * 0.02,
    borderRadius: Sizes.radius,
    gap: Sizes.width * 0.02,
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
  }
});
