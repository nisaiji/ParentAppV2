import {Size, Fonts} from '@src/theme/fonts';
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import colors from '@src/theme/colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    marginTop: scale(13),
    marginHorizontal: scale(6),
  },
  label: {
    color: colors.WHITE,
    fontSize: Size.font_16,
    fontFamily: Fonts.MEDIUM,
  },
  input: {
    flex: 1,
    color: colors.WHITE,
    fontSize: Size.font_14,
    paddingVertical: scale(12),
    fontFamily: Fonts.MEDIUM,
  },
  inputContainerWithIcon: {
    flexDirection: 'row',
    backgroundColor: colors.COLOR_1_80,
    paddingHorizontal: scale(12),
    alignItems: 'center',
    borderRadius: scale(12),
    marginTop: scale(14),
    marginVertical: scale(27),
    position: 'relative',
    borderWidth: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: scale(16),
    height: scale(24),
    width: scale(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIconImage: {
    height: scale(24),
    width: scale(24),
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginTop: -20,
    marginBottom: 10,
    marginLeft: 6,
    fontFamily: Fonts.MEDIUM,
  },
  continueButton: {
    marginTop: scale(28),
    backgroundColor: colors.WHITE,
    paddingVertical: scale(14),
    borderRadius: scale(12),
    alignItems: 'center',
  },
  continueText: {
    fontFamily: Fonts.BOLD,
    color: colors.DISABLE_COLOR,
    fontSize: Size.font_16,
    color: colors.BLACK,
  },
});
export default styles;
