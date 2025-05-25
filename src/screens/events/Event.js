/* eslint-disable prettier/prettier */
import React, {useRef, useState} from 'react';
import {Image, RefreshControl, ScrollView, Text, View} from 'react-native';
import styles from './styles';
import BackgroundView from '@src/components/BackgroundView';
import childDummy from '@src/assets/images/childDummy.png';
import {useDispatch, useSelector} from 'react-redux';
import EventCache from '@src/components/eventCache/EventCache';
import {
  updateMonthlyEvents,
  updatelastEventUpdatedAt,
} from '@src/redux/eventSlice';

function Event() {
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.auth);
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
        <View style={styles.flexRow}>
          <View>
            <Text style={styles.title1}>Hello,</Text>
            <Text style={styles.title2}>{data?.fullname}</Text>
          </View>
          <Image
            source={
              data?.photo
                ? {uri: `data:image/jpeg;base64,${data?.photo}`}
                : childDummy
            }
            style={styles.childImg}
            resizeMode="contain"
          />
        </View>
        <View style={styles.line} />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {/* Calendar & Events */}
          {data?.students?.map((child, index) => (
            <View key={index} style={styles.calendarContainer}>
              <EventCache child={child}  ref={eventRef} />
            </View>
          ))}
        </ScrollView>
      </View>
    </BackgroundView>
  );
}

export default Event;
