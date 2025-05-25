import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import styles from './styles';
import BackgroundView from '@src/components/BackgroundView';
import childDummy from '@src/assets/images/childDummy.png';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAndSetData} from '@src/redux/authSlice';
import {
  updatelastDashboardUpdatedAt,
} from '@src/redux/dashBoardSlice';
import AttendanceCache from '@src/components/attendanceCache/AttendanceCache';
import { updateMonthlyAttendance } from '../../../redux/dashBoardSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.auth);
  const [refreshing, setRefreshing] = useState(false);
  const eventRef = useRef();

  useEffect(() => {
    dispatch(fetchAndSetData());
  }, []);

  /**
   * Handles refreshing the dashboard.
   */
  const onRefresh = () => {
    setRefreshing(true);

    if (eventRef?.current) {
      eventRef?.current?.onRefresh();
    }

    dispatch(fetchAndSetData());
    dispatch(updateMonthlyAttendance({childId: null, attendance: {}}));
    dispatch(updatelastDashboardUpdatedAt());

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
          {/* Calendar & attendance */}
          {data?.students?.map((child, index) => (
            <View key={index} style={styles.calendarContainer}>
              <View style={styles.flexRow}>
                <View style={styles.flexRow}>
                  <Image
                    source={
                      child?.photo
                        ? {uri: `data:image/jpeg;base64,${child?.photo}`}
                        : childDummy
                    }
                    style={styles.childImg}
                    resizeMode="contain"
                  />
                  <Text style={styles.title3}>
                    {child?.firstname} {child?.lastname}
                  </Text>
                </View>
                <View style={styles.classContainer}>
                  <Text style={styles.classSec}>
                    {child?.classId?.name} - {child?.section?.name}
                  </Text>
                </View>
              </View>
              {/* <MyCalendar /> */}
              <AttendanceCache childId={child?._id} ref={eventRef} />
            </View>
          ))}
        </ScrollView>
      </View>
    </BackgroundView>
  );
}

export default Dashboard;
