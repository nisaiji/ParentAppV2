import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import BackgroundView from '@src/components/BackgroundView';
import childCard from '@src/assets/images/childCard.png';
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
import {updateCurrentChildByIndex} from '../../../redux/authSlice';
import moment from 'moment';
import {useTranslation} from 'react-i18next';

function Dashboard() {
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const navigation = useNavigation();
  const {data, currentChild} = useSelector(state => state.auth);
  const [refreshing, setRefreshing] = useState(false);
  const eventRef = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;
  const CARD_WIDTH = screenWidth * 0.9;

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setCurrentIndex(index);
      dispatch(updateCurrentChildByIndex(index));
    }
  }).current;

  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

  const animatedDotWidths = useRef(
    data?.students?.map((_, i) => new Animated.Value(i === 0 ? 25 : 11)),
  ).current;

  useEffect(() => {
    animatedDotWidths.forEach((animValue, i) => {
      Animated.timing(animValue, {
        toValue: currentIndex === i ? 25 : 11,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
  }, [currentIndex]);

  const renderItem = ({item}) => (
    <View style={{width: CARD_WIDTH}}>
      <ImageBackground
        source={childCard}
        style={styles.childCardContainer}
        imageStyle={{borderRadius: 12}}>
        <View style={styles.headerRow}>
          <Image
            source={item?.admin?.photo || childDummy}
            style={styles.schoolLogo}
          />
          <Text style={styles.schoolName}>{item?.admin?.schoolName}</Text>
        </View>

        <View style={styles.mainRow}>
          <View style={styles.infoBox}>
            <Text
              style={
                styles.name
              }>{`${item?.firstname} ${item?.lastname}`}</Text>
            <Text style={styles.infoText}>
              {t('dashboard.class')}
              <Text
                style={
                  styles.bold
                }>{`${item?.classId?.name} ${item?.section?.name}`}</Text>
            </Text>
            <Text style={styles.infoText}>
              {t('dashboard.dob')}
              <Text style={styles.bold}>
                {moment(item?.dob).format('DD MMMM YYYY')}
              </Text>
            </Text>
            <Text style={styles.infoText}>
              {t('dashboard.bloodGroup')}
              <Text style={styles.bold}>{item?.bloodGroup}</Text>
            </Text>
          </View>
          <Image
            source={
              item?.photo
                ? {uri: `data:image/jpeg;base64,${item?.photo}`}
                : childDummy
            }
            style={styles.childCardImg}
            resizeMode="cover"
          />
        </View>
      </ImageBackground>
    </View>
  );

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
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.flexBetween}>
            <Text style={styles.title2}>{t('dashboard.sharedRI')}</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(ROUTE.DASHBOARD_STACK, {
                  screen: ROUTE.SETTING_STACK,
                })
              }
              hitSlop={globalStyle.hitSlop10}>
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
          <View style={styles.center}>
            <Text style={styles.title1}>
              {t('dashboard.hello')}
              <Text
                style={
                  styles.title2
                }>{` ${currentChild?.firstname} ${currentChild?.lastname}`}</Text>
            </Text>
          </View>
          {/* Child card select */}
          <FlatList
            ref={flatListRef}
            data={data?.students}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToAlignment="center"
            decelerationRate="fast"
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewConfigRef.current}
            renderItem={renderItem}
          />
          {/* Dot Indicators */}
          <View style={styles.dotContainer}>
            {data?.students?.map((_, index) => (
              <Animated.View
                key={index}
                style={[styles.dots, {width: currentIndex === index ? 25 : 11}]}
              />
            ))}
          </View>

          {/* Tab Icons */}
          <View style={styles.flexBetween}>
            {/* apply leave */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(ROUTE.DASHBOARD_STACK, {
                  screen: ROUTE.LEAVE,
                })
              }
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
                {t('dashboard.applyLeave')}
              </Text>
            </TouchableOpacity>
            {/* holiday */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(ROUTE.DASHBOARD_STACK, {
                  screen: ROUTE.EVENT,
                })
              }
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
              <Text style={[styles.buttonText, {color: '#F84914'}]}>
                {t('dashboard.holiday')}
              </Text>
            </TouchableOpacity>
            {/* edit child */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(ROUTE.DASHBOARD_STACK, {
                  screen: ROUTE.EDIT_CHILD,
                })
              }
              hitSlop={globalStyle.hitSlop10}
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
                {t('dashboard.childProfile')}
              </Text>
            </TouchableOpacity>
            {/* notice */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(ROUTE.DASHBOARD_STACK, {
                  screen: ROUTE.NOTICE,
                })
              }
              hitSlop={globalStyle.hitSlop10}
              style={[
                styles.buttonsContainer,
                {backgroundColor: '#00A69226', borderColor: '#898D8C1A'},
              ]}>
              <Image
                source={postBox}
                style={styles.buttonImage}
                resizeMode="contain"
              />
              <Text style={[styles.buttonText, {color: '#00A692'}]}>
                {t('dashboard.postBox')}
              </Text>
            </TouchableOpacity>
          </View>
          {/* Attendance calendar */}
          <View style={styles.calendarContainer}>
            <AttendanceCache childId={currentChild?._id} ref={eventRef} />
          </View>
        </ScrollView>
      </View>
    </BackgroundView>
  );
}

export default Dashboard;
