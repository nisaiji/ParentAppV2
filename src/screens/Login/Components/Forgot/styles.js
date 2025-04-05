import {Fonts} from '@src/theme/fonts';
import {StyleSheet} from 'react-native';
import colors from '@src/theme/colors';
export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#4E2973',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoText: {
    color: '#FAFAFA',
    fontSize: 24,
    fontFamily: Fonts.BOLD,
  },
  logoTitle: {
    color: '#4E2973',
    fontSize: 24,
    fontFamily: Fonts.BOLD,
  },
  content: {
    marginTop: 70,
    width: '100%',
  },
  title: {
    fontSize: 24,
    color: '#0D0D0D',
    fontFamily: Fonts.BOLD,
  },
  instruction: {
    marginTop: 20,
    color: '#1C1C1C',
    fontSize: 14,
    fontFamily: Fonts.BOLD,
    width: '70%',
  },
  label: {
    marginTop: 38,
    color: '#1C1C1C',
    fontSize: 14,
    fontFamily: Fonts.BOLD,
  },
  input: {
    marginTop: 11,
    paddingHorizontal: 20,
    borderRadius: 14,
    borderColor: 'rgba(78, 41, 115, 0.5)',
    borderWidth: 1,
    backgroundColor: '#FFF',
    color: '#1C1C1C',
    fontSize: 14,
    height: 50,
    fontFamily: Fonts.LIGHT,
  },
  messageInput: {
    height: 146,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 47,
    borderRadius: 40,
    backgroundColor: '#4E2973',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 60,
  },
  buttonText: {
    color: '#FFFFF0',
    fontSize: 18,
    fontFamily: Fonts.BOLD,
  },
});
