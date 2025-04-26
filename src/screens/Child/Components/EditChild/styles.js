import {Size, Weight, Colors, Fonts} from '@src/theme/fonts';
import {Button, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import colors from '../../../../theme/colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: scale(10),
  },
  innerContainer: {
    marginHorizontal: scale(-16),
  },
  header: {
    flexDirection: 'row',
    backgroundColor: colors.COLOR_1_40,
    paddingHorizontal: scale(20),
    marginBottom: scale(23),
    height: scale(48),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  schoolName: {
    fontSize: Size.font_16,
    fontFamily: Fonts.BOLD,
    color: colors.COLOR_2,
  },
  classContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.COLOR_1,
    borderRadius: scale(8),
    padding: scale(7),
  },
  classSec: {
    fontSize: Size.font_14,
    fontFamily: Fonts.BOLD,
    color: colors.WHITE,
  },
  childImgContainer: {
    width: scale(150),
    height: scale(150),
    alignSelf: 'center',
    position: 'relative',
    marginBottom: scale(23),
  },
  childImg: {
    width: '100%',
    height: '100%',
  },
  pencilIcon: {
    width: scale(36),
    height: scale(36),
    position: 'absolute',
    right: 5,
    bottom: 5,
  },
  formContainer: {
    backgroundColor: colors.COLOR_1_40,
    borderRadius: scale(12),
    paddingHorizontal: scale(18),
    paddingVertical: scale(10),
    marginHorizontal: scale(16),
    marginBottom: scale(10),
  },
  formHeader: {
    fontFamily: Fonts.BOLD,
    fontSize: Size.font_16,
    color: colors.WHITE,
  },
  formInput: {
    marginTop: scale(15),
  },

  label: {
    marginBottom: scale(10),
    fontFamily: Fonts.MEDIUM,
    fontSize: Size.font_14,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.COLOR_3,
    borderRadius: scale(10),
    paddingLeft: scale(8),
    fontFamily: Fonts.MEDIUM,
    fontSize: Size.font_14,
  },
  textInput2: {
    paddingVertical: scale(10),
    fontSize: Size.font_14,
    paddingLeft: scale(8),
    fontFamily: Fonts.MEDIUM,
    color: Colors.WHITE,
  },
  errorText: {
    color: Colors.RED,
    marginTop: 4,
    fontSize: Size.font_12,
    paddingLeft: scale(8),
    fontFamily: Fonts.MEDIUM,
  },
  placeholderText: {
    color: colors.COLOR_3,
  },
  button: {
    backgroundColor: colors.WHITE,
    borderRadius: scale(12),
    height: scale(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(15),
  },
  buttonLabel: {
    color: colors.BLACK,
    fontFamily: Fonts.BOLD,
    fontSize: Size.font_18,
  },
});
export default styles;
