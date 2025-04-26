/* eslint-disable prettier/prettier */
import React, {useEffect, useRef} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
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

function Dashboard() {
  // const eventRef = useRef();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {currentChild} = useSelector(state => state.auth);
  // console.log(currentChild);

  useEffect(() => {
    dispatch(fetchAndSetData());
  }, []);

  return (
    <BackgroundView>
      <View style={styles.container}>
        <View style={styles.flexRow}>
          <View>
            <Text style={styles.title1}>Hello,</Text>
            <Text style={styles.title2}>
              {currentChild?.firstname} {currentChild?.lastname}
            </Text>
          </View>
          <TouchableOpacity
            hitSlop={globalStyle.hitSlop10}
            onPress={() =>
              navigation.navigate(ROUTE.TAB, {
                screen: ROUTE.SETTING_STACK,
                params: {
                  screen: ROUTE.EDIT_PROFILE,
                },
              })
            }>
            <Image
              source={
                currentChild?.photo
                  ? {uri: `data:image/jpeg;base64,${currentChild?.photo}`}
                  : childDummy
              }
              style={styles.childImg}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        {/* Calendar & Events */}
        {/* <EventCalendar ref={eventRef} /> */}

        <View style={styles.calendarContainer}>
          <View style={styles.flexRow}>
            <View style={styles.flexRow}>
              <Image
                source={
                  currentChild?.photo
                    ? {uri: `data:image/jpeg;base64,${currentChild?.photo}`}
                    : childDummy
                }
                style={styles.childImg}
                resizeMode="contain"
              />
              <Text style={styles.title3}>
                {currentChild?.firstname} {currentChild?.lastname}
              </Text>
            </View>
            <View style={styles.classContainer}>
              <Text style={styles.classSec}>
                {currentChild?.classId?.name} - {currentChild?.section?.name}
              </Text>
            </View>
          </View>
          {/* <MyCalendar /> */}
          <EventCalendar />
        </View>
      </View>
    </BackgroundView>
  );
}

export default Dashboard;
