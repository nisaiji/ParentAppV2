// import {
//   useState,
//   useEffect,
//   useRef,
//   useImperativeHandle,
//   forwardRef,
// } from 'react';
// import {View, Text, ScrollView, Image, Alert} from 'react-native';
// import {axiosClient} from '../../services/axiosClient';
// import {errorToast} from '../customToast/CustomToast';
// import moment from 'moment';
// import Calendar from '../Calendar/index';
// import {useTranslation} from 'react-i18next';
// import {styles} from './styles';
// import RedPipe from '@src/assets/images/RedPipe.png';
// import backgroundImage from '@src/assets/images/backgroundImage.png';
// import Loader from '../Loader';
// import {useDispatch, useSelector} from 'react-redux';
// import {updateMonthlyEvents} from '../../redux/dashBoardSlice';
// import {EndPoints} from '../../ParentApi';

// /**
//  * EventCalendar Component
//  *
//  * This component renders a calendar that displays events and holidays.
//  * It allows users to switch between months and automatically fetches event data
//  * from the server when necessary.
//  *
//  * Features:
//  * - Displays a calendar with event markers.
//  * - Fetches and caches event data for efficient performance.
//  * - Supports refreshing and navigating to the current month.
//  *
//  * @param {Object} props - Component properties.
//  * @param {React.Ref} ref - Forwarded reference for parent-controlled actions.
//  */
// const EventCalendar = forwardRef((props, ref) => {
//   const dispatch = useDispatch();
//   const {monthlyEvents, lastDashboardUpdatedAt} = useSelector(
//     state => state.dashboard,
//   );
//   const [selectedMonth, setSelectedMonth] = useState(moment().month());
//   const [selectedYear, setSelectedYear] = useState(moment().year());
//   const [eventLoading, setEventLoading] = useState(false);
//   const calendarRef = useRef();
//   const [t] = useTranslation();
//   /**
//    * Exposes the `onRefresh` method to the parent component via ref.
//    * This allows the parent to reset the calendar to the current month and year.
//    */
//   useImperativeHandle(ref, () => ({
//     onRefresh: () => {
//       setSelectedMonth(moment().month());
//       setSelectedYear(moment().year());
//     },
//   }));

//   /**
//    * Runs whenever `lastDashboardUpdatedAt` changes.
//    * Resets the calendar view to the current month and fetches updated events.
//    */
//   useEffect(() => {
//     calendarRef?.current?.goToCurrentMonth();
//     eventForDashboard(selectedMonth, selectedYear);
//   }, [lastDashboardUpdatedAt]);

//   /**
//    * Handles when the user changes the month in the calendar.
//    * Updates the selected month and year and fetches event data.
//    * @param {number} month - The selected month (1-12).
//    * @param {number} year - The selected year.
//    */
//   const handleMonthChange = (month, year) => {
//     setSelectedMonth(month - 1);
//     setSelectedYear(year);
//     eventForDashboard(month - 1, year);
//   };

//   /**
//    * Generates a range of months (±3 months from the selected month)
//    * and their corresponding start and end timestamps.
//    * @param {number} month - The selected month (0-based).
//    * @param {number} year - The selected year.
//    * @returns {Array} An array of month objects with start and end timestamps.
//    */
//   const generateMonthRangeWithTimestamps = (month, year) => {
//     const current = moment(`${year}-${month + 1}`, 'YYYY-MM');
//     const months = [];

//     for (let i = -3; i <= 3; i++) {
//       const monthMoment = current.clone().add(i, 'months');
//       months.push({
//         month: monthMoment.format('YYYY-MM'),
//         startTime: monthMoment.startOf('month').valueOf(),
//         endTime: monthMoment.endOf('month').valueOf(),
//       });
//     }

//     return months;
//   };

//   /**
//    * Checks if the selected month and year already exist in the cached event data.
//    * @param {number} month - The selected month (0-based).
//    * @param {number} year - The selected year.
//    * @param {Array} storedMonths - List of months available in the cache.
//    * @returns {boolean} True if the month is within the cached data, otherwise false.
//    */
//   const isMonthInRange = (month, year, storedMonths) => {
//     const currentMonthKey = moment(`${year}-${month + 1}`, 'YYYY-MM').format(
//       'YYYY-MM',
//     );
//     return storedMonths.includes(currentMonthKey);
//   };

//   /**
//    * Fetches event data for the selected month if it is not already in cache.
//    * Groups events by month and updates the Redux store.
//    * @param {number} currentMonth - The selected month (0-based).
//    * @param {number} currentYear - The selected year.
//    */
//   const eventForDashboard = async (currentMonth, currentYear) => {
//     const storedMonths = Object.keys(monthlyEvents);
//     const isWithinRange = isMonthInRange(
//       currentMonth,
//       currentYear,
//       storedMonths,
//     );

//     if (!isWithinRange) {
//       const newMonthRange = generateMonthRangeWithTimestamps(
//         currentMonth,
//         currentYear,
//       );
//       try {
//         setEventLoading(true);
//         const [response, response2] = await Promise.all([
//           axiosClient.post(EndPoints.GET_EVENT, {
//             startTime: newMonthRange[0]?.startTime,
//             endTime: newMonthRange[newMonthRange.length - 1]?.endTime,
//           }),
//           axiosClient.post(EndPoints.GET_WORKDAY, {
//             startTime: newMonthRange[0]?.startTime,
//             endTime: newMonthRange[newMonthRange.length - 1]?.endTime,
//           }),
//         ]);

//         if (
//           response?.data?.statusCode === 200 &&
//           response2?.data?.statusCode === 200
//         ) {
//           const mergedResults = [
//             ...response.data.result,
//             ...response2.data.result,
//           ];

//           const grouped = {};

//           newMonthRange.forEach(month => {
//             grouped[month.month] = [];
//           });

//           mergedResults.forEach(item => {
//             const month = moment(item.date).format('YYYY-MM');
//             if (grouped[month]) {
//               grouped[month].push(item);
//             }
//           });

//           dispatch(updateMonthlyEvents(grouped));
//         }
//       } catch (e) {
//         errorToast(e);
//       } finally {
//         setEventLoading(false);
//       }
//     }
//   };

//   return (
//     <>
//       {eventLoading && <Loader />}
//       {/* Calendar Header */}
//       <View style={styles.headerEvent}>
//         <Text style={styles.headerTitleCalendar}>
//           {t('dashboard.Calendar')}
//         </Text>
//       </View>
//       <View style={styles.calendarContainer}>
//         {/* Calendar Container */}
//         <View style={styles.calendar}>
//           <Calendar
//             selectedMonthYear={`${selectedYear}-${selectedMonth + 1}`}
//             events={
//               monthlyEvents[
//                 moment({year: selectedYear, month: selectedMonth}).format(
//                   'YYYY-MM',
//                 )
//               ] || []
//             }
//             onMonthChange={handleMonthChange}
//             ref={calendarRef}
//           />
//         </View>
//         <View style={styles.eventsContainer}>
//           <ScrollView>
//             <Text style={styles.eventsTitle}>
//               {t('dashboard.eventListHead')}
//             </Text>
//             <Text style={styles.eventDate}>
//               {moment({year: selectedYear, month: selectedMonth}).format(
//                 'MMMM YYYY',
//               )}
//             </Text>
//             <View style={styles.divider} />
//             {/* Display No Events Message or Event List */}
//             {(monthlyEvents[
//               moment(`${selectedYear}-${selectedMonth + 1}`).format('YYYY-MM')
//             ]?.length || 0) === 0 ? (
//               <View style={styles.noEventsContainer}>
//                 <Image
//                   source={backgroundImage}
//                   style={styles.backgroundImage}
//                 />
//               </View>
//             ) : (
//               monthlyEvents[
//                 moment(`${selectedYear}-${selectedMonth + 1}`).format('YYYY-MM')
//               ].map((e, i) => (
//                 <View key={i} style={styles.card}>
//                   <View style={styles.card1}>
//                     <Image style={styles.labelIcon} source={RedPipe} />
//                     <View style={styles.cardHeader}>
//                       <Text style={styles.eventDate1}>
//                         {moment(e.date).format('DD MMM YYYY')},{' '}
//                         {moment(e.date).format('dddd')}
//                       </Text>
//                       <Text style={styles.cardTitle}>{e.title}</Text>
//                       <Text style={styles.cardDescription}>
//                         {e.description}
//                       </Text>
//                     </View>
//                   </View>
//                   <View style={styles.cardContent}>
//                     <Text style={styles.labelHoliday}>
//                       {e.day === 'Sunday'
//                         ? t('dashboard.workday')
//                         : t('dashboard.holiday')}
//                     </Text>
//                   </View>
//                 </View>
//               ))
//             )}
//           </ScrollView>
//         </View>
//       </View>
//     </>
//   );
// });

// export default EventCalendar;
