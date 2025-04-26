import React, {useState} from 'react';
import {Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import * as Yup from 'yup';

import styles from './styles';
import BackgroundView from '@src/components/BackgroundView';
import Header from '../../../../components/Header';
import childDummy from '../../../../assets/images/childDummy.png';
import circlePencilIcon from '../../../../assets/images/circlePencil.png';
import DropdownComponent from '../../../../components/DropdownComponent';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {axiosClient} from '../../../../services/axiosClient';
import {EndPoints} from '../../../../ParentApi';
import {errorToast, successToast} from '../../../../components/CustomToast';
import {useNavigation} from '@react-navigation/native';
import {ROUTE} from '../../../../navigation/constant';
import ImagePickerModal from '../../../../components/ImagePickerModal';
import {fetchAndSetData} from '../../../../redux/authSlice';
import Loader from '../../../../components/Loader';

function EditProfile() {
  const [t] = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.auth);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const genderOptions = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Other', value: 'Other'},
  ];
  // console.log(data);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    fullname: Yup.string().required('Full name is required'),
    // gender: Yup.string().required('Please select a gender'),
    // age: Yup.number()
    //   .required('Age is required')
    //   .min(1, 'Age must be at least 1')
    //   .max(150, 'Age must be realistic'),
    // email: Yup.string().email('Invalid email').required('Email is required'),
    // contact: Yup.string().required('Contact is required'),
    // qualification: Yup.string().required('Qualification is required'),
    // occupation: Yup.string().required('Occupation is required'),
    // address: Yup.string().required('Address is required'),
  });

  /**
   * Uploads a new profile image.
   * @param {string} base64Image - The image in base64 format.
   * @param {string} method - Upload method.
   */
  const uploadImage = async (base64Image, method) => {
    try {
      setLoading(true);
      const res = await axiosClient.put(EndPoints.PARENT_PHOTO_UPLOAD, {
        photo: base64Image,
        method,
      });
      // console.log('res', res.data);

      if (res?.data?.statusCode === 200) {
        dispatch(fetchAndSetData());
        successToast('Profile Photo Uploaded Successfully');
      }
    } catch (e) {
      // console.log({e});

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
          <Header heading={t('title.editProfile')} />
          <ScrollView style={styles.innerContainer}>
            <View style={styles.childImgContainer}>
              <Image
                source={
                  data?.photo
                    ? {uri: `data:image/jpeg;base64,${data?.photo}`}
                    : childDummy
                }
                style={styles.childImg}
                resizeMode="contain"
              />
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.pencilIconView}>
                <Image
                  source={circlePencilIcon}
                  style={styles.pencilIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <Formik
              initialValues={{
                username: data?.username || '',
                fullname: data?.fullname || '',
                gender: data?.gender || '',
                age: data?.age || '',
                // email: data?.email || '',
                // contact: data?.phone || '',
                qualification: data?.qualification || '',
                occupation: data?.occupation || '',
                address: data?.address || '',
              }}
              validationSchema={validationSchema}
              onSubmit={async values => {
                // console.log('Submitted Profile:', values);
                try {
                  // Filter out only the fields that are filled
                  const payload = Object.fromEntries(
                    Object.entries(values).filter(
                      ([_, value]) =>
                        value !== '' && value !== null && value !== undefined,
                    ),
                  );
                  // console.log({payload});
                  setLoading(true);
                  const res = await axiosClient.put(
                    EndPoints.UPDATE_PARENT,
                    payload,
                  );
                  // console.log(res.data);

                  if (res.data.statusCode === 200) {
                    successToast(res?.data?.result);
                    dispatch(fetchAndSetData());
                    // navigation.navigate(ROUTE.TAB, {screen: ROUTE.SETTING});
                    navigation.navigate(ROUTE.TAB, {
                      screen: ROUTE.SETTING_STACK,
                      params: {
                        screen: ROUTE.SETTING,
                      },
                    });
                  }
                } catch (e) {
                  // console.log({e});
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
                    <Text style={styles.label}>{t('label.username')}</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder={t('placeholder.username')}
                      placeholderTextColor={styles.placeholderText}
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      value={values.username}
                    />
                    {touched.username && errors.username && (
                      <Text style={styles.errorText}>{errors.username}</Text>
                    )}
                  </View>

                  <View style={styles.formInput}>
                    <Text style={styles.label}>{t('label.fullname')}</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder={t('placeholder.fullname')}
                      placeholderTextColor={styles.placeholderText}
                      onChangeText={handleChange('fullname')}
                      onBlur={handleBlur('fullname')}
                      value={values.fullname}
                    />
                    {touched.fullname && errors.fullname && (
                      <Text style={styles.errorText}>{errors.fullname}</Text>
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
                    <Text style={styles.label}>{t('label.age')}</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder={t('placeholder.age')}
                      placeholderTextColor={styles.placeholderText}
                      keyboardType="numeric"
                      onChangeText={handleChange('age')}
                      onBlur={handleBlur('age')}
                      value={values.age.toString()}
                    />
                    {touched.age && errors.age && (
                      <Text style={styles.errorText}>{errors.age}</Text>
                    )}
                  </View>

                  {/* <View style={styles.formInput}>
                    <Text style={styles.label}>{t('label.email')}</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder={t('placeholder.email')}
                      placeholderTextColor={styles.placeholderText}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                  </View> */}

                  {/* <View style={styles.formInput}>
                    <Text style={styles.label}>{t('label.contact')}</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder={t('placeholder.contact')}
                      placeholderTextColor={styles.placeholderText}
                      keyboardType="phone-pad"
                      onChangeText={handleChange('contact')}
                      onBlur={handleBlur('contact')}
                      value={values.contact}
                    />
                    {touched.contact && errors.contact && (
                      <Text style={styles.errorText}>{errors.contact}</Text>
                    )}
                  </View> */}

                  <View style={styles.formInput}>
                    <Text style={styles.label}>{t('label.qualification')}</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder={t('placeholder.qualification')}
                      placeholderTextColor={styles.placeholderText}
                      onChangeText={handleChange('qualification')}
                      onBlur={handleBlur('qualification')}
                      value={values.qualification}
                    />
                    {touched.qualification && errors.qualification && (
                      <Text style={styles.errorText}>
                        {errors.qualification}
                      </Text>
                    )}
                  </View>

                  <View style={styles.formInput}>
                    <Text style={styles.label}>{t('label.occupation')}</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder={t('placeholder.occupation')}
                      placeholderTextColor={styles.placeholderText}
                      onChangeText={handleChange('occupation')}
                      onBlur={handleBlur('occupation')}
                      value={values.occupation}
                    />
                    {touched.occupation && errors.occupation && (
                      <Text style={styles.errorText}>{errors.occupation}</Text>
                    )}
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
              hasPhoto={data?.photo}
            />
          </ScrollView>
        </SafeAreaView>
      </BackgroundView>
    </GestureHandlerRootView>
  );
}

export default EditProfile;
