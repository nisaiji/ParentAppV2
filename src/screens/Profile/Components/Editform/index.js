import React, {useContext, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import {Picker} from '@react-native-picker/picker';
import Backbutton from '@src/assets/images/Backbutton.png';
import {useNavigation} from '@react-navigation/native';
import {ROUTE} from '@src/navigation/constant';
import styles from './styles';
import Email from '@src/assets/images/Email.png';
import India from '@src/assets/images/India.png';
import {AuthContext} from '@src/context/AuthContext';
import {axiosClient} from '@src/services/axiosClient';
import DatePicker from 'react-native-date-picker';
import {Fonts} from '../../../../theme/fonts';
import Loader from '../../../../components/Loader';
import {useTranslation} from 'react-i18next';
import CustomDropdown from '../../../../components/CustomDropDown';

function EditProfile() {
  const navigation = useNavigation();
  const {currentChild, phone, parentEmail, fetchChildrenData} =
    useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const {t} = useTranslation();
  const {
    firstname = '',
    rollNumber = '',
    classId = {name: ''},
    section = {name: ''},
    dob = '',
    gender = '',
    bloodGroup = '',
    address = '',
  } = currentChild || {};

  const genderOption = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Other', value: 'Other'},
  ];

  const bloodGroupOption = [
    {label: 'A+', value: 'A+'},
    {label: 'A-', value: 'A-'},
    {label: 'B+', value: 'B+'},
    {label: 'B-', value: 'B-'},
    {label: 'AB+', value: 'AB+'},
    {label: 'AB-', value: 'AB-'},
    {label: 'O+', value: 'O+'},
    {label: 'O+', value: 'O+'},
  ];

  const capitalizeFirstLetter = string => {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const validateData = student => {
    if (!student.dob.trim()) return 'Date of birth is required';
    if (!student.bloodGroup.trim()) return 'BloodGroup is required';
    if (!student.address.trim()) return 'Address is required';
    return '';
  };

  const handleFormSubmit = async values => {
    try {
      const studentId = currentChild._id;
      const error = validateData(values);
      if (error) {
        ToastAndroid.show(error, ToastAndroid.TOP, ToastAndroid.LONG);
        return;
      }
      setLoading(true);
      const res = await axiosClient.put(`/student/parent-update/${studentId}`, {
        bloodGroup: values.bloodGroup,
        dob: values.dob,
        address: capitalizeFirstLetter(values.address),
      });
      if (res?.data?.statusCode === 200) {
        fetchChildrenData();
        ToastAndroid.show(
          'Profile Updated',
          ToastAndroid.TOP,
          ToastAndroid.LONG,
        );
        navigation.navigate(ROUTE.PROFILE);
      }
    } catch (error) {
      // console.error(error);
      ToastAndroid.show(error, ToastAndroid.TOP, ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: firstname,
        rollNumber: rollNumber,
        classSection: `${classId.name} ${section.name}`,
        dob: dob,
        gender: gender,
        email: parentEmail,
        phone: phone || '',
        bloodGroup: bloodGroup,
        address: address,
      }}
      onSubmit={handleFormSubmit}>
      {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {loading && (
            <View style={styles.loading}>
              <Loader />
            </View>
          )}
          <View style={styles.container}>
            {/* {console.log('v', values.gender, values.bloodGroup)} */}
            <View style={styles.section}>
              <View style={styles.titleContainer}>
                <Pressable onPress={() => navigation.navigate(ROUTE.PROFILE)}>
                  <Image
                    source={Backbutton}
                    style={styles.backIcon}
                    resizeMode="contain"
                  />
                </Pressable>
                <View style={styles.titleText}>
                  <Text style={styles.headerText}>
                    {t('editForm.editProfile')}{' '}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.sectionHeader}> {t('editForm.Name')} </Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.inputText,{color:'gray'}]}
                  placeholder="Enter name"
                  placeholderTextColor="gray"
                  value={values.name}
                  editable={false}
                  selectable={false}
                />
              </View>
              {/* <View>
                  <Text style={styles.sectionHeader}>
                    {' '}
                    {t('editForm.rollNumber')}{' '}
                  </Text>
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputText}
                    placeholder="Roll Number"
                    placeholderTextColor="gray"
                    value={values.rollNumber}
                    disabled
                  />
                </View> */}
              <View>
                <Text style={styles.sectionHeader}>
                  {' '}
                  {t('editForm.classSec')}{' '}
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                 style={[styles.inputText,{color:'gray'}]}
                  placeholder="class - section"
                  placeholderTextColor="gray"
                  value={values.classSection}
                  editable={false}
                  selectable={false}
                />
              </View>
              <View>
                <Text style={styles.sectionHeader}> {t('editForm.Dob')} </Text>
              </View>
              <TouchableOpacity onPress={() => setOpen(true)}>
                <View style={styles.inputContainer}>
                  <Text style={[styles.inputText]}>
                    {values.dob ? values.dob : 'MM/DD/YYYY'}
                  </Text>
                  <DatePicker
                    modal
                    open={open}
                    date={date}
                    mode="date"
                    maximumDate={new Date()}
                    onConfirm={date => {
                      setOpen(false);
                      setDate(date);
                      setFieldValue('dob', date.toLocaleDateString('en-US'));
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                </View>
              </TouchableOpacity>
              <View>
                <Text style={styles.sectionHeader}>
                  {' '}
                  {t('editForm.Gender')}
                </Text>
              </View>
              <CustomDropdown
                items={genderOption}
                desc="Select Gender"
                onSelect={selectedItem =>
                  setFieldValue('gender', selectedItem.value)
                }
                selectedValue={values.gender}
                isDisabled={true}
              />
            </View>
            <View style={styles.section}>
              <View>
                <Text style={styles.sectionHeader}>
                  {' '}
                  {t('editForm.Email')}{' '}
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.inputText,{color:'gray'}]}
                  placeholder="enter email"
                  placeholderTextColor="gray"
                  value={values.email}
                  editable={false}
                  selectable={false}
                />
                <Image source={Email} style={styles.icon} />
              </View>
              <View>
                <Text style={styles.sectionHeader}>
                  {' '}
                  {t('editForm.Phone')}{' '}
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.inputText,{color:'gray'}]}
                  placeholder="Phone Number"
                  placeholderTextColor="gray"
                  value={phone}
                  editable={false}
                  selectable={false}
                />
                <Image source={India} style={styles.icon} />
              </View>
            </View>
            <View style={styles.section}>
              <View>
                <Text style={styles.sectionHeader}>
                  {' '}
                  {t('editForm.blood')}{' '}
                </Text>
              </View>
              <CustomDropdown
              style={styles.genderText}
                items={bloodGroupOption}
                desc="Select Blood Group"
                onSelect={selectedItem =>
                  setFieldValue('bloodGroup', selectedItem.value)
                }
                selectedValue={values.bloodGroup}
                isDisabled={false}
              />
              <View>
                <Text style={styles.sectionHeader}>
                  {' '}
                  {t('editForm.Address')}{' '}
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Enter address"
                  placeholderTextColor="gray"
                  value={values.address}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                />
              </View>
              <Pressable
                style={styles.updateButton}
                onPress={handleSubmit}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.updateButtonText}>
                    {' '}
                    {t('editForm.updatePass')}
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
}

export default EditProfile;
