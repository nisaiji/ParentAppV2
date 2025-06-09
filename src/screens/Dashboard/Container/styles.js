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
  headerTitle: {
    fontSize: Size.font_18,
    fontFamily: Fonts.BOLD,
    color: Colors.WHITE,
    marginHorizontal: scale(16),
    marginTop: scale(23),
    marginBottom: scale(16),
  },
  calendarContainer: {
    padding: scale(12),
    backgroundColor: Colors.calenderBackground,
    borderRadius: 14,
    // marginTop: scale(16),
  },
  childCardContainer: {
    height: 220,
    marginHorizontal: scale(5),
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.COLOR_7_50,
  },
  headerBanner: {
    justifyContent: 'center',
    paddingHorizontal: scale(24),
    paddingTop: scale(20),
  },
  schoolName: {
    fontSize: Size.font_14,
    fontFamily: Fonts.BOLD,
    color: colors.WHITE,
    textAlign: 'right',
  },
  mainRow: {
    flexDirection: 'row',
    marginTop: scale(-10),
    paddingHorizontal: scale(30),
    alignItems: 'center',
  },
  childCardImg: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.WHITE,
    marginRight: scale(15),
  },
  infoBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: scale(16),
    paddingHorizontal: scale(10),
  },
  name: {
    fontSize: Size.font_18,
    fontFamily: Fonts.BOLD,
    color: colors.WHITE,
    marginTop: scale(24),
  },
  infoField: {
    marginBottom: scale(5),
  },
  label: {
    fontSize: Size.font_12,
    fontFamily: Fonts.REGULAR,
    color: '#A9A9A9',
  },
  value: {
    fontSize: Size.font_14,
    fontFamily: Fonts.BOLD,
    color: colors.WHITE,
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
