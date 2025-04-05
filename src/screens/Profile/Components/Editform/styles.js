import {StyleSheet} from 'react-native';
import colors from '@src/theme/colors';
import {Size, Fonts} from '@src/theme/fonts';
import {scale} from 'react-native-size-matters';
import {Colors} from '../../../../theme/fonts';

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: scale(20),
    marginHorizontal: 'auto',
    width: '100%',
    backgroundColor: colors.OFF_WHITE,
    maxWidth: scale(480),
    borderRadius: scale(32),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    width: '100%',
  },
  section: {
    flexDirection: 'column',
    paddingHorizontal: scale(16),
    marginTop: scale(6),
    width: '100%',
    fontSize: scale(24),
    fontFamily: Fonts.BOLD,
    lineHeight: scale(28),
    color: colors.BLACK,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(10),
    marginTop: scale(15),
  },
  backIcon: {
    width: scale(18),
    height: scale(18),
    marginRight: scale(10),
  },
  backPress: {
    width: scale(30),
    height: scale(30),
  },
  titleText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: Size.font_24,
    color: colors.BLACK,
    fontFamily: Fonts.BOLD,
    marginRight: scale(20),
  },
  sectionHeader: {
    marginTop: scale(8),
    fontSize: Size.font_18,
    color: colors.BLACK,
    fontFamily: Fonts.BOLD,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    paddingVertical: 3,
    marginTop: scale(10),
    backgroundColor: colors.WHITE,
    borderRadius: scale(10),
    borderWidth: scale(0.5),
    borderColor: colors.COLOR_4,
  },
  inputText: {
    flex: 1,
    fontSize: Size.font_15,
    fontFamily: Fonts.BOLD,
    color: colors.BLACK,
    paddingVertical: scale(8),
  },
  icon: {
    width: scale(26),
    height: scale(22),
    marginLeft: scale(10),
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    paddingVertical: Platform.OS === 'ios' ? scale(-10) : scale(0),
    marginTop: scale(8),
    fontSize: scale(14),
    lineHeight: scale(20),
    borderRadius: scale(10),
    borderWidth: scale(0.5),
    borderColor: colors.COLOR_4,
    borderOpacity: 0.5,
    opacity: 0.6,
    backgroundColor: colors.WHITE,
  },
  picker: {
    flex: 1,
    color: 'black',
    fontFamily: Fonts.BOLD,
  },
  genderText: {
    flex: 1,
    textAlign: 'left',
   
  },
  dropdownIcon: {
    aspectRatio: 0.85,
    width: scale(25),
  },
  flexGrow: {
    flex: 1,
    textAlign: 'center',
  },
  editIcon: {
    width: scale(24),
    aspectRatio: 1,
  },
  addIcon: {
    alignSelf: 'flex-end',
    marginRight: scale(40),
    aspectRatio: 0.85,
    width: scale(18),
  },
  updateButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(40),
    paddingVertical: scale(10),
    marginTop: scale(20),
    backgroundColor: colors.PURPLE,
    borderRadius: scale(40),
    textAlign: 'center',
  },
  updateButtonText: {
    color: colors.WHITE,
    fontFamily: Fonts.BOLD,
    fontSize: Size.font_20,
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    opacity: 0.5,
    zIndex: 10,
  },
});

export default styles;
