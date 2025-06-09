/* eslint-disable prettier/prettier */
import React, {useRef, useState} from 'react';
import {Image, RefreshControl, ScrollView, Text, View} from 'react-native';
import styles from './styles';
import BackgroundView from '@src/components/BackgroundView';
import {useDispatch, useSelector} from 'react-redux';
import EventCache from '@src/components/eventCache/EventCache';
import {
  updateMonthlyEvents,
  updatelastEventUpdatedAt,
} from '@src/redux/eventSlice';
import Header from '@src/components/Header';

function Event() {
  const dispatch = useDispatch();
  const {currentChild} = useSelector(state => state.auth);
  const [refreshing, setRefreshing] = useState(false);
  const eventRef = useRef();

  /**
   * Handles refreshing the dashboard.
   */
  const onRefresh = () => {
    setRefreshing(true);
    if (eventRef?.current) {
      eventRef?.current?.onRefresh();
    }
    dispatch(updateMonthlyEvents({childId: null, events: {}}));
    dispatch(updatelastEventUpdatedAt());
    setRefreshing(false);
  };

  return (
    <BackgroundView>
      <View style={styles.container}>
        <Header heading="Holiday" />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.schoolNameContainer}>
            <Text style={styles.schoolNameText}>
              {currentChild?.admin?.schoolName}
            </Text>
          </View>
          <View style={styles.calendarContainer}>
            <EventCache child={currentChild} ref={eventRef} />
          </View>
        </ScrollView>
      </View>
    </BackgroundView>
  );
}

export default Event;
