import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  RefreshControl,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ROUTE} from '@src/navigation/constant';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Calendar from '@src/screens/EventHoliday/Components/Calendar';
import styles from './styles';
import {axiosClient} from '@src/services/axiosClient';
import Loader from '../../../components/Loader';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import search from '../../../assets/images/search.png';
import RedPipe from '../../../assets/images/RedPipe.png';
import PurplePipe from '../../../assets/images/PurplePipe.png';
import mixedPipe from '../../../assets/images/mixedPipe.png';
import backgroundImage from '../../../assets/images/backgroundImage.png';

const Eventholiday = () => {
  const [eventsArr, setEventsArr] = useState([]);
  const {t} = useTranslation();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const calendarRef = useRef(null); 

  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const day = currentDate.getDate();
  const dayName = dayNames[currentDate.getDay()];
  const month = moment(currentDate).format('MMM');
  const year = currentDate.getFullYear();

  const handleOutsidePress = () => {
    if (isSidebarVisible) {
      setIsSidebarVisible(false);
    }
  };

  const fetchEvents = async (month, year) => {
    try {
      setLoading(true);
      const response = await axiosClient.post('/parent/holiday-events', {
        month,
        year,
      });
      // console.log('aaj ka event', response.data);
      if (response?.data?.statusCode === 200) {
        const sortedEvents = response.data.result.sort(
          (a, b) => new Date(a.date) - new Date(b.date),
        );
        setEventsArr(sortedEvents);
        calendarRef.current?.refresh();
      }
    } catch (error) {
      // console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchEvents(selectedMonth, selectedYear);
    }
  }, [isFocused, selectedMonth]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchEvents();
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const onMonthChange = (month, year) => {
    setSelectedMonth(month - 1);
    setSelectedYear(year);
  };

  const goToCurrentMonth = () => {
    const currentMonth = currentDate.getMonth() + 1; 
    const currentYear = currentDate.getFullYear(); 
    setSelectedMonth(currentMonth - 1); 
    setSelectedYear(currentYear); 
    calendarRef.current?.goToCurrentMonth(); 
  };

  const renderOccasionLabel = (isHoliday, isEvent) => { 
    if (isHoliday && isEvent) { 
      return (
        <Text>
          <Text style={styles.labelHoliday}>{t('event.Holiday')}, </Text>
          <Text style={styles.labelEvent}>{t('event.events')}</Text>
        </Text>
      );
    } else if (isHoliday) {
      return <Text style={styles.labelHoliday}>{t('event.Holiday')}</Text>;
    } else {
      return <Text style={styles.labelEvent}>{t('event.events')}</Text>;
    }
  };

  const renderOccasionIcon = (isHoliday, isEvent) => {
    if (isHoliday && isEvent) {
      return <Image style={styles.labelIcon} source={mixedPipe} />;
    } else if (isHoliday) {
      return <Image style={styles.labelIcon} source={RedPipe} />;
    } else {
      return <Image style={styles.labelIcon} source={PurplePipe} />;
    }
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      {loading && (
        <View style={styles.loading}>
          <Loader />
        </View>
      )}
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.calendarMonth}>
            {day} {month}, {year}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={goToCurrentMonth}>
              <Text style={styles.buttonText}>{day}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={styles.content}>
              <View style={styles.calendar}>
                <Calendar
                  ref={calendarRef}
                  event={eventsArr}
                  onMonthChange={onMonthChange}
                />
              </View>

              {/* Holidays and Events Section */}
              <View style={styles.eventsContainer}>
                <ScrollView>
                  <Text style={styles.eventsTitle}>
                    {t('event.eventListHead')}
                  </Text>
                  <Text style={styles.eventDate}>
                    {month} {year}
                  </Text>
                  <View style={styles.divider} />

                  {eventsArr.length === 0 ? (
                    <View style={styles.noEventsContainer}>
                      <Image
                        source={backgroundImage}
                        style={styles.backgroundImage}></Image>
                    </View>
                  ) : (
                    eventsArr.map((e, i) => {
                      return (
                        <View key={i} style={styles.card}>
                          <View style={styles.card1}>
                            {renderOccasionIcon(e.holiday, e.event)}
                            <View style={styles.cardHeader}>
                              <Text style={styles.eventDate1}>
                                {moment(e.date).format('DD MMM YYYY')},{' '}
                                {moment(e.date).format('dddd')}
                              </Text>
                              <Text style={styles.cardTitle}>{e.title}</Text>
                              <Text style={styles.cardDescription}>
                                {e.description}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.cardContent}>
                            {renderOccasionLabel(e.holiday, e.event)}
                          </View>
                        </View>
                      );
                    })
                  )}
                </ScrollView>
              </View>

              {/* End of Holidays and Events Section */}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
    </GestureHandlerRootView>
  );
};

export default Eventholiday;
