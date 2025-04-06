import {StyleSheet} from 'react-native';
import metrics from '../../../theme/metrics';
import {Fonts, Size} from '../../../theme/fonts';
import { scale } from 'react-native-size-matters';
import colors from '../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: scale(12),
    paddingVertical: scale(60),
    height: metrics.screenHeight,
    justifyContent: 'space-between',
  },
  logo: {
    height: scale(100),
    width: scale(100),
    alignSelf: 'center',
    marginBottom: scale(40),
  },
  contentContainer: {
    alignItems: 'center',
  },
  title: {
    color: colors.WHITE,
    fontSize: Size.font_18,
    marginBottom: scale(20),
    fontFamily: Fonts.BOLD,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    marginBottom: scale(20),
    width: '100%',
    gap: scale(10),
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.BACKGROUND_COLOR,
    borderRadius: scale(12),
    width: scale(110),
    height: scale(52),
    marginRight: scale(2),
    justifyContent:'space-around'
  },
  flag: {
    width: scale(24),
    height: scale(20)
  },
  code: {
    color: colors.WHITE,
    fontSize: Size.font_14,
    fontFamily: Fonts.BOLD,
  },
  downArrow: {
    width: scale(14),
    height: scale(8),
  },
  phoneInputContainer: {
    flex: 1,
    backgroundColor: colors.BACKGROUND_COLOR,
    borderRadius: scale(12),
    paddingHorizontal: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: colors.WHITE,
    fontSize: Size.font_14,
    paddingVertical: scale(12),
    fontFamily: Fonts.MEDIUM,
  },
  clearButton: {
    paddingHorizontal: 6,
  },
  clearText: {
    color: '#aaa',
    fontSize: scale(18),
  },
  button: {
    backgroundColor: colors.WHITE,
    borderRadius: scale(12),
    alignItems: 'center',
    width: '100%',
    height: scale(52),
    justifyContent:'center'
  },
  buttonText: {
    color: 'black',
    fontSize: scale(18),
    fontFamily: Fonts.BOLD,
  },
});
