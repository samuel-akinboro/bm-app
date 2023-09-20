import { Dimensions } from "react-native";
import Constants from 'expo-constants'

const { width, height } = Dimensions.get('window')

export default {
  width,
  height,
  statusbar: Constants.statusBarHeight,
  padding: 20,
  radius: 20
};