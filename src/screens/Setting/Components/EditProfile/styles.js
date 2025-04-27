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
    marginBottom: scale(23),
  },
  schoolName: {
    fontSize: Size.font_16,
    fontFamily: Fonts.BOLD,
    color: colors.COLOR_2,
  },
  classContainer: {
    height: scale(32),
    width: scale(71),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.COLOR_1,
    borderRadius: scale(8),
  },
  childImgContainer: {
    width: scale(150),
    height: scale(150),
    alignSelf: 'center',
    position: 'relative',
    marginTop: scale(0),
    marginBottom: scale(23),
  },
  childImg: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  pencilIconView: {
    width: scale(36),
    height: scale(36),
    position: 'absolute',
    right: 5,
    bottom: 0,
  },
  pencilIcon: {
    width: '100%',
    height: '100%',
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
    fontFamily: Fonts.BOLD,
    fontSize: Size.font_14,
    color: colors.COLOR_3,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.COLOR_3,
    borderRadius: scale(10),
    paddingLeft: scale(8),
    fontFamily: Fonts.BOLD,
    fontSize: Size.font_14,
    color:colors.WHITE
  },
  placeholderText: {
    color: colors.COLOR_3,
  },
  errorText: {
    color: Colors.RED,
    marginTop: 4,
    fontSize: Size.font_12,
    paddingLeft: scale(8),
    fontFamily: Fonts.BOLD,
  },
  button: {
    backgroundColor: colors.WHITE,
    borderRadius: scale(12),
    height: scale(52),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(15),
  },
  buttonLabel: {
    color: colors.BLACK,
    fontFamily: Fonts.BOLD,
    fontSize: Size.font_18,
  },
  emailLabelContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom: scale(10),
  },
  pencilIconCotainer:{
    width: scale(24),
    height: scale(24)
  }
});
export default styles;
