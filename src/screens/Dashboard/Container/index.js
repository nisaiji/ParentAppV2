import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Animated,
  Easing,
  Dimensions,
  Alert,
  RefreshControl,
  Modal,
  ActivityIndicator,
  ToastAndroid,
  Pressable,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Calendar from '@src/screens/Dashboard/Components/Calendar/index';
import colors from '@src/theme/colors';
import styles from './styles';
import Vector from '@src/assets/images/Vector.png';
import Signout from '@src/assets/images/Signout.png';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {ROUTE} from '@src/navigation/constant';
import {axiosClient} from '@src/services/axiosClient';
import {AuthContext} from '@src/context/AuthContext';
import Editpic from '@src/assets/images/Editpic.png';
import menu from '@src/assets/images/menu.png';
import Loader from '../../../components/Loader';
import {useTranslation} from 'react-i18next';

const AttendanceDashboard = () => {
  const navigation = useNavigation();
  const {
    currentChild,
    logout,
    parentUsername,
    profileDrawer,
    setProfileDrawer,
  } = useContext(AuthContext);
  // console.log(currentChild);
  const [selectedView, setSelectedView] = useState('Daily');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [childMonthlyAttendance, setChildMonthlyAttendance] = useState([]);
  const [totalDaysPresentMonthy, setTotalDaysPresentMonthy] = useState(0);
  const {t} = useTranslation();
  const [totalClassDaysMonthy, setTotalClassDaysMonthy] = useState(0);
  const [totalDaysPresentYeary, setTotalDaysPresentYeary] = useState(0);
  const [totalClassDaysYeary, setTotalClassDaysYeary] = useState(0);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isTeacherMarkAttendance, setIsTeacherMarkAttendance] = useState(false);
  const [isParentMarkAttendance, setIsParentMarkAttendance] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const dashboardRef = useRef();
  const slideAnim = useRef(
    new Animated.Value(Dimensions.get('window').height),
  ).current;

  const currentDate = new Date();
  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const day = currentDate.getDate();
  const dayName = dayNames[currentDate.getDay()];
  const month = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  const isFocused = useIsFocused();

  const getTodayAttendance = async () => {
    try {
      const studentId = currentChild._id;
      setLoading(true);
      const res = await axiosClient.get(
        `attendance/check-parent-attendance-marked/${studentId}`,
      );
      // console.log('res', res.data);
      const attendance = res?.data?.result;
      if (
        attendance.teacherAttendance === null &&
        attendance.parentAttendance === null
      ) {
        setIsTeacherMarkAttendance(false);
        setIsParentMarkAttendance(false);
      } else if (
        attendance.teacherAttendance === null &&
        attendance.parentAttendance !== null
      ) {
        setIsTeacherMarkAttendance(false);
        setIsParentMarkAttendance(true);
      }
      //  else if (
      //   attendance.teacherAttendance !== null &&
      //   attendance.parentAttendance === null
      // ) {
      //   setIsTeacherMarkAttendance(true);
      //   setIsParentMarkAttendance(false);
      // }

      getchildattendance();
    } catch (e) {
      setLoading(false);
      // console.log('error in getTodayAttendance', e);
      if (e === 'today is scheduled as holiday!') {
        // console.log('setting holiday');
        setIsParentMarkAttendance(true);
      } else {
        ToastAndroid.show(e, ToastAndroid.TOP, ToastAndroid.LONG);
      }
    }
  };

  const getchildattendance = async () => {
    try {
      const studentId = currentChild._id;
      const month = currentDate.getMonth();
      const res = await axiosClient.get(
        `/attendance/parent-monthly-attendance-status/${studentId}/${month}`,
      );
      setChildMonthlyAttendance(res.data.result.formattedAttendance);
      const res2 = await axiosClient.post(
        `/attendance/parent-monthly-attendance-count`,
        {studentId, month, year},
      );
      setTotalDaysPresentMonthy(res2.data.result.monthlyAttendanceCount);
      setTotalClassDaysMonthy(res2.data.result.totalMonthlyAttendanceCount);
      const res3 = await axiosClient.post(
        `/attendance/parent-yearly-attendance-count`,
        {studentId, year},
      );
      setTotalDaysPresentYeary(res3.data.result.presentCount);
      setTotalClassDaysYeary(res3.data.result.totalCount);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      ToastAndroid.show(e, ToastAndroid.TOP, ToastAndroid.LONG);
      // console.log('err in getchildattendance', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      // console.log('useeffect call');
      // console.log(currentChild, isFocused);
      setProfileDrawer(false);
      getTodayAttendance();
    }
  }, [currentChild, isFocused]);

  const handleOutsidePress = () => {
    setProfileDrawer(false);
    setIsPopupVisible(false);
  };

  const handleAttendanceClick = status => {
    setSelectedAttendance(status);
  };

  const handleDoneClick = async () => {
    if (!selectedAttendance) {
      Alert.alert(
        'Error',
        'Please select an attendance status before proceeding.',
      );
      return;
    }
    const res = await axiosClient.post('/attendance/parent-mark-attendance', {
      studentId: currentChild._id,
      attendance: selectedAttendance,
    });
    // console.log(res.data.statusCode, 'statuscode');
    if (res?.data?.statusCode === 200) {
      setIsParentMarkAttendance(true);
      getchildattendance();
      setIsPopupVisible(false);
      Alert.alert(
        'Attendance Marked',
        `You marked this day as ${selectedAttendance}`,
      );
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getTodayAttendance();
    setTimeout(() => {
      if (dashboardRef?.current) {
        dashboardRef?.current?.refresh();
      }
      setRefreshing(false);
    }, 1500);
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      {/* <TouchableWithoutFeedback onPress={handleOutsidePress}> */}
      <View>
        {loading && (
          <View style={styles.loading}>
            <Loader />
          </View>
        )}
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          scrollEnabled={!isPopupVisible}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <Text style={styles.nameText}>
                  {currentChild?.firstname || ''} {currentChild?.lastname || ''}
                </Text>
                <Text style={styles.dateText}>
                  {day} {month}, {year}
                </Text>
              </View>
              <TouchableOpacity
                // style={{backgroundColor:'red'}}
                onPress={() => setProfileDrawer(true)}
                disabled={isPopupVisible}>
                <Image source={menu} style={{height: 65, width: 65, top:-6}} />
              </TouchableOpacity>
            </View>

            {/* Calendar Component */}
            <View style={styles.calendarContainer}>
              <View style={styles.calendarHeader}>
                <Text style={styles.monthText}>{month}</Text>
                <Text style={styles.yearText}> {year}</Text>
              </View>
              <Calendar
                monthlyAttendance={childMonthlyAttendance || []}
                ref={dashboardRef}
              />
            </View>

            {/* Attendance Summary */}
            <View style={styles.attendanceSummaryContainer}>
              <View>
                <Text style={styles.attendanceHeaderText}>
                  {' '}
                  {t('dashboard.attendance')}
                </Text>
              </View>
              <View>
                <Text style={styles.attendanceSubHeaderText}>
                  {t('dashboard.totalDayMsg')}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryBox}>
                <View style={styles.summaryTextContainer}>
                  <Text style={styles.summaryTitleText}>
                    {t('dashboard.Month')}
                  </Text>
                  <Text style={styles.summarySubtitleText}>
                    {month} {year}
                  </Text>
                </View>
                <View style={styles.summaryValueContainer}>
                  <Text style={styles.summaryValueText}>
                    {totalDaysPresentMonthy}/{totalClassDaysMonthy}
                  </Text>
                  <Text style={styles.summaryDaysText}>
                    {t('dashboard.Days')}
                  </Text>
                </View>
              </View>
              <View style={styles.summaryBox}>
                <View style={styles.summaryTextContainer}>
                  <Text style={styles.summaryTitleText}>
                    {' '}
                    {t('dashboard.Year')}
                  </Text>
                  <Text style={styles.summarySubtitleText}>
                    {t('dashboard.2024')}
                  </Text>
                </View>
                <View style={styles.summaryValueContainer}>
                  <Text style={styles.summaryValueText}>
                    {totalDaysPresentYeary}/{totalClassDaysYeary}
                  </Text>
                  <Text style={styles.summaryDaysText}>
                    {t('dashboard.Days')}
                  </Text>
                </View>
              </View>
            </View>

            {/* Sidebar */}
            {profileDrawer && (
              <View style={styles.overlayContainer}>
                <TouchableOpacity
                  style={styles.overlay}
                  onPress={handleOutsidePress}
                />
                <View style={styles.sidebar}>
                  <View style={styles.sidebarHeader}>
                    <Image
                      source={{
                        uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                      }}
                      style={styles.profileImage}
                    />
                    <TouchableOpacity
                      style={styles.editPicButton}
                      // onPress={() => alert('EditPic button pressed')}
                    >
                      <Image
                        alt=""
                        source={Editpic}
                        style={styles.editPicIcon}
                      />
                    </TouchableOpacity>
                    <View style={styles.sidebarHeadersub}>
                      <Text style={styles.profileName}>{parentUsername}</Text>
                      <TouchableOpacity
                        style={styles.sidebarEdit}
                        onPress={() =>
                          navigation.navigate(ROUTE.AUTH, {
                            screen: ROUTE.PARENT_PROFILE_EDIT,
                          })
                        }>
                        <Text style={styles.sidebarEditText}>
                          {t('profile.editProfile')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.sidebarItem}
                    onPress={() =>
                      navigation.navigate(ROUTE.AUTH, {
                        screen: ROUTE.PARENT_EDIT,
                      })
                    }>
                    <Image source={Vector} style={styles.sidebarItemImage} />
                    <Text style={styles.sidebarItemText}>
                      {t('privacy.privacyHeader')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.sidebarItem1}
                    onPress={() => {
                      logout();
                      navigation.reset({
                        index: 0,
                        routes: [{name: ROUTE.AUTH}],
                      });
                    }}>
                    <Image source={Signout} style={styles.sidebarItemImage} />
                    <Text style={styles.sidebarItemText}>
                      {t('dashboard.Logout')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          {/* Overlay for locking screen */}
          {isPopupVisible && (
            <TouchableWithoutFeedback onPress={() => setIsPopupVisible(false)}>
              <View style={styles.overlay} />
            </TouchableWithoutFeedback>
          )}

          {/* Slide Popup Component */}
          {!isParentMarkAttendance && (
            <Modal
              visible={true}
              transparent={true}
              animationType="slide"
              style={{height: '100%'}}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <View style={styles.popupContent}>
                    <View style={styles.popupButtonContainer}>
                      <TouchableOpacity
                        onPress={handleDoneClick}
                        style={styles.doneButton}>
                        <Text style={styles.doneButtonText}>
                          {t('dashboard.Done')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.popupHeader}>
                      <Text style={styles.popupHeaderText}>
                        {t('dashboard.markAtt')}
                      </Text>
                      <Text style={styles.popupDateText}>
                        {day} {month} {year}, {dayName}
                      </Text>
                    </View>
                    <View style={styles.attendanceOptionsContainer}>
                      <TouchableOpacity
                        onPress={() => handleAttendanceClick('absent')}
                        style={[
                          styles.attendanceOption,
                          {
                            backgroundColor:
                              selectedAttendance === 'absent'
                                ? colors.DARK_ORANGE
                                : colors.LIGHT_ORANGE,
                          },
                        ]}>
                        <Text
                          style={[
                            styles.attendanceOptionText,
                            {
                              color:
                                selectedAttendance === 'absent'
                                  ? colors.WHITE
                                  : colors.DARK_ORANGE,
                            },
                          ]}>
                          {t('dashboard.Absent')}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleAttendanceClick('present')}
                        style={[
                          styles.attendanceOption,
                          {
                            backgroundColor:
                              selectedAttendance === 'present'
                                ? colors.DARK_CYAN
                                : colors.LIGHT_CYAN,
                          },
                        ]}>
                        <Text
                          style={[
                            styles.attendanceOptionText,
                            {
                              color:
                                selectedAttendance === 'present'
                                  ? colors.WHITE
                                  : colors.DARK_CYAN,
                            },
                          ]}>
                          {t('dashboard.Present')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          )}
        </ScrollView>
      </View>
      {/* </TouchableWithoutFeedback> */}
    </GestureHandlerRootView>
  );
};

export default AttendanceDashboard;
