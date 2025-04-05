import {StyleSheet} from 'react-native';
import {Size, Weight, Colors, Fonts} from '@src/theme/fonts';
import {scale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_6,
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
  scrollView: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(16),
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(20),
  },
  image: {
    width: scale(22),
    height: scale(22),
    marginRight: scale(10),
    top: scale(-36),
  },
  sectionTitle: {
    flex: 1,
  },
  titleText: {
    fontSize: Size.font_22,
    fontFamily: Fonts.BOLD,
    marginLeft: scale(20),
    color: Colors.BLACK,
    top: scale(8),
  },
  subtitleText: {
    fontSize: Size.font_20,
    fontFamily: Fonts.BOLD,
    marginTop: scale(60),
    marginLeft: scale(30),
    color: Colors.BLACK,
  },
  inputContainer: {
    marginBottom: scale(20),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.BORDER,
    borderRadius: scale(10),
    paddingVertical: scale(0),
    paddingHorizontal: scale(16),
    backgroundColor: Colors.WHITE,
  },
  label: {
    fontSize: Size.font_18,
    marginTop: scale(10),
    marginBottom: scale(5),
    fontFamily: Fonts.BOLD,
    color: Colors.BLACK,
  },
  input: {
    flex: 1,
    fontSize: Size.font_16,
    fontFamily: Fonts.BOLD,
    color: Colors.BLACK,
  },
  eyeIcon: {
    width: scale(22),
    height: scale(22),
    marginLeft: scale(10),
  },
  errorMessage: {
    color: 'red',
    fontSize: Size.font_14,
    marginVertical: scale(10),
  },
  saveButton: {
    borderRadius: scale(40),
    backgroundColor: Colors.COLOR_7,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(20),
    paddingVertical: scale(10),
  },
  saveButtonText: {
    color: Colors.CREAM,
    fontSize: Size.font_18,
    fontFamily: Fonts.BOLD,
  },
});
