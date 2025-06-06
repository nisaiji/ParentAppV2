import {Weight, Colors, Fonts} from '@src/theme/fonts';
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import colors from '@src/theme/colors';
import {Size} from '@src/theme/fonts';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  line: {
    borderWidth: 1,
    borderColor: Colors.LINE,
    width: '100%',
    marginTop: scale(17),
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(12),
    paddingTop: scale(12),
  },
  title1: {
    fontFamily: Fonts.BOLD,
    fontSize: Size.font_16,
    color: Colors.WHITE,
  },
  title3: {
    fontFamily: Fonts.BOLD,
    fontSize: Size.font_18,
    color: Colors.WHITE,
  },
  title2: {
    fontFamily: Fonts.BOLD,
    fontSize: Size.font_20,
    color: Colors.WHITE,
  },
  childImg: {
    width: scale(40),
    height: scale(40),
    marginRight: scale(5),
    borderRadius: 100,
  },
  classContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.BLUE15,
    borderRadius: scale(8),
    padding: scale(7),
  },
  classSec: {
    fontSize: Size.font_14,
    fontFamily: Fonts.BOLD,
    color: colors.BLUE,
  },
  calendarContainer: {
    // padding: scale(12),
    // backgroundColor: Colors.calenderBackground,
    borderRadius: 14,
    marginTop: scale(16),
  },
  schoolNameContainer: {
    backgroundColor: '#66666640',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(5),
    borderRadius: 10,
  },
  schoolNameText: {
    fontSize: Size.font_20,
    fontFamily: Fonts.BOLD,
    color: colors.COLOR_2,
  },
});
export default styles;
