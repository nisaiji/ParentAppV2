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
import BackgroundView from '@src/components/BackgroundView';
import childDummy from '@src/assets/images/childDummy.png';
import applyLeave from '@src/assets/images/applyLeave.png';
import holiday from '@src/assets/images/holiday.png';
import childProfile from '@src/assets/images/childProfile.png';
import postBox from '@src/assets/images/postBox.png';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAndSetData} from '@src/redux/authSlice';
import {updatelastDashboardUpdatedAt} from '@src/redux/dashBoardSlice';
import AttendanceCache from '@src/components/attendanceCache/AttendanceCache';
import {updateMonthlyAttendance} from '../../../redux/dashBoardSlice';
import colors from '../../../theme/colors';
import {globalStyle} from '../../../theme/fonts';
import {useNavigation} from '@react-navigation/native';
import {ROUTE} from '../../../navigation/constant';

function Dashboard() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {data, currentChild} = useSelector(state => state.auth);
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
        <View style={styles.flexBetween}>
          <Text style={styles.title1}>SharedRI</Text>
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
        <View style={styles.center}>
          <Text style={styles.title1}>
            Hello,
            <Text
              style={
                styles.title2
              }>{` ${currentChild?.firstname} ${currentChild?.lastname}`}</Text>
          </Text>
        </View>
        <View style={styles.flexBetween}>
          <View
            style={[
              styles.buttonsContainer,
              {backgroundColor: '#0A81D11A', borderColor: '#898D8C1A'},
            ]}>
            <Image
              source={applyLeave}
              style={styles.buttonImage}
              resizeMode="contain"
            />
            <Text style={[styles.buttonText, {color: colors.BLUE}]}>
              Apply Leave
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTE.DASHBOARD_STACK, {screen: ROUTE.EVENT})}
            hitSlop={globalStyle.hitSlop10}
            style={[
              styles.buttonsContainer,
              {backgroundColor: '#F849141A', borderColor: '#898D8C1A'},
            ]}>
            <Image
              source={holiday}
              style={styles.buttonImage}
              resizeMode="contain"
            />
            <Text style={[styles.buttonText, {color: '#F84914'}]}>Holiday</Text>
          </TouchableOpacity>
          <View
            style={[
              styles.buttonsContainer,
              {backgroundColor: '#66666626', borderColor: '#898D8C1A'},
            ]}>
            <Image
              source={childProfile}
              style={styles.buttonImage}
              resizeMode="contain"
            />
            <Text style={[styles.buttonText, {color: colors.WHITE}]}>
              Child Profile
            </Text>
          </View>
          <View
            style={[
              styles.buttonsContainer,
              {backgroundColor: '#00A69226', borderColor: '#898D8C1A'},
            ]}>
            <Image
              source={postBox}
              style={styles.buttonImage}
              resizeMode="contain"
            />
            <Text style={[styles.buttonText, {color: '#00A692'}]}>PostBox</Text>
          </View>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.calendarContainer}>
            <AttendanceCache childId={currentChild?._id} ref={eventRef} />
          </View>
        </ScrollView>
      </View>
    </BackgroundView>
  );
}

export default Dashboard;
