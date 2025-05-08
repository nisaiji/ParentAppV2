/* eslint-disable prettier/prettier */
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import BackgroundView from '../../../components/BackgroundView';
import EventCalendar from '../../../components/cache/EventCache';
import MyCalendar from '../../../components/calendar/Calendar';
import childDummy from '../../../assets/images/childDummy.png';
import {axiosClient} from '../../../services/axiosClient';
import {EndPoints} from '../../../ParentApi';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAndSetData} from '../../../redux/authSlice';
import {ROUTE} from '../../../navigation/constant';
import {useNavigation} from '@react-navigation/native';
import {globalStyle} from '../../../theme/fonts';
import {
  updatelastDashboardUpdatedAt,
  updateMonthlyEvents,
} from '../../../redux/dashBoardSlice';

function Dashboard() {
  // const eventRef = useRef();
  const navigation = useNavigation();
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
    dispatch(updateMonthlyEvents({childId: null, events: {}}));
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
          {/* <TouchableOpacity
            hitSlop={globalStyle.hitSlop10}
            onPress={() =>
              navigation.navigate(ROUTE.TAB, {
                screen: ROUTE.SETTING_STACK,
                params: {
                  screen: ROUTE.EDIT_PROFILE,
                },
              })
            }> */}
          <Image
            source={
              data?.photo
                ? {uri: `data:image/jpeg;base64,${data?.photo}`}
                : childDummy
            }
            style={styles.childImg}
            resizeMode="contain"
          />
          {/* </TouchableOpacity> */}
        </View>
        <View style={styles.line} />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {/* Calendar & Events */}
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
              <EventCalendar childId={child?._id} ref={eventRef} />
            </View>
          ))}
        </ScrollView>
      </View>
    </BackgroundView>
  );
}

export default Dashboard;
