import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {Size, Colors, Fonts} from '@src/theme/fonts';
import colors from '@src/theme/colors';

export const styles = StyleSheet.create({
  headerEvent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: scale(16),
    borderBottomWidth: scale(0.25),
    marginBottom: scale(20),
    borderBottomColor: Colors.Light_Purple2,
    paddingBottom: scale(16),
  },
  headerTitleCalendar: {
    fontSize: Size.font_18,
    color: Colors.DARK_PURPLE,
    marginTop: scale(-2),
    fontFamily: Fonts.BOLD,
    paddingTop: scale(6),
  },
  calendarContainer: {
    paddingLeft: scale(2),
    paddingRight: scale(2),
  },
  calendar: {marginBottom: scale(2)},
  eventsContainer: {
    flexDirection: 'column',
    backgroundColor: colors.COLOR_6,
    maxWidth: scale(800),
    padding: scale(16),
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
    color: colors.GRAY50,
    fontSize: Size.font_16,
  },
  divider: {
    height: scale(1),
    marginVertical: scale(10),
    borderBottomColor: colors.Light_Purple2,
    borderBottomWidth: scale(0.25),
  },
  noEventsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    resizeMode: 'contain',
    width: scale(300),
    height: scale(300),
  },
  card: {
    marginVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card1: {
    display: 'flex',
    flexDirection: 'row',
  },
  labelIcon: {
    height: scale(60),
    resizeMode: 'cover',
    width: scale(6),
  },
  cardHeader: {
    left: scale(10),
  },
  eventDate1: {
    fontFamily: Fonts.MEDIUM,
    color: colors.GRAY50,
    fontSize: Size.font_12,
  },
  cardTitle: {
    fontSize: 18,
    color: '#333',
    fontFamily: Fonts.BOLD,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    fontFamily: Fonts.MEDIUM,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelHoliday: {
    color: colors.RED,
    marginTop: scale(3),
    fontFamily: Fonts.BOLD,
    fontSize: Size.font_13,
  },
});
