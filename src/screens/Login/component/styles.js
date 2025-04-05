import {StyleSheet} from 'react-native';
import metrics from '../../../theme/metrics';
import {Fonts, Size} from '../../../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 60,
    height: metrics.screenHeight,
    justifyContent: 'space-between',
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginBottom: 40,
  },
  contentContainer: {
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: Size.font_18,
    marginBottom: 20,
    fontFamily: Fonts.BOLD,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
    gap: 10,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
    gap: 5,
  },
  flag: {
    fontSize: 18,
    marginRight: 4,
  },
  code: {
    color: 'white',
    fontSize: Size.font_14,
    fontFamily: Fonts.BOLD,
  },
  downArrow: {
    width: 14,
    height: 8,
  },
  phoneInputContainer: {
    flex: 1,
    backgroundColor: '#222',
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: Size.font_14,
    paddingVertical: 12,
    fontFamily: Fonts.MEDIUM,
  },
  clearButton: {
    paddingHorizontal: 6,
  },
  clearText: {
    color: '#aaa',
    fontSize: 18,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontFamily: Fonts.BOLD,
  },
});
