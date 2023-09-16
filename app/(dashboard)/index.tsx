import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import Header from '../../components/home/Header';
import Sizes from '../../constants/Sizes';
import Categories from '../../components/home/Categories';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <Categories style={{marginTop: 15}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Sizes.statusbar,
    backgroundColor: '#fff'
  }
});
