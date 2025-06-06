/**
 * Notice Management Component
 *
 * This component handles Notices created  by teachers and school.
 * It allows teachers to
 * view notices of school
 * view and edit their notice.
 */

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  BackHandler,
} from 'react-native';
import styles from './styles';
import noData from '@src/assets/images/noDataFound.png';
import notes from '@src/assets/images/notes.png';
import refresh from '@src/assets/images/refresh.png';
import cross from '@src/assets/images/cross.png';
import leftArrow from '@src/assets/images/left-arrow.png';
import selectedByTeacher from '@src/assets/images/selectedByTeacher.png';
import selectedBySchool from '@src/assets/images/selectedBySchool.png';
import selectedByAll from '@src/assets/images/selectedByAll.png';
import byTeacher from '@src/assets/images/byTeacher.png';
import bySchool from '@src/assets/images/bySchool.png';
import byAll from '@src/assets/images/byAll.png';
import profileEmpty from '@src/assets/images/childDummy.png';
import Loader from '@src/components/Loader';
import {axiosClient} from '@src/services/axiosClient';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {globalStyle} from '@src/theme/fonts';
import {useNavigation} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useSelector} from 'react-redux';
import {EndPoints} from '@src/ParentApi';
import Header from '@src/components/Header';
import {errorToast} from '@src/components/CustomToast';
import BackgroundView from '@src/components/BackgroundView';

export default function Notice() {
  const {currentChild} = useSelector(state => state.auth);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [isUpdate, setIsUpdate] = useState(false);
  // const [selectedLeave, setSelectedLeave] = useState([]);
  // const [description, setDescription] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  // const [error, setError] = useState('');
  // const [isBackBtnAction, setIsBackBtnAction] = useState(false);
  // const [editingNoticeId, setEditingNoticeId] = useState(null);
  // const [updatedDescription, setUpdatedDescription] = useState('');
  const [t] = useTranslation();
  const navigation = useNavigation();
  const filterSheetRef = useRef();

  /**
   * Fetch Notice created by teacher.
   */
  const fetchNotices = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get(
        `${EndPoints.GET_NOTICE}?limit=999&studentId=${currentChild?._id}&createdBy=${filterRole}`,
      );

      if (res?.data?.statusCode === 200) {
        setNotices(res?.data?.result?.announcements);
      }
    } catch (e) {
      errorToast(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, [filterRole]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      },
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const onRefresh = () => {
    fetchNotices();
  };

  return (
    <BackgroundView>
      <View style={styles.container}>
        {loading && <Loader />}
        <Header heading={t('title.postBox')} style={{marginBottom: 0}} />
        {/* filter */}
        <View style={[styles.flexBetween]}>
          <TouchableOpacity
            style={styles.filterContainer}
            onPress={() => filterSheetRef?.current?.open()}>
            <Image
              source={
                filterRole === 'all'
                  ? selectedByAll
                  : filterRole === 'teacher'
                  ? selectedByTeacher
                  : selectedBySchool
              }
              style={styles.filterIcon}
              resizeMode="contain"
            />
            <Text style={styles.filterText}>
              {filterRole === 'all'
                ? t('options.byAll')
                : filterRole === 'teacher'
                ? t('options.byTeacher')
                : t('options.bySchool')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onRefresh()}
            hitSlop={globalStyle.hitSlop10}>
            <Image
              source={refresh}
              style={styles.refreshIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* notice data */}
        <ScrollView>
          {notices.length > 0 ? (
            notices.map((notice, index) => (
              <View key={index}>
                <View style={styles.formContainer1}>
                  <View style={styles.formContainer2}>
                    <Image
                      source={
                        notice?.createdByDetails?.photo
                          ? notice?.createdByRole === 'admin'
                            ? {
                                uri: `${notice?.createdByDetails?.photo}`,
                              }
                            : {
                                uri: `data:image/jpeg;base64,${notice?.createdByDetails?.photo}`,
                              }
                          : profileEmpty
                      }
                      style={styles.profile}
                      resizeMode="contain"
                    />
                    <View
                      style={[
                        styles.flexBetween,
                        {flex: 1, alignItems: 'flex-start'},
                      ]}>
                      <View>
                        <Text style={styles.teacherName}>
                          {notice?.createdByRole === 'admin'
                            ? schoolName
                            : notice?.createdByRole === 'teacher'
                            ? `${notice?.createdByDetails?.firstname} ${notice?.createdByDetails?.lastname}`
                            : ''}
                        </Text>
                        <Text style={styles.date}>
                          {notice?.createdByRole === 'admin'
                            ? t('notice.schoolAdmin')
                            : t('notice.classCoordinator')}
                        </Text>
                        <Text style={styles.date}>
                          {moment(notice?.updatedAt).format(
                            'DD MM YYYY HH:MM A',
                          )}
                        </Text>
                      </View>

                      <View style={styles.flexRow}>
                        {notice?.createdByRole === 'admin' ? (
                          <>
                            <Image
                              source={leftArrow}
                              style={styles.leftArrowIcon}
                              resizeMode="contain"
                            />
                            <Text style={styles.toButtonText}>
                              {t('notice.school')}
                            </Text>
                            <Text style={styles.toButtonText}>
                              {t('notice.teacher')}
                            </Text>
                          </>
                        ) : (
                          <>
                            <Image
                              source={leftArrow}
                              style={styles.leftArrowIcon}
                              resizeMode="contain"
                            />
                            <Text style={styles.toButtonText}>
                              {t('notice.teacher')}
                            </Text>
                          </>
                        )}
                      </View>
                    </View>
                  </View>

                  <Text style={styles.noticeDescription}>
                    {notice?.description}
                  </Text>
                </View>
                <View style={styles.divider} />
              </View>
            ))
          ) : (
            <View style={styles.noDataContainer}>
              <Image
                source={noData}
                style={styles.noDataImg}
                resizeMode="contain"
              />
              <Text style={styles.noDataText}>{t('notice.noDataFound')}</Text>
            </View>
          )}
        </ScrollView>
        {/* bottom sheet */}
        <RBSheet
          ref={filterSheetRef}
          useNativeDriver={false}
          draggable={true}
          dragOnContent={true}
          customStyles={{
            container: styles.bottomSheet,
          }}>
          <View>
            <View style={styles.flexBetween}>
              <View style={styles.flexRow}>
                <Image
                  source={notes}
                  style={styles.notesIcon}
                  resizeMode="contain"
                />
                <Text style={styles.filterHeading}>
                  {t('notice.viewNotice')}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => filterSheetRef?.current?.close()}
                hitSlop={globalStyle.hitSlop10}>
                <Image
                  source={cross}
                  style={styles.filterIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.filterOptionContainer}
              onPress={() => {
                setFilterRole('all');
                filterSheetRef?.current?.close();
              }}
              hitSlop={globalStyle.hitSlop10}>
              <Image
                source={filterRole === 'all' ? selectedByAll : byAll}
                style={styles.filterIcon}
                resizeMode="contain"
              />
              <Text style={styles.filterOptionText}>{t('options.byAll')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterOptionContainer}
              onPress={() => {
                setFilterRole('teacher');
                filterSheetRef?.current?.close();
              }}
              hitSlop={globalStyle.hitSlop10}>
              <Image
                source={
                  filterRole === 'teacher' ? selectedByTeacher : byTeacher
                }
                style={styles.filterIcon}
                resizeMode="contain"
              />
              <Text style={styles.filterOptionText}>
                {t('options.byTeacher')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterOptionContainer}
              onPress={() => {
                setFilterRole('admin');
                filterSheetRef?.current?.close();
              }}
              hitSlop={globalStyle.hitSlop10}>
              <Image
                source={filterRole === 'admin' ? selectedBySchool : bySchool}
                style={styles.filterIcon}
                resizeMode="contain"
              />
              <Text style={styles.filterOptionText}>
                {t('options.bySchool')}
              </Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </View>
    </BackgroundView>
  );
}
