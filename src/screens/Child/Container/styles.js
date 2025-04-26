import { Size, Weight, Colors, Fonts } from '@src/theme/fonts';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import colors from '../../../theme/colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: scale(10)
  },
  childContainer: {
    marginTop: scale(0)
  },
  childCard: {
    flexDirection: 'row',
    height: scale(80),
    borderRadius: scale(12),
    borderWidth: 2,
    borderColor: colors.BORDER,
    backgroundColor: colors.PURPLE50,
    paddingHorizontal: scale(16),
    alignItems:'center',
    marginBottom: scale(28)
  },
  childImg:{
    width: scale(40),
    height: scale(40),
    marginRight: scale(10)
  },
  childName:{
    color: colors.WHITE,
    fontSize: Size.font_16,
    fontFamily: Fonts.BOLD,
  },
  rightArrow:{
    position: 'absolute',
    right: scale(16),
    width: scale(24),
    height: scale(24)
  }
});
export default styles;
