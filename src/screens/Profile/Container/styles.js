import {StyleSheet} from 'react-native';
import colors from '@src/theme/colors';
import {Size, Weight, Colors, Fonts} from '@src/theme/fonts';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  image: {
    position: 'relative',
    flex: 0.5,
  },
  header: {
    marginBottom: scale(12),
    marginTop: scale(20),
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    padding: scale(10),
    paddingRight: scale(20),
    left: scale(26),
  },
  selectedStudent: {
    color: colors.WHITE,
    fontSize: Size.font_18,
    paddingRight: scale(10),
    fontFamily: Fonts.BOLD,
  },
  downarrowImage: {
    width: 20,
    height: 20,
    marginLeft: scale(10), // Added marginLeft to separate text and image
  },
  Editpicicon: {
    height: 20,
    width: 20,
    marginLeft: scale(1),
    top: scale(2),
    left: scale(1),
  },
  profile: {
    alignItems: 'center',
    marginTop: scale(40),
    width: '100%',
    zIndex: 2,
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  profileAvatar: {
    width: scale(120),
    height: scale(120),
    borderRadius: scale(100),
  },
  profileName: {
    fontSize: Size.font_24,
    fontFamily: Fonts.BOLD,
    color: Colors.BLACK,
    marginTop: scale(8),
  },

  scrollViewContent: {
    position: 'absolute',
    top: scale(80),
    width: '100%',
  },
  section: {
    paddingVertical: scale(10),
  },

  sectionBody: {
    paddingLeft: scale(20),
    backgroundColor: colors.WHITE,
    borderTopWidth: scale(1),
    borderBottomWidth: scale(1),
    borderColor: colors.WHITE,
    borderRadius: scale(20),
    marginLeft: scale(15),
    marginRight: scale(15),
    shadowOffset: {width: 0, height: scale(5)},
    shadowOpacity: 0.2,
    shadowRadius: scale(0),
    elevation: 3,
    marginBottom: scale(5),
  },
  Icon: {
    height: scale(20),
    width: scale(20),
    left: scale(-7),
    opacity: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: scale(16),
    height: scale(40),
  },
  rowWrapper: {
    borderTopWidth: scale(1),
    borderColor: colors.WHITE,
  },
  rowFirst: {
    borderTopWidth: 0,
  },
  textWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rowIcon: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(4),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(10),
  },
  buttonIcon: {
    width: scale(10),
    height: scale(10),
    // left: scale(142),
  },
  buttonIcon1: {
    width: scale(10),
    height: scale(10),
    // left: scale(90),
  },
  rowLabel: {
    fontSize: Size.font_14,
    fontFamily: Fonts.MEDIUM,
    color: colors.BLACK,
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: Size.font_14,
    fontFamily: Fonts.MEDIUM,
    color: colors.PURPLE,
    marginRight: scale(4),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Align items to the bottom
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    padding: scale(20),
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
    elevation: 5,
  },
  modalTitle: {
    fontSize: scale(20),
    fontFamily: Fonts.BOLD,
    marginBottom: scale(10),
    textAlign: 'center',
    color: colors.BLACK,
  },
  languageOption: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(20),
  },
  childOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  languageText: {
    fontSize: Size.font_16,
    color: colors.BLACK,
    fontFamily: Fonts.BOLD,
    marginVertical: 5,
  },
  editPicIcon: {
    height: 20,
    width: 20,
    marginLeft: scale(1),
    top: scale(2),
    left: scale(1),
  },
  tickIcon: {
    width: scale(20),
    height: scale(20),
  },
  editPicButton: {
    backgroundColor: colors.LIGHT_PURPLE,
    borderRadius: 20,
    height: 30,
    width: 30,
    borderWidth: 2,
    borderColor: colors.WHITE,
    position: 'absolute',
    bottom: 3,
    right: 8,
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: scale(18),
    paddingVertical: scale(8),
    paddingHorizontal: scale(10),
    borderWidth: scale(1),
    borderColor: colors.LIGHT_GRAY,
    borderRadius: scale(4),
    color: colors.WHITE,
    paddingRight: scale(30), // Ensure the text is never behind the icon
    width: scale(200), // Adjust the width of the picker
  },

  inputAndroid: {
    fontSize: scale(18),
    paddingHorizontal: scale(10),
    paddingVertical: scale(8),
    borderWidth: scale(0.5),
    borderRadius: scale(8),
    color: colors.WHITE,
    paddingRight: scale(15), // Ensure the text is never behind the icon
    width: scale(150), // Adjust the width of the picker
  },
  iconContainer: {
    top: scale(12),
    right: scale(12),
  },
});

export default styles;
