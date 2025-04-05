import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import { View, Text, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import colors from '@src/theme/colors';
import { scale } from 'react-native-size-matters';
import styles from './styles';
import moment from 'moment';
import rightArrow from '@src/assets/images/rightArrow.png';
import leftArrow from '@src/assets/images/leftArrow.png';

const MyCalendar = forwardRef((props, ref) => {
  const { event, onMonthChange } = props;
  const [markedDates, setMarkedDates] = useState({});
  const [currentMonth, setCurrentMonth] = useState(moment().format('MMMM YYYY'));
  const [calendarKey, setCalendarKey] = useState(0); // New key state
  const currentDateString = moment().format('YYYY-MM-DD');
  const calendarRef = useRef(null);

  useImperativeHandle(ref, () => ({
    refresh: () => {
      markEvents();
    },
    goToCurrentMonth: () => {
      const today = moment();
      setCurrentMonth(today.format('MMMM YYYY'));
      setCalendarKey(prevKey => prevKey + 1); // Change the key to force re-render
    },
  }));

  const markEvents = () => {
    const dates = {};
  
    event.forEach((curr) => {
      const formattedDate = moment(curr.date).format('YYYY-MM-DD');
      dates[formattedDate] = {
        dots: curr.holiday && curr.event
          ? [
              { key: 'holiday', color: colors.RED, fontSize: scale(6) },
              { key: 'event', color: colors.PURPLE1, fontSize: scale(6) },
            ]
          : curr.holiday
          ? [{ key: 'holiday', color: colors.RED, fontSize: scale(6) }]
          : [{ key: 'event', color: colors.PURPLE1, fontSize: scale(6) }],
      };
    });

    dates[currentDateString] = {
      ...(dates[currentDateString] || {}),
      customStyles: {
        container: {
          ...styles.currentDayContainer,
          backgroundColor: colors.PURPLE, 
          borderRadius: scale(16), 
         
           
        },
        text: {
          ...styles.currentDayText,
          color: colors.WHITE, 
          fontWeight: 'bold',
        },
      },
    };
  
    setMarkedDates(dates);
  };
  

  useEffect(() => {
    markEvents();
  }, [event]);

  const handleMonthChange = (month) => {
    const newMonth = moment(month.dateString).month() + 1;
    const newYear = moment(month.dateString).year();
    setCurrentMonth(moment(month.dateString).format('MMMM YYYY'));
    onMonthChange(newMonth, newYear);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{currentMonth}</Text>
    </View>
  );

  const renderArrow = (direction) => (
    <Image
      source={direction === 'left' ? leftArrow : rightArrow}
      style={styles.arrow}
    />
  );

  return (
    <View style={styles.container}>
      <Calendar
        key={calendarKey} // Key prop to force re-rendering
        ref={calendarRef}
        onMonthChange={handleMonthChange}
        hideArrows={false}
        hideExtraDays={true}
        disableMonthChange={false}
        disableAllTouchEventsForDisabledDays={false}
        enableSwipeMonths={true}
        renderHeader={renderHeader}
        renderArrow={renderArrow}
        theme={{
          calendarBackground: colors.COLOR_6,
          textDayHeaderFontSize: scale(12),
          'stylesheet.day.single': {
            base: {
              width: scale(32),
              height: scale(50),
              alignItems: 'center',
              justifyContent: 'center',
            },
            text: {
              fontSize: scale(20),
              fontFamily: 'monospace',
              color: colors.BLACK,
            },
          },
        }}
        markingType={'multi-dot'}
        markedDates={markedDates}
      />
    </View>
  );
});

export default MyCalendar;
