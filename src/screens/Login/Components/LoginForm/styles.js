import {Fonts, Size, Colors} from '@src/theme/fonts.js';
import metrics from '@src/theme/metrics';
import {scale} from 'react-native-size-matters';
import {StyleSheet} from 'react-native';
import colors from '../../../../theme/colors';
export const styles = StyleSheet.create({
  container: {
    display: 'flex-1',
    backgroundColor: colors.COLOR_6,
    borderTopLeftRadius: scale(50),
    borderTopRightRadius: scale(50),
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    opacity: 0.5,
    zIndex: 10,
  },
  formContainer: {
    height: '100%',
    display: 'flex',
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(20),
  },
  logo: {
    height: scale(40),
    width: scale(40),
  },
  logoText: {
    color: Colors.COLOR_7,
    fontSize: Size.font_28,
    paddingLeft: scale(8),
    fontFamily: Fonts.BOLD,
  },
  infocontainer: {
    // height: '70%',
  },
  welcomeContainer: {
    flexDirection: 'row',
    maxHeight: scale(48),
    display: 'flex-1',
    marginTop: scale(50),
  },
  welcomeTextPrimary: {
    fontSize: Size.font_24,
    color: Colors.COLOR_7,
    fontFamily: Fonts.BOLD,
  },
  welcomeTextSecondary: {
    fontSize: Size.font_24,
    color: Colors.BLACK,
    fontFamily: Fonts.BOLD,
  },
  description: {
    color: Colors.COLOR_8,
    fontFamily: Fonts.REGULAR,
    fontSize: Size.font_14,
    lineHeight: scale(20),
    marginTop: scale(20),
    width: '85%',
  },
  inputLabel: {
    fontSize: Size.font_14,
    color: Colors.COLOR_8,
    fontFamily: Fonts.BOLD,
    marginTop: scale(10),
  },
  inputContainer: {
    marginTop: scale(8),
  },
  input: {
    borderColor: Colors.GRAY,
    borderWidth: 1,
    height: scale(50),
    borderRadius: 14,
    fontSize: Size.font_14,
    marginTop: scale(8),
    paddingLeft: scale(20),
    color: Colors.BLACK,
    fontFamily: Fonts.MEDIUM,
    backgroundColor: colors.WHITE,
  },
  errorText: {
    color: Colors.RED,
    fontFamily: Fonts.REGULAR,
    marginTop: scale(4),
  },
  passwordInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.GRAY,
    height: scale(50),
    marginTop: scale(8),
    borderRadius: scale(14),
    marginTop: scale(8),
    backgroundColor: colors.WHITE,
  },
  passwordInput: {
    flex: 5 / 6,
    paddingHorizontal: scale(10),
    color: Colors.BLACK,
    fontSize: Size.font_14,
    fontFamily: Fonts.MEDIUM,
    paddingLeft: scale(20),
  },
  eyeIcon: {
    width: 20,
    height: 20,
  },
  passwordVisibilityToggle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1 / 6,
  },
  forgotPasswordText: {
    color: Colors.BLACK,
    fontSize: Size.font_14,
    textAlign: 'right',
    fontFamily: Fonts.BOLD,
    marginTop: scale(20),
    marginBottom: scale(30),
  },
  loginButton: {
    backgroundColor: Colors.COLOR_7,
    paddingVertical: scale(10),
    borderRadius: scale(24),
    marginTop: scale(30),
    marginBottom: scale(20),
  },
  loginButtonText: {
    color: Colors.WHITE,
    fontSize: Size.font_18,
    textAlign: 'center',
    fontFamily: Fonts.BOLD,
  },
});
