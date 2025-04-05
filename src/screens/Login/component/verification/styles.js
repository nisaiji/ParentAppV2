import {StyleSheet} from 'react-native';
import {Fonts, Size} from '../../../../theme/fonts';
import metrics from '../../../../theme/metrics';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
  },
  backButton: {
    width: 24,
    height: 24,
    position: 'absolute',
    bottom: -10,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontFamily: Fonts.BOLD,
    textAlign: 'center',
    width: metrics.screenWidth,
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
    width: '80%',
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
  },
  grayText: {
    color: 'gray',
  },
  otpContainer: {
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  otpInput: {
    width: 55,
    height: 55,
    backgroundColor: '#111',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: Fonts.MEDIUM,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#66666680',
    paddingHorizontal: 12,
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 20,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: Size.font_14,
    paddingVertical: 12,
    fontFamily: Fonts.MEDIUM,
  },
  inputContainerWithIcon: {
    flexDirection: 'row',
    backgroundColor: '#66666680',
    paddingHorizontal: 12,
    alignItems: 'center',
    borderRadius: 12,
    marginVertical: 20,
    position: 'relative',
    borderWidth: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIconImage: {
    height: 24,
    width: 24,
    tintColor: '#aaa',
  },
  continueButton: {
    marginTop: 55,
    backgroundColor: 'white',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueText: {
    fontFamily: Fonts.BOLD,
    fontSize: 18,
    color: '#0A0A0A',
    fontSize: 16,
    color: 'black',
  },
  addChildButton: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'white',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  addChildText: {
    fontFamily: Fonts.BOLD,
    fontSize: 18,
    color: '#0A0A0A',
    fontSize: 16,
    color: '#fff',
  },
  addIcon: {
    height: 24,
    width: 24,
  },
  verifyedText: {
    color: '#00B383',
    fontFamily: Fonts.BOLD,
    fontSize: 14,
  },
  verifiedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#666',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 14,
    marginBottom: 20,
  },
  nameText: {
    color: 'white',
    fontFamily: Fonts.BOLD,
    fontSize: 16,
  },
  verifiedWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  verifiedIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
});
