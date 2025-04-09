import { Size, Weight, Colors, Fonts } from '@src/theme/fonts';
import { StyleSheet } from 'react-native';
import { s, scale } from 'react-native-size-matters';
import colors from '../../../theme/colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: scale(10)
  },
  childImg: {
    width: scale(80),
    height: scale(80),
    marginRight: scale(18)
  },
  personalDetailContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginHorizontal: scale(6),
    marginBottom: scale(10)
  },
  parentDetailLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  parentName: {
    color: colors.WHITE,
    marginBottom: scale(5),
    fontSize: Size.font_16,
    fontFamily: Fonts.BOLD,
  },
  parentLabel: {
    color: colors.COLOR_2,
    fontSize: Size.font_14,
    fontFamily: Fonts.REGULAR,
  },
  pencilIcon: {
    width: scale(24),
    height: scale(24),
  },
  listItemCointainer: {
    marginTop: scale(27)
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scale(15),
    backgroundColor: colors.COLOR_1_40,
    borderRadius: scale(12),
  },
  itemLeftContainer:{
    flexDirection:'row',
  },
  itemLabel:{
    marginLeft: scale(10)
  },
  mb16:{
    marginBottom: scale(16)
  },
  mb20:{
    marginBottom: scale(20)
  },
  mb40:{
    marginBottom: scale(40)
  },
  combinedBG:{
    backgroundColor: colors.COLOR_1_40,
    borderRadius: scale(12),
  },
  combinedBGItem:{
    borderRadius: 0,
    backgroundColor: 'transparent',
  },
  borderBottom:{
    backgroundColor: colors.COLOR_2_40,
    height: 1,
    width: '91%',
    alignSelf:'center'
  }
});
export default styles;
