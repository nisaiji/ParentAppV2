/* eslint-disable prettier/prettier */
import React, {useEffect, useRef} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
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
  const {data} = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchAndSetData());
  }, []);

  return (
    <BackgroundView>
      <View style={styles.container}>
        <View style={styles.flexRow}>
          <View>
            <Text style={styles.title1}>Hello,</Text>
            <Text style={styles.title2}>{data?.fullname}</Text>
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
                data?.photo
                  ? {uri: `data:image/jpeg;base64,${data?.photo}`}
                  : childDummy
              }
              style={styles.childImg}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <ScrollView>
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
              <EventCalendar childId={child?._id} />
            </View>
          ))}
        </ScrollView>
      </View>
    </BackgroundView>
  );
}

export default Dashboard;
