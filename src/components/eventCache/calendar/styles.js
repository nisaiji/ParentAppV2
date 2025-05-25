import {StyleSheet} from 'react-native';
import colors from '@src/theme/colors';
import {scale} from 'react-native-size-matters';
import {Size, Fonts} from '@src/theme/fonts';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#66666640',
    borderRadius: 12,
    marginTop: scale(25),
    paddingVertical: scale(18),
    paddingHorizontal: scale(10),
  },
  header: {
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontSize: Size.font_16,
    color: colors.WHITE,
    fontFamily: Fonts.BOLD,
    marginBottom: scale(6),
  },
  arrow: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
  },
  currentDayContainer: {
    backgroundColor: colors.PURPLE_LIGHT,
    borderColor: colors.BLACK,
    borderWidth: scale(2),
    borderRadius: scale(16),
  },
  currentDayText: {
    color: colors.WHITE,
  },
});

export default styles;
