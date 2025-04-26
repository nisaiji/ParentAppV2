import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {View, Text, Image, Alert} from 'react-native';
import {Calendar} from 'react-native-calendars';
import colors from '@src/theme/colors';
import {scale} from 'react-native-size-matters';
import styles from './styles';
import moment from 'moment';
import rightArrow from '@src/assets/images/rightArrow.png';
import leftArrow from '@src/assets/images/leftArrow.png';
import {Fonts} from '@src/theme/fonts';

/**
 * `MyCalendar` is a customizable calendar component that displays events and highlights the current date.
 * It allows navigation between months and provides a reference for external control.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.events - List of events with dates to be marked on the calendar.
 * @param {Function} props.onMonthChange - Callback function triggered when the month changes.
 * @param {React.Ref} ref - A reference to expose functions for external control.
 */
const MyCalendar = forwardRef((props, ref) => {
  const {events, onMonthChange} = props;
  const [markedDates, setMarkedDates] = useState({});
  const [currentMonth, setCurrentMonth] = useState(
    moment().format('MMMM YYYY'),
  );
  const [calendarKey, setCalendarKey] = useState(0);

  // Allow parent components to trigger 'refresh' and 'goToCurrentMonth' methods via ref
  useImperativeHandle(ref, () => ({
    /**
     * Refreshes the marked dates on the calendar.
     */
    refresh: () => {
      markEvents(); // Re-mark the events
    },
    /**
     * Resets the calendar to the current month and refreshes the display.
     */
    goToCurrentMonth: () => {
      const today = moment();
      setCurrentMonth(today.format('MMMM YYYY'));
      setCalendarKey(prevKey => prevKey + 1); // Force calendar re-render by updating the key
    },
  }));

  /**
   * Marks event dates and highlights the current date on the calendar.
   * @param {Array} eventList - The list of events to mark.
   */
  const markEvents = eventList => {
    const dates = {};
    const today = moment().format('YYYY-MM-DD');

    // Iterate over events and assign dots for holidays and events
    events?.forEach(curr => {
      const formattedDate = moment(curr.date).format('YYYY-MM-DD');
      dates[formattedDate] = {
        customStyles: {
          container: {
            backgroundColor: 'transparent',
            borderColor:
              curr?.teacherAttendance === 'present'
                ? colors.GREEN
                : curr?.teacherAttendance === 'absent'
                ? colors.RED
                : '',
            borderWidth: 2,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          },
          text: {
            color:
              curr?.teacherAttendance === 'present'
                ? colors.GREEN
                : curr?.teacherAttendance === 'absent'
                ? colors.RED
                : '',
            fontFamily: Fonts.REGULAR,
          },
        },
      };
    });

    // Mark the current date with custom styles
    if (today) {
      dates[today] = {
        ...dates[today],
        customStyles: {
          container: {
            borderColor: colors.BLUE,
            borderWidth: 2,
            borderRadius: 20,
          },
          text: {
            color: colors.BLUE,
            fontFamily: Fonts.REGULAR,
          },
        },
      };
    }

    setMarkedDates(dates);
  };

  useEffect(() => {
    markEvents(events);
  }, [events]);

  /**
   * Handles the month change event triggered by the calendar.
   * @param {Object} month - The new month object containing date information.
   */
  const handleMonthChange = month => {
    const newMonth = moment(month.dateString).format('MMMM YYYY');
    if (!isDateInRange(newMonth)) {
      Alert.alert('Notice', 'You cannot swipe beyond February 2025.');
      return;
    }
    setCurrentMonth(newMonth);
    onMonthChange(
      moment(month.dateString).month() + 1,
      moment(month.dateString).year(),
    );
  };

  /**
   * Renders the calendar header displaying the current month.
   * @returns {JSX.Element} The header component.
   */
  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{currentMonth}</Text>
    </View>
  );

  /**
   * Renders custom arrow icons for navigating months.
   * @param {string} direction - The direction of the arrow ("left" or "right").
   * @returns {JSX.Element} The arrow component.
   */
  const renderArrow = direction => (
    <Image
      source={direction === 'left' ? leftArrow : rightArrow}
      style={styles.arrow}
      resizeMode="contain"
    />
  );

  /**
   * Checks if a given date is within the specified range.
   *
   * @param {string} dateToCheck - The date to check (in 'YYYY-MM-DD' format).
   * @param {string} startDate - The start date of the range (in 'YYYY-MM-DD' format).
   * @param {string} endDate - The end date of the range (in 'YYYY-MM-DD' format).
   * @returns {boolean} - Returns true if the date is within the range, otherwise false.
   */
  function isDateInRange(newMonth) {
    const current = moment(`01 ${newMonth}`, 'DD MMM YYYY');
    const start = moment(`01-04-${moment().format('YYYY')}`, 'DD-MM-YYYY')
      .subtract(1, 'year')
      .format('YYYY-MM-DD');
    const end = moment(`01-03-${moment().format('YYYY')}`, 'DD-MM-YYYY')
      .add(1, 'year')
      .format('YYYY-MM-DD');

    // Check if the date is within the range (inclusive)
    return current.isBetween(start, end, 'day', '[]');
  }

  return (
    <View style={styles.container}>
      <Calendar
        key={calendarKey}
        onMonthChange={handleMonthChange}
        hideArrows={false}
        hideExtraDays={true}
        disableMonthChange={false}
        disableAllTouchEventsForDisabledDays={false}
        enableSwipeMonths={true}
        renderHeader={renderHeader}
        renderArrow={renderArrow}
        dayComponent={({date, state}) => {
          const isSunday = moment(date?.dateString).day() === 0;
          const marked = markedDates?.[date?.dateString]?.customStyles;

          return (
            <View
              style={[
                {
                  width: scale(30),
                  height: scale(30),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                },
                marked?.container,
              ]}>
              <Text
                style={[
                  {
                    fontFamily: Fonts.REGULAR,
                    color: isSunday ? 'yellow' : colors.WHITE,
                  },
                  marked?.text,
                ]}>
                {date.day}
              </Text>
            </View>
          );
        }}
        theme={{
          calendarBackground: colors.calendarBackground,
          dayTextColor: 'white',
          textSectionTitleColor: 'white',
          selectedDayTextColor: 'white',
          arrowColor: 'white',
          textDayHeaderFontSize: scale(12),
          textDayFontSize: scale(12),
          textDayFontFamily: Fonts.MEDIUM,
          'stylesheet.day.single': {
            base: {
              width: scale(32),
              height: scale(50),
              alignItems: 'center',
              justifyContent: 'center',
            },
            text: {
              fontSize: scale(20),
              fontFamily: Fonts.MEDIUM,
              color: colors.WHITE,
            },
          },
        }}
        markingType={'custom'}
        markedDates={markedDates}
      />
    </View>
  );
});

export default MyCalendar;
