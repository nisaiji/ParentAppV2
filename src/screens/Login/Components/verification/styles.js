import {StyleSheet} from 'react-native';
import {Fonts, Size} from '../../../../theme/fonts';
import metrics from '../../../../theme/metrics';
import colors from '../../../../theme/colors';
import { scale } from 'react-native-size-matters';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  
  subtitle: {
    color: colors.WHITE,
    fontSize: Size.font_16,
    fontFamily: Fonts.REGULAR,
    width: '80%',
  },
  label: {
    color: colors.WHITE,
    fontSize: Size.font_16,
    fontFamily: Fonts.REGULAR,
  },
  grayText: {
    color: 'gray',
  },
  otpContainer: {
    marginVertical: scale(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(40),
  },
  otpInput: {
    width: scale(55),
    height: scale(55),
    backgroundColor: '#111',
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: Colors.WHITE,
    color: colors.WHITE,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: Fonts.MEDIUM,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#66666680',
    paddingHorizontal: scale(12),
    alignItems: 'center',
    borderRadius: scale(12),
    marginTop: scale(20),
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
    backgroundColor: '#66666680',
    paddingHorizontal: scale(12),
    alignItems: 'center',
    borderRadius: scale(12),
    marginVertical: scale(20),
    position: 'relative',
    borderWidth: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: scale(16),
    top: scale(16),
    height: scale(24),
    width: scale(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIconImage: {
    height: scale(24),
    width: scale(24),
    tintColor: '#aaa',
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
    fontSize: scale(18),
    color: '#0A0A0A',
    fontSize: scale(16),
    color: 'black',
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
  },
  addChildText: {
    fontFamily: Fonts.BOLD,
    fontSize: scale(18),
    color: '#0A0A0A',
    fontSize: scale(16),
    color: '#fff',
  },
  addIcon: {
    height: scale(24),
    width: scale(24),
  },
  verifyedText: {
    color: '#00B383',
    fontFamily: Fonts.BOLD,
    fontSize: scale(14),
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
});
