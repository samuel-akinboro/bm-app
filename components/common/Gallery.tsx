import { Image, StyleSheet, Text, View } from 'react-native'
import Sizes from '../../constants/Sizes'
import Colors from '../../constants/Colors'

const Gallery = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/shoe.png')}
        style={styles.image}
      />
    </View>
  )
}

export default Gallery

const pictureSize = Sizes.width - (Sizes.padding * 2);

const styles = StyleSheet.create({
  container: {
    width: pictureSize,
    height: pictureSize,
    backgroundColor: Colors.light.gray,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '70%',
    height: '70%',
    objectFit: 'contain'
  }
})