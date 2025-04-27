import React, {useState} from 'react';
import {Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import * as Yup from 'yup';

import styles from './styles';
import BackgroundView from '@src/components/BackgroundView';
import Header from '../../../../components/Header';
import childDummy from '../../../../assets/images/childDummy.png';
import circlePencilIcon from '../../../../assets/images/circlePencil.png';
import calendar from '../../../../assets/images/calendar.png';
import DropdownComponent from '../../../../components/DropdownComponent';
import {Colors} from '../../../../theme/fonts';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import ImagePickerModal from '../../../../components/ImagePickerModal';
import {axiosClient} from '../../../../services/axiosClient';
import {EndPoints} from '../../../../ParentApi';
import {errorToast, successToast} from '../../../../components/CustomToast';
import {fetchAndSetData} from '../../../../redux/authSlice';
import {useNavigation} from '@react-navigation/native';
import {ROUTE} from '../../../../navigation/constant';
import Loader from '../../../../components/Loader';

const EditChild = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {currentChild} = useSelector(state => state.auth);
  const [t] = useTranslation();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const genderOptions = [
    {label: t('options.male'), value: 'Male'},
    {label: t('options.female'), value: 'Female'},
    {label: t('options.other'), value: 'Other'},
  ];

  const bloodGroupOptions = [
    {label: 'A+', value: 'A+'},
    {label: 'A-', value: 'A-'},
    {label: 'B+', value: 'B+'},
    {label: 'B-', value: 'B-'},
    {label: 'AB+', value: 'AB+'},
    {label: 'AB-', value: 'AB-'},
    {label: 'O+', value: 'O+'},
    {label: 'O-', value: 'O-'},
  ];

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().trim().required('First name is required'),
    lastName: Yup.string().trim().required('Last name is required'),
    gender: Yup.string().required('Please select a gender'),
    bloodGroup: Yup.string().required('Please select a blood group'),
    dob: Yup.string().required('Date of birth is required'),
    address: Yup.string().trim().required('Address is required'),
  });
  // console.log(currentChild);

  /**
   * Uploads a new profile image.
   * @param {string} base64Image - The image in base64 format.
   * @param {string} method - Upload method.
   */
  const uploadImage = async (base64Image, method) => {
    try {
      setLoading(true);
      const res = await axiosClient.put(
        `${EndPoints.STUDENT_PHOTO_UPLOAD}/${currentChild?._id}`,
        {
          photo: base64Image,
          method,
        },
      );

      if (res?.data?.statusCode === 200) {
        dispatch(fetchAndSetData());
        successToast('Profile Photo Uploaded Successfully');
      }
    } catch (e) {
      console.log({e});
      errorToast(e);
    } finally {
      setLoading(false);
      setModalVisible(false);
    }
  };

  return (
    <GestureHandlerRootView>
      <BackgroundView>
        {loading && <Loader />}
        <SafeAreaView style={styles.container}>
          <Header heading={t('title.childSetting')} />
          <ScrollView style={styles.innerContainer}>
            <View style={styles.header}>
              <Text style={styles.schoolName}>
                {currentChild?.admin?.schoolName}
              </Text>
              <View style={styles.classContainer}>
                <Text style={styles.classSec}>
                  {currentChild?.classId?.name} - {currentChild?.section?.name}
                </Text>
              </View>
            </View>
            <View style={styles.childImgContainer}>
              <Image
                source={
                  currentChild?.photo
                    ? {uri: `data:image/jpeg;base64,${currentChild?.photo}`}
                    : childDummy
                }
                style={styles.childImg}
                resizeMode="contain"
              />
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image
                  source={circlePencilIcon}
                  style={styles.pencilIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <Formik
              enableReinitialize
              initialValues={{
                firstName: currentChild?.firstname || '',
                lastName: currentChild?.lastname || '',
                gender: currentChild?.gender || '',
                bloodGroup: currentChild?.bloodGroup || '',
                dob: currentChild?.dob || '',
                address: currentChild?.address || '',
              }}
              validationSchema={validationSchema}
              onSubmit={async values => {
                try {
                  setLoading(true);
                  const res = await axiosClient.put(
                    `${EndPoints.UPDATE_STUDENT}/${currentChild?._id}`,
                    values,
                  );

                  if (res.data.statusCode === 200) {
                    successToast(res?.data?.result);
                    dispatch(fetchAndSetData());
                    navigation.navigate(ROUTE.TAB, {
                      screen: ROUTE.CHILD_STACK,
                      params: {
                        screen: ROUTE.CHILD,
                      },
                    });
                  }
                } catch (e) {
                  console.log({e});
                  errorToast(e);
                } finally {
                  setLoading(false);
                }
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                setFieldValue,
              }) => (
                <View style={styles.formContainer}>
                  <Text style={styles.formHeader}>
                    {t('title.personalInfo')}
                  </Text>

                  <View style={styles.formInput}>
                    <Text style={styles.label}>{t('label.firstname')}</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder={t('placeholder.firstname')}
                      placeholderTextColor={styles.placeholderText}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      value={values.firstName}
                    />
                    {touched.firstName && errors.firstName && (
                      <Text style={styles.errorText}>{errors.firstName}</Text>
                    )}
                  </View>

                  <View style={styles.formInput}>
                    <Text style={styles.label}>{t('label.lastname')}</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder={t('placeholder.lastname')}
                      placeholderTextColor={styles.placeholderText}
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                      value={values.lastName}
                    />
                    {touched.lastName && errors.lastName && (
                      <Text style={styles.errorText}>{errors.lastName}</Text>
                    )}
                  </View>

                  <View style={styles.formInput}>
                    <Text style={styles.label}>{t('label.gender')}</Text>
                    <DropdownComponent
                      items={genderOptions}
                      desc={t('placeholder.selectGender')}
                      selectedValue={values.gender}
                      onSelect={item => setFieldValue('gender', item.value)}
                    />
                    {touched.gender && errors.gender && (
                      <Text style={styles.errorText}>{errors.gender}</Text>
                    )}
                  </View>

                  <View style={styles.formInput}>
                    <Text style={styles.label}>{t('label.bloodgroup')}</Text>
                    <DropdownComponent
                      items={bloodGroupOptions}
                      desc={t('placeholder.selectBloodGroup')}
                      selectedValue={values.bloodGroup}
                      onSelect={item => setFieldValue('bloodGroup', item.value)}
                    />
                    {touched.bloodGroup && errors.bloodGroup && (
                      <Text style={styles.errorText}>{errors.bloodGroup}</Text>
                    )}
                  </View>

                  <View style={styles.formInput}>
                    <Text style={styles.label}>{t('label.dob')}</Text>
                    <TouchableOpacity
                      onPress={() => setOpen(true)}
                      style={styles.textInput}>
                      <Text style={styles.textInput2}>
                        {values.dob || 'DD/MM/YYYY'}
                      </Text>
                      <Image
                        source={calendar}
                        style={{
                          height: 30,
                          width: 30,
                          position: 'absolute',
                          bottom: 10,
                          right: 10,
                        }}
                      />
                    </TouchableOpacity>
                    <DatePicker
                      modal
                      open={open}
                      date={date}
                      mode="date"
                      theme="dark"
                      maximumDate={new Date()}
                      onConfirm={date => {
                        setOpen(false);
                        setDate(date);
                        const formattedDate = moment(date).format('DD/MM/YYYY');
                        setFieldValue('dob', formattedDate);
                      }}
                      onCancel={() => setOpen(false)}
                    />
                  </View>

                  <View style={styles.formInput}>
                    <Text style={styles.label}>{t('label.address')}</Text>
                    <TextInput
                      multiline
                      numberOfLines={3}
                      style={styles.textInput}
                      textAlignVertical="top"
                      placeholder={t('placeholder.address')}
                      placeholderTextColor={styles.placeholderText}
                      onChangeText={handleChange('address')}
                      onBlur={handleBlur('address')}
                      value={values.address}
                    />
                    {touched.address && errors.address && (
                      <Text style={styles.errorText}>{errors.address}</Text>
                    )}
                  </View>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}>
                    <Text style={styles.buttonLabel}>
                      {t('button.updateSave')}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
            {/* Modal for choosing camera or gallery */}
            <ImagePickerModal
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
              onUpload={uploadImage}
              hasPhoto={currentChild?.photo}
            />
          </ScrollView>
        </SafeAreaView>
      </BackgroundView>
    </GestureHandlerRootView>
  );
};

export default EditChild;
