import {StyleSheet} from 'react-native';

import colors from '@src/theme/colors';
import {Size, Fonts} from '@src/theme/fonts';
import {scale} from 'react-native-size-matters';
import {Colors} from '../../../../../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: scale(30),
    paddingHorizontal: scale(16),
    backgroundColor: Colors.COLOR_6,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(20),
  },
  sectionTitle: {
    fontSize: Size.font_20,
    fontFamily: Fonts.BOLD,
    marginLeft: scale(30),
    marginBottom: scale(20),
    color: colors.INDIGO,
  },
  image: {
    width: scale(18),
    height: scale(18),
    marginRight: scale(10),
    marginTop: scale(-15),
  },
  inputContainer: {
    marginBottom: scale(20),
  },
  label: {
    fontSize: Size.font_16,
    fontFamily: Fonts.BOLD,
    color: colors.INDIGO,
    marginBottom:scale(5)
  },
  description: {
    fontSize: Size.font_14,
    color: colors.DARK_BLUE,
    fontFamily: Fonts.BOLD,
    marginBottom: scale(15),
    top: scale(8),
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: scale(0.5),
    borderColor: colors.LIGHT_PURPLE,
    borderRadius: scale(10),
    backgroundColor: colors.WHITE,
  },
  input: {
    flex: 1,
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    fontSize: scale(15), // Increased font size
    borderWidth: scale(0.5),
    borderColor: colors.OFF_WHITE,
    borderRadius: scale(10),
    color: colors.BLACK,
    backgroundColor: colors.WHITE,
    fontFamily: Fonts.BOLD,
  },
  inputIcon: {
    width: scale(24),
    height: scale(24),
    marginRight: scale(10),
  },
  updateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(14),
    borderColor: colors.MODERATE_PURPLE,
    borderWidth: scale(0.25),
    backgroundColor: colors.WHITE,
    paddingVertical: scale(12),
    marginBottom: scale(15),
  },
  updateButtonText: {
    color: colors.GRAY,
    fontFamily: Fonts.MEDIUM,
    paddingLeft: scale(16),
    flex: 1,
    fontSize: scale(14),
    paddingHorizontal: scale(11),
  },
  buttonIcon: {
    width: scale(18),
    height: scale(18),
    marginRight: scale(10),
  },
  saveButton: {
    borderRadius: 40,
    backgroundColor: colors.PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(14),
  },
  saveButtonText: {
    color: colors.WHITE,
    fontSize: scale(16),
    fontFamily: Fonts.BOLD,
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
});