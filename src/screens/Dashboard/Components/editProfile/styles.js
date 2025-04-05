import {StyleSheet} from 'react-native';

import colors from '@src/theme/colors';
import {Size, Weight, Colors, Fonts} from '@src/theme/fonts';
import {scale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.COLOR_6,
    padding: scale(16),
    alignItems: 'center',
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: scale(10),
  },
  backButton: {
    width: scale(18),
    height: scale(18),
    marginRight: scale(10),
  },
  headerText: {
    fontSize: Size.font_20,
    fontFamily: Fonts.BOLD,
    marginLeft: scale(80),
    marginBottom: scale(30),
    top: scale(14),
    color: colors.BLACK,
  },
  formGroup: {
    width: '100%',
    marginVertical: scale(7),
  },
  genderLabel: {
    // marginBottom: scale(6),
    fontSize: Size.font_14,
    fontFamily: Fonts.BOLD,
    color: colors.BLACK,
  },
  label: {
    marginBottom: scale(6),
    fontSize: Size.font_14,
    fontFamily: Fonts.BOLD,
    color: colors.BLACK,
  },
  input: {
    borderWidth: 0.25,
    borderColor: colors.LIGHT_GRAY,
    borderRadius: scale(5),
    padding: scale(12),
    backgroundColor: colors.WHITE,
    fontSize: Size.font_16,
    color: colors.BLACK,
    fontFamily: Fonts.MEDIUM,
  },
  genderContainer: {
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY,
    borderRadius: scale(8),
    backgroundColor: Colors.WHITE,
  },
  genderPicker: {
    height: scale(50),
    width: '100%',
    color: Colors.BLACK,
    fontFamily: Fonts.BOLD,
    fontSize: Size.font_16,
  },
  updateButton: {
    backgroundColor: Colors.COLOR_7,
    borderRadius: scale(40),
    paddingVertical: scale(12),
    width: '100%',
    alignItems: 'center',
    marginTop: scale(20),
  },
  updateButtonText: {
    color: Colors.WHITE,
    fontSize: Size.font_16,
    fontFamily: Fonts.BOLD,
  },
});
