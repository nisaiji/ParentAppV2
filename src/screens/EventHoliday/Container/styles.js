import {StyleSheet} from 'react-native';
import colors from '@src/theme/colors';
import {Size, Fonts} from '@src/theme/fonts';

import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  root: {flex: 1},
  container: {backgroundColor: colors.COLOR_6, flex: 1},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(10),

    marginBottom: scale(10),

    marginHorizontal: scale(10),
    paddingBottom: scale(16),
  },
  headerTitle: {
    fontSize: Size.font_20,
    color: colors.INDIGO,
    paddingLeft: scale(-10),
    marginTop: scale(-2),
    fontFamily: Fonts.BOLD,
    paddingTop: scale(6),
  },
  headerSubtitle: {
    fontSize: Size.font_20,
    fontFamily: Fonts.BOLD,
    color: colors.LIGHT_PURPLE,
    marginTop: scale(2),
    paddingLeft: scale(-10),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(10), // Added margin around the buttons
  },
  button: {
    backgroundColor: colors.LOW_PURPLE,
    // padding: scale(10),
    borderRadius: scale(20),
    width: scale(30),
    height: scale(30),
    marginHorizontal: scale(24),
    marginRight: scale(-18),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: scale(14),
  },
  buttonText: {
    color: colors.COLOR_1,
    fontSize: Size.font_18,
    textAlign: 'center',
    fontFamily: Fonts.BOLD,
  },
  buttonImage: {
    resizeMode: 'contain',
    width: scale(18),
    height: scale(20),
  },
  content: {height: '100%'},
  calendarContainer: {
    paddingTop: scale(20),
    paddingLeft: scale(2),
    paddingRight: scale(2),
    backgroundColor: colors.LIGHT_INDIGO,
    top: scale(-10),

    borderRadius: scale(30),
    margin: scale(16),
    // shadowColor: colors.BLACK,
    // shadowOpacity: 0.1,
    // shadowRadius: scale(5),
    // elevation: scale(5),
  },
  calendarHeader: {flexDirection: 'row', marginBottom: scale(10)},
  calendarMonth: {
    fontSize: Size.font_20,
    fontFamily: Fonts.BOLD,
    color: colors.BLACK1,
    paddingLeft: scale(0),
    top: scale(15),
  },
  calendarYear: {
    fontSize: scale(Size.font_20),
    fontFamily: Fonts.BOLD,
    color: colors.LIGHT_PURPLE,
  },
  calendar: {marginBottom: scale(2)},
  eventsContainer: {
    flexDirection: 'column',

    backgroundColor: colors.COLOR_6,

    maxWidth: scale(800),
    margin: scale(16),
    // shadowColor: colors.BLACK,
  },
  eventsTitle: {
    fontSize: Size.font_18,
    fontFamily: Fonts.BOLD,
    color: colors.INDIGO,
    marginBottom: scale(3),
  },
  eventDate: {
    marginTop: scale(0),
    fontFamily: Fonts.MEDIUM,
    color: colors.COLOR_4,

    fontSize: Size.font_16,
  },
  eventDate1: {
    fontFamily: Fonts.MEDIUM,
    color: colors.COLOR_4,
    bottom: scale(-5),
    fontSize: Size.font_12,
  },
  divider: {
    height: scale(1),
    marginTop: scale(14),
    backgroundColor: colors.GRAY,
    opacity: 0.2,
  },
  holidayItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    marginTop: scale(8),
    borderLeftWidth: scale(3),
    borderRadius: scale(0),
    borderColor: colors.RED,
    borderRadius: scale(10),
  },
  holidayItemHeader: {
    flexDirection: 'col',

    color: colors.RED,
  },

  holidayText: {
    color: colors.BLACK1,
    fontFamily: Fonts.BOLD,
    fontSize: Size.font_16,
    top: scale(-8),
  },
  descriptionText: {
    color: colors.BLACK1,
    fontFamily: Fonts.MEDIUM,
    fontSize: Size.font_12,
    top: scale(5),
  },
  holidayLabel: {
    justifyContent: 'center',
    top: scale(10),

    borderRadius: scale(10),
  },
  holidayLabelText: {
    color: colors.RED,
    fontFamily: Fonts.BOLD,
    fontSize: Size.font_12,
  },
  eventItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    marginTop: scale(8),
    borderLeftWidth: scale(3),
    borderRadius: scale(0),
    borderColor: colors.INDIGO,
    borderRadius: scale(10),
  },

  eventItemHeader: {
    flexDirection: 'col',

    color: colors.PURPLE,
  },

  eventText: {
    color: colors.BLACK1,
    fontFamily: Fonts.BOLD,
    fontSize: Size.font_16,
    top: scale(-8),
  },
  eventLabel: {
    justifyContent: 'center',
    top: scale(10),

    borderRadius: scale(10),
  },
  eventLabelText: {
    color: colors.PURPLE1,
    fontFamily: Fonts.BOLD,
    fontSize: Size.font_12,
  },
  descriptionEventText: {
    marginLeft: scale(0),
    color: colors.BLACK1,
    fontFamily: Fonts.MEDIUM,
    fontSize: Size.font_12,
    top: scale(5),
  },
  noEventsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(100),
    paddingBottom: scale(-100),
  },
  noEventsText: {
    fontFamily: Fonts.BOLD,
    fontSize: Size.font_16,
    color: colors.GRAYISH_WHITE,
  },
  card: {
    paddingBottom: scale(4),
    marginVertical: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card1: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardHeader: {
    marginBottom: 16,
    left: scale(10),
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: scale(3),
    top: scale(6),
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    top: scale(5),
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    top: scale(12),
  },
  holidayIcon: {
    width: 24,
    height: 24,
    tintColor: '#FF6347', // Customize color for holiday icon
  },
  eventIcon: {
    width: 24,
    height: 24,
    tintColor: '#4682B4', // Customize color for event icon
  },
  holidayEventIcon: {
    width: 24,
    height: 24,
    tintColor: '#32CD32', // Customize color for holiday event icon
  },
  holidayText: {
    fontSize: 14,
    color: '#FF6347',
  },
  eventText: {
    fontSize: 14,
    color: '#4682B4',
  },
  holidayEventText: {
    fontSize: 14,
    color: '#32CD32',
  },
  labelIcon: {
    height: scale(60),
    resizeMode: 'contain',
    width: scale(6),
  },
  labelEvent: {
    color: colors.PURPLE,
    marginTop: scale(10),
    fontFamily: Fonts.BOLD,
    fontSize:Size.font_13
  },
  labelHoliday: {
    color: colors.RED,
    marginTop: scale(3),
    fontFamily: Fonts.BOLD,
    fontSize:Size.font_13
  },
  row: {
    flexDirection: 'row',
    display: 'flex',
  },
  backgroundImage: {
    resizeMode: 'contain',
    width: scale(300),
    height: scale(300),
    top: scale(-130),
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
