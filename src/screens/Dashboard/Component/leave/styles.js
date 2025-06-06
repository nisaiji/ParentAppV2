import {StyleSheet} from 'react-native';
import colors from '@src/theme/colors';
import {Fonts, Size} from '@src/theme/fonts';

const styles = StyleSheet.create({
  noDataContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    color: colors.WHITE,
    fontFamily: Fonts.BOLD,
    fontSize: Size.font_20,
  },
});
