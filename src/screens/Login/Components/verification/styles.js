import {StyleSheet} from 'react-native';
import {Fonts, Size} from '../../../../theme/fonts';
import metrics from '../../../../theme/metrics';
import colors from '../../../../theme/colors';
import {scale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subtitle: {
    color: colors.WHITE,
    fontSize: Size.font_16,
    fontFamily: Fonts.BOLD,
    width: '85%',
    lineHeight: scale(24),
  },
  label: {
    color: colors.WHITE,
    fontSize: Size.font_16,
    fontFamily: Fonts.BOLD,
    lineHeight: scale(20),
  },
  grayText: {
    color: colors.COLOR_1,
    fontFamily: Fonts.REGULAR,
  },
  blueText: {
    color: colors.BLUE,
    fontFamily: Fonts.REGULAR,
  },
  otpContainer: {
    marginVertical: scale(26),
    flexDirection: 'row',
    justifyContent: 'space-around',
    // marginBottom: scale(40),
    width: '90%',
    alignSelf: 'center',
  },
  otpInput: {
    width: scale(44),
    height: scale(44),
    backgroundColor: '#111',
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: colors.WHITE,
    color: colors.WHITE,
    fontSize: Size.font_20,
    textAlign: 'center',
    fontFamily: Fonts.BOLD,
  },
  phoneNumberContainer:{
    flexDirection: 'row',
    // paddingHorizontal: scale(12),
    alignItems: 'center',
    marginTop: scale(20),
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#66666680',
    paddingHorizontal: scale(12),
    alignItems: 'center',
    borderRadius: scale(12),
    marginTop: scale(20),
  },
  inputContainer1:{
    paddingHorizontal: scale(12),
    backgroundColor: '#66666680',
    borderRadius: scale(12),
    width: scale(220),
    marginLeft: scale(10)
  },
  input: {
    flex: 1,
    color: colors.WHITE,
    fontSize: Size.font_14,
    paddingVertical: scale(12),
    fontFamily: Fonts.BOLD,
  },
  inputContainerWithIcon: {
    flexDirection: 'row',
    backgroundColor: '#66666680',
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
    height: scale(18),
    width: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIconImage: {
    height: scale(24),
    width: scale(24),
  },
  continueButton: {
    marginTop: scale(55),
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
  addChildButton: {
    marginTop: scale(20),
    borderWidth: 1,
    borderColor: colors.WHITE,
    paddingVertical: scale(14),
    borderRadius: scale(12),
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'transparent'
  },
  addChildText: {
    fontFamily: Fonts.BOLD,
    color: colors.WHITE,
    fontSize: Size.font_16,
  },
  addIcon: {
    height: scale(24),
    width: scale(24),
  },
  verifyedText: {
    color: '#00B383',
    fontFamily: Fonts.BOLD,
    fontSize: Size.font_14,
  },
  verifiedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#666',
    paddingVertical: scale(20),
    paddingHorizontal: scale(15),
    borderRadius: scale(14),
    marginBottom: scale(20),
  },
  nameText: {
    color: colors.WHITE,
    fontFamily: Fonts.BOLD,
    fontSize: Size.font_16,
  },
  verifiedWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  verifiedIcon: {
    width: scale(16),
    height: scale(16),
    resizeMode: 'contain',
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
});
