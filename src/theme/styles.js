import { StyleSheet, Dimensions } from "react-native";
import { scale } from "react-native-size-matters";

import Colors from "./colors";
import { Fonts, Size } from "./fonts";

const globalStyles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  container: {
    flex: 1,
  },
  appContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  labelStyle: {
    color: Colors.LABEL_COLOR,
    fontFamily: Fonts.REGULAR,
    fontSize: Size.font_12,
  },
  marginButtom0: {
    marginBottom: 0
  },
  screenWidth: Dimensions.get("screen").width,
  screenHeight: Dimensions.get('screen').height,
  hitSlop10: {
    top: scale(10),
    bottom: scale(10),
    left: scale(10),
    right: scale(10)
  },
  hitSlop20: {
    top: scale(20),
    bottom: scale(20),
    left: scale(20),
    right: scale(20)
  }
});

export default globalStyles;
