import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import colors from '@src/theme/colors';
import {scale} from 'react-native-size-matters';
import styles from './styles';
import {Fonts} from '@src/theme/fonts';

const MyCalendar = forwardRef((monthlyAttendance, ref) => {
  
  const [markedDates, setMarkedDates] = useState({});

  useImperativeHandle(ref, () => ({
    refresh: () => {
      markDates();
    },
  }));

  const markDates = () => {
    if (
      monthlyAttendance.monthlyAttendance &&
      monthlyAttendance.monthlyAttendance.length > 0
    ) {
      const dates = monthlyAttendance.monthlyAttendance.reduce((acc, curr) => {
        const formattedDate = curr.date.split('T')[0];
        let backgroundColor, borderColor, textColor;
        if (curr.teacherAttendance === '' && curr.parentAttendance !== '') {
          backgroundColor = '#fff5eb';
          borderColor = 'rgba(255, 153, 51, 1)';
          textColor = 'rgba(255, 153, 51, 1)';
        } else if (curr.teacherAttendance === 'absent') {
          backgroundColor = colors.RED;
          borderColor = 'transparent';
          textColor = colors.WHITE;
        } else if (curr.teacherAttendance === 'present') {
          backgroundColor = colors.GREEN;
          borderColor = 'transparent';
          textColor = colors.WHITE;
        }
        acc[formattedDate] = {
          customStyles: {
            container: {
              backgroundColor,
              borderColor,
              borderWidth: borderColor !== 'transparent' ? 2 : 0,
              borderRadius: scale(16),
            },
            text: {
              color: textColor,
              fontSize: scale(14),
              fontFamily: Fonts.BOLD,
            },
          },
        };
        return acc;
      }, {});
      setMarkedDates(dates);
    } else {
      setMarkedDates({});
    }
  };

  useEffect(() => {
    markDates();
  }, [monthlyAttendance]);

  

  return (
    <View style={styles.container}>
      <Calendar
       
        hideArrows={true}
        hideExtraDays={true}
        disableMonthChange={true}
        disableAllTouchEventsForDisabledDays={true}
        enableSwipeMonths={false}
        dayTextColor={'red'}
        renderHeader={() => null}
        theme={{
          backgroundColor: colors.WHITE,
          calendarBackground: colors.WHITE,
          textDayHeaderFontSize: scale(12),
          'stylesheet.calendar.header': {
            week: {
              marginTop: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              fontFamily: Fonts.BOLD,
            },
          },
          'stylesheet.day.single': {
            base: {
              width: scale(32),
              height: scale(32),
              alignItems: 'center',
              justifyContent: 'center',
            },
            text: {
              fontSize: scale(20),
              fontFamily: Fonts.BOLD,
              color: colors.BLACK,
            },
          },
          // customStyles: {
          //   text: {
          //     color: 'black',
          //     fontSize: scale(14),
          //     fontFamily: Fonts.BOLD,
          //   },
          // },
        }}
        // Marked dates with custom styles
        markingType={'custom'}
        markedDates={markedDates}
      />
    </View>
  );
});

export default MyCalendar;
