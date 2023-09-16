import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import Header from '../../components/Header';
import Sizes from '../../constants/Sizes';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
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
