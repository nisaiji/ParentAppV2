/* eslint-disable prettier/prettier */
import React, {useRef} from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles';
import BackgroundView from '../../../components/BackgroundView';
import EventCalendar from '../../../components/cache/EventCache';
import MyCalendar from '../../../components/calendar/Calendar';
import childDummy from '../../../assets/images/childDummy.png';

function Dashboard() {
  const eventRef = useRef();
  return (
    <BackgroundView>
      <View style={styles.container}>
        <View style={styles.flexRow}>
          <View>
            <Text style={styles.title1}>Hello,</Text>
            <Text style={styles.title2}>Pooja sharma</Text>
          </View>
          <Image
            source={childDummy}
            style={styles.childImg}
            resizeMode="contain"
          />
        </View>
        <View style={styles.line} />
        {/* Calendar & Events */}
        {/* <EventCalendar ref={eventRef} /> */}

        <View style={styles.calendarContainer}>
          <View style={styles.flexRow}>
            <View style={styles.flexRow}>
              <Image
                source={childDummy}
                style={styles.childImg}
                resizeMode="contain"
              />
              <Text style={styles.title3}>Pooja sharma</Text>
            </View>
            <View style={styles.classContainer}>
              <Text style={styles.classSec}>11th - C</Text>
            </View>
          </View>
          <MyCalendar />
        </View>
      </View>
    </BackgroundView>
  );
}

export default Dashboard;
