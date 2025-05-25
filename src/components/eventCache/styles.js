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
    padding: scale(12),
    borderRadius: 14,
    backgroundColor: Colors.calenderBackground,
  },
  calendar: {marginBottom: scale(2)},
  eventsContainer: {
    flexDirection: 'column',
    backgroundColor: colors.BLACK3,
    maxWidth: scale(800),
    paddingVertical: scale(16),
    paddingHorizontal: scale(5),
  },
  eventsTitle: {
    fontSize: Size.font_18,
    fontFamily: Fonts.BOLD,
    color: colors.WHITE,
    marginBottom: scale(3),
  },
  eventDate: {
    marginTop: scale(0),
    fontFamily: Fonts.BOLD,
    color: colors.GRAY50,
    fontSize: Size.font_16,
  },
  divider: {
    height: scale(1),
    marginVertical: scale(10),
    borderBottomColor: colors.WHITE,
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
    backgroundColor: colors.calenderBackground,
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    borderRadius: 10,
  },
  card1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelIcon: {
    height: scale(60),
    resizeMode: 'stretch',
    width: scale(6),
  },
  cardHeader: {
    left: scale(10),
  },
  eventDate1: {
    fontFamily: Fonts.BOLD,
    color: colors.GRAY50,
    fontSize: Size.font_12,
  },
  cardTitle: {
    fontSize: Size.font_14,
    color: colors.WHITE,
    fontFamily: Fonts.BOLD,
  },
  cardDescription: {
    fontSize: Size.font_12,
    color: colors.WHITE,
    fontFamily: Fonts.BOLD,
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
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title3: {
    fontFamily: Fonts.BOLD,
    fontSize: Size.font_18,
    color: Colors.WHITE,
  },
  childImg: {
    width: scale(40),
    height: scale(40),
    marginRight: scale(5),
    borderRadius: 100,
  },
  classContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.BLUE15,
    borderRadius: scale(8),
    padding: scale(7),
  },
  classSec: {
    fontSize: Size.font_14,
    fontFamily: Fonts.BOLD,
    color: colors.BLUE,
  },
});
