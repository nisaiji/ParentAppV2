import {Weight, Colors, Fonts} from '@src/theme/fonts';
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import colors from '../../../theme/colors';
import {Size} from '../../../theme/fonts';
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(5),
    gap: scale(5),
  },
  flexBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(5),
  },
  title1: {
    fontFamily: Fonts.REGULAR,
    fontSize: Size.font_18,
    color: Colors.WHITE,
  },
  title2: {
    fontFamily: Fonts.BOLD,
    fontSize: Size.font_18,
    color: Colors.WHITE,
  },
  title3: {
    fontFamily: Fonts.BOLD,
    fontSize: Size.font_18,
    color: Colors.WHITE,
  },
  childImg: {
    width: scale(40),
    height: scale(40),
    // marginRight: scale(5),
    borderRadius: 100,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: scale(20),
  },
  buttonsContainer: {
    height: 90,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    gap: 10,
  },
  buttonImage: {
    height: 32,
    width: 32,
  },
  buttonText: {
    fontFamily: Fonts.REGULAR,
    fontSize: Size.font_12,
    letterSpacing: 0.12,
    lineHeight: 20,
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
    padding: scale(12),
    backgroundColor: Colors.calenderBackground,
    borderRadius: 14,
    marginTop: scale(16),
  },
  childCardContainer: {
    height: 250,
    marginHorizontal: scale(5),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.WHITE,
    padding: scale(10),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  schoolLogo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  schoolName: {
    fontSize: Size.font_12,
    fontFamily: Fonts.REGULAR,
    color: colors.WHITE,
  },
  mainRow: {
    flexDirection: 'row',
    marginTop: scale(15),
    // paddingHorizontal: scale(10),
    paddingVertical: scale(10),
    alignItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth: 1,
  },
  infoBox: {
    flex: 1,
    paddingRight: scale(10),
  },
  name: {
    fontSize: Size.font_20,
    fontFamily: Fonts.BOLD,
    color: colors.WHITE,
    marginBottom: scale(5),
  },
  infoText: {
    fontSize: Size.font_12,
    fontFamily: Fonts.REGULAR,
    color: colors.WHITE,
  },
  bold: {
    fontFamily: Fonts.BOLD,
  },
  childCardImg: {
    width: 110,
    height: 110,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: colors.WHITE,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: scale(20),
  },
  dots: {
    width: 11,
    height: 11,
    borderRadius: 20,
    margin: scale(2),
    backgroundColor: colors.BLUE,
  },
});
export default styles;
