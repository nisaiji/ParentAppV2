import {Size, Colors, Fonts} from '@src/theme/fonts';
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import colors from '../../../theme/colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerView:{
    flex:1,
    paddingHorizontal:-10,
  },
  backgroundVideo: {
    position: 'absolute',
    top: scale(0),
    left: scale(0),
    bottom: scale(0),
    right: scale(0),
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: scale(50),
  },
  swipeContainer: {
    alignItems: 'center',
    marginBottom: scale(20),
    padding: scale(15),
    borderRadius: scale(0),
  },
  swipeBlack: {
    fontSize: Size.font_24,
    fontFamily: Fonts.BOLD,
    left: scale(7),
    color: colors.BLACK,
  },
  swipeWhite: {
    fontSize: Size.font_20,
    color: colors.WHITE,
    fontFamily: Fonts.BOLD,
  },
  arrowIcon: {
    height: scale(35),
    width: scale(30),
    top: scale(15),
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.COLOR_6,
  },
  modalContent: {
    backgroundColor: Colors.COLOR_6,
    borderRadius: scale(10),
    padding: scale(30),
    alignItems: 'center',
  },
  swipeText: {
    alignSelf: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(20),
    backgroundColor: colors.COLOR_6,
  },
  header: {
    position: 'absolute',
    top: scale(50),
    width: '100%',
    alignItems: 'center',
  },
  logoText: {
    color: Colors.WHITE,
    fontSize: Size.font_40,
    fontFamily: Fonts.BOLD,
    top: scale(10),
  },
  headerText: {
    color: Colors.WHITE,
    fontSize: Size.font_24,
    fontFamily: Fonts.MEDIUM,
    top: scale(20),
  },
  subHeaderText: {
    color: Colors.WHITE,
    fontSize: Size.font_24,
    fontFamily: Fonts.MEDIUM,
    top: scale(14),
  },
});
export default styles;
