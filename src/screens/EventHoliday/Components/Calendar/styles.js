import { StyleSheet } from "react-native";
import colors from "@src/theme/colors";
import { scale } from "react-native-size-matters";
import { Size, Fonts } from '@src/theme/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    overflow: 'hidden', 
  },
  header: {
    alignItems: 'center',
    padding: 10,
    color: colors.PURPLE,
  },
  headerText: {
    fontSize: Size.font_20,
    color: colors.PURPLE,
    fontFamily: Fonts.MEDIUM,
    marginBottom: scale(6),
  },
  arrow: {
    width: scale(13),
    height: scale(20),
    resizeMode: 'contain',
  },
  // New style for current date
  currentDayContainer: {
    backgroundColor: colors.PURPLE_LIGHT, // Set your desired background color
    borderColor: colors.BLACK,
    borderWidth: scale(2),
    borderRadius: scale(16),
  },
  currentDayText: {
    color: colors.BLACK,  // Text color for the current date
    fontWeight: 'bold',
  },
});

export default styles;
