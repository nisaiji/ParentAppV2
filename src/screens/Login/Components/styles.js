import {StyleSheet} from 'react-native';
import metrics from '../../../theme/metrics';
import {Fonts, Size} from '../../../theme/fonts';
import {scale} from 'react-native-size-matters';
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
    height: scale(90),
    width: scale(80),
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
    lineHeight: scale(20),
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    marginBottom: scale(20),
    width: '100%',
    gap: scale(10),
  },
  countryCodeContainer: {
    borderRadius: scale(12),
    backgroundColor: colors.BACKGROUND_COLOR,
    flexDirection: 'row',
    width: scale(100),
    height: scale(50),
    paddingVertical: scale(16),
    paddingHorizontal: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(10),
  },
  flag: {
    width: scale(24),
    height: scale(20),
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
    flexDirection: 'row',
    flex: 1,
    width: scale(243),
    height: scale(50),
    backgroundColor: colors.BACKGROUND_COLOR,
    paddingHorizontal: scale(12),
    borderRadius: scale(12),
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: colors.WHITE,
    fontSize: Size.font_14,
    paddingVertical: scale(12),
    fontFamily: Fonts.MEDIUM,
  },
  crossIcon: {
    height: scale(24),
    width: scale(24),
  },
  button: {
    backgroundColor: colors.WHITE,
    borderRadius: scale(12),
    alignItems: 'center',
    width: '100%',
    height: scale(50),
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.BLACK,
    fontSize: Size.font_18,
    fontFamily: Fonts.BOLD,
  },
});
