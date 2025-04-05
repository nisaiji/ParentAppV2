import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { axiosClient } from '@src/services/axiosClient';
import moment from 'moment';
import search from '../../../../assets/images/search.png';
import RedPipe from '../../../../assets/images/RedPipe.png';
import PurplePipe from '../../../../assets/images/PurplePipe.png';
import mixedPipe from '../../../../assets/images/mixedPipe.png';
import styles from '../../Container/styles';

const EventSearch = ({ navigation }) => {
  const [searchMonth, setSearchMonth] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [eventsArr, setEventsArr] = useState([]);

  const renderOccasionIcon = (isHoliday, isEvent) => {
    if (isHoliday && isEvent) {
      return <Image style={styles.labelIcon} source={mixedPipe} />;
    } else if (isHoliday) {
      return <Image style={styles.labelIcon} source={RedPipe} />;
    } else {
      return <Image style={styles.labelIcon} source={PurplePipe} />;
    }
  };
  const renderOccasionLabel = (isHoliday, isEvent) => {
    if (isHoliday && isEvent) {
      return (
        <Text>
          <Text style={styles.labelHoliday}>Holiday, </Text>
          <Text style={styles.labelEvent}>Event</Text>
        </Text>
      );
    } else if (isHoliday) {
      return <Text style={styles.labelHoliday}>Holiday</Text>;
    } else {
      return <Text style={styles.labelEvent}>Event</Text>;
    }
  };


  const handleSearch = async () => {
    try {
      const month = parseInt(searchMonth, 10) - 1; // Adjust for zero-based month index
      const year = parseInt(searchYear, 10);

      if (isNaN(month) || isNaN(year)) {
        alert('Please enter a valid month and year');
        return;
      }

      const response = await axiosClient.post('/parent/holiday-events', {
        month,
        year,
      });

      if (response?.data?.statusCode === 200) {
        const sortedEvents = response.data.result.sort(
          (a, b) => new Date(a.date) - new Date(b.date),
        );
        setEventsArr(sortedEvents);
      }
    } catch (error) {
      // console.error('Error fetching events:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="MM"
          value={searchMonth}
          onChangeText={setSearchMonth}
          maxLength={2}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.searchInput}
          placeholder="YYYY"
          value={searchYear}
          onChangeText={setSearchYear}
          maxLength={4}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Image source={search} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {eventsArr.map((event, index) => (
          <View key={index} style={styles.card}>
          <View style={styles.card1}>
            {renderOccasionIcon(event.holiday, event.event)}
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{event.title}</Text>
              <Text style={styles.cardDescription}>
                {event.description}
              </Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            {renderOccasionLabel(event.holiday, event.event)}
          </View>
        </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default EventSearch;

