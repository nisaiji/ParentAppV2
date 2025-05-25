import {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {View} from 'react-native';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {styles} from './styles';
import Loader from '../Loader';
import {useDispatch, useSelector} from 'react-redux';
import {EndPoints} from '@src/ParentApi';
import {errorToast} from '../CustomToast';
import {axiosClient} from '@src/services/axiosClient';
import AttendanceCalendar from './calendar/AttendanceCalendar';
import { updateMonthlyAttendance } from '@src/redux/dashBoardSlice';

/**
 * AttendanceCache Component
 *
 * This component renders a calendar that displays attendance.
 * It allows users to switch between months and automatically fetches event data
 * from the server when necessary.
 *
 * Features:
 * - Displays a calendar with event markers.
 * - Fetches and caches event data for efficient performance.
 * - Supports refreshing and navigating to the current month.
 *
 * @param {Object} props - Component properties.
 * @param {React.Ref} ref - Forwarded reference for parent-controlled actions.
 */
const AttendanceCache = forwardRef((props, ref) => {
  const {childId} = props;
  const dispatch = useDispatch();
  const {monthlyAttendance, lastDashboardUpdatedAt} = useSelector(
    state => state.dashboard,
  );
  const [selectedMonth, setSelectedMonth] = useState(moment().month());
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [eventLoading, setEventLoading] = useState(false);
  const calendarRef = useRef();
  const [t] = useTranslation();
  /**
   * Exposes the `onRefresh` method to the parent component via ref.
   * This allows the parent to reset the calendar to the current month and year.
   */
  useImperativeHandle(ref, () => ({
    onRefresh: () => {
      setSelectedMonth(moment().month());
      setSelectedYear(moment().year());
    },
  }));

  /**
   * Runs whenever `lastDashboardUpdatedAt` changes.
   * Resets the calendar view to the current month and fetches updated attendance.
   */
  useEffect(() => {
    if (childId) {
      calendarRef?.current?.goToCurrentMonth();
      eventForDashboard(selectedMonth, selectedYear);
    }
  }, [lastDashboardUpdatedAt, childId]);

  /**
   * Handles when the user changes the month in the calendar.
   * Updates the selected month and year and fetches event data.
   * @param {number} month - The selected month (1-12).
   * @param {number} year - The selected year.
   */
  const handleMonthChange = (month, year) => {
    setSelectedMonth(month - 1);
    setSelectedYear(year);
    eventForDashboard(month - 1, year);
  };

  /**
   * Generates a range of months (±3 months from the selected month)
   * and their corresponding start and end timestamps.
   * @param {number} month - The selected month (0-based).
   * @param {number} year - The selected year.
   * @returns {Array} An array of month objects with start and end timestamps.
   */
  const generateMonthRangeWithTimestamps = (month, year) => {
    const current = moment(`${year}-${month + 1}`, 'YYYY-MM');
    const months = [];

    for (let i = -3; i <= 3; i++) {
      const monthMoment = current.clone().add(i, 'months');
      months.push({
        month: monthMoment.format('YYYY-MM'),
        startTime: monthMoment.startOf('month').valueOf(),
        endTime: monthMoment.endOf('month').valueOf(),
      });
    }

    return months;
  };

  /**
   * Checks if the selected month and year already exist in the cached event data.
   * @param {number} month - The selected month (0-based).
   * @param {number} year - The selected year.
   * @param {Array} storedMonths - List of months available in the cache.
   * @returns {boolean} True if the month is within the cached data, otherwise false.
   */
  const isMonthInRange = (month, year, storedMonths) => {
    const currentMonthKey = moment(`${year}-${month + 1}`, 'YYYY-MM').format(
      'YYYY-MM',
    );
    return storedMonths.includes(currentMonthKey);
  };

  /**
   * Fetches event data for the selected month if it is not already in cache.
   * Groups attendance by month and updates the Redux store.
   * @param {number} currentMonth - The selected month (0-based).
   * @param {number} currentYear - The selected year.
   */
  const eventForDashboard = async (currentMonth, currentYear) => {
    const childAttendance = monthlyAttendance[childId] || {};

    const storedMonths = Object.keys(childAttendance);
    const isWithinRange = isMonthInRange(
      currentMonth,
      currentYear,
      storedMonths,
    );

    if (!isWithinRange) {
      const newMonthRange = generateMonthRangeWithTimestamps(
        currentMonth,
        currentYear,
      );
      try {
        if (childId) {
          setEventLoading(true);
          // console.log('api call', childId);

          const response = await axiosClient.post(EndPoints.GET_ATTENDANCE, {
            startTime: newMonthRange[0]?.startTime,
            endTime: newMonthRange[newMonthRange.length - 1]?.endTime,
            studentId: childId,
          });

          if (response?.data?.statusCode === 200) {
            const grouped = {};

            newMonthRange.forEach(month => {
              grouped[month.month] = [];
            });

            response?.data?.result?.attendances[0]?.attendances.forEach(
              item => {
                const month = moment(item.date).format('YYYY-MM');
                if (grouped[month]) {
                  grouped[month].push(item);
                }
              },
            );

            dispatch(
              updateMonthlyAttendance({
                childId: childId,
                attendance: grouped,
              }),
            );
          }
        }
      } catch (e) {
        errorToast(e);
        // console.log({e});
      } finally {
        setEventLoading(false);
      }
    }
  };

  return (
    <>
      {eventLoading && <Loader />}
      <View style={styles.calendarContainer}>
        {/* Calendar Container */}
        <View style={styles.calendar}>
          <AttendanceCalendar
            selectedMonthYear={`${selectedYear}-${selectedMonth + 1}`}
            events={
              monthlyAttendance?.[childId]?.[
                moment({year: selectedYear, month: selectedMonth}).format(
                  'YYYY-MM',
                )
              ] || []
            }
            onMonthChange={handleMonthChange}
            ref={calendarRef}
          />
        </View>
      </View>
    </>
  );
});

export default AttendanceCache;
