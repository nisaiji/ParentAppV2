import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import {Picker} from '@react-native-picker/picker';
import Backbutton from '@src/assets/images/Backbutton.png';
import {useNavigation} from '@react-navigation/native';
import {ROUTE} from '@src/navigation/constant';
import {axiosClient} from '@src/services/axiosClient';
import {styles} from './styles';
import Loader from '../../../../components/Loader';
import {useTranslation} from 'react-i18next';
import CustomDropdown from '../../../../components/CustomDropDown';

function ParentEdit() {
  const navigation = useNavigation();
  const [parent, setParent] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(parent);
  const {t} = useTranslation();

  const genderOption = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Other', value: 'Other'},
  ];

  const getParent = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/parent/get-info');
      setParent(res.data.result);
    } catch (error) {
      ToastAndroid.show(
        'Failed to load parent info',
        ToastAndroid.TOP,
        ToastAndroid.LONG,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getParent();
  }, []);

  const capitalizeFirstLetter = string => {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const validateData = parent => {
    if (!parent.fullname.trim()) return 'Parent fullname is required';
    if (/\d/.test(parent.fullname))
      return 'Parent fullname cannot contain numbers';
    if (!parent.age.trim()) return 'Age is required';
    if (parent.age < 18 || parent.age > 100)
      return 'Age must be a number between 18 and 100';
    if (!parent.gender.trim()) return 'Gender is required';
    if (!parent.address.trim()) return 'Address is required';
    if (!parent.qualification.trim()) return 'Qualification is required';
    if (!parent.occupation.trim()) return 'Occupation is required';
    return '';
  };

  const handleFormSubmit = async values => {
    try {
      const error = validateData(values);
      if (error) {
        ToastAndroid.show(error, ToastAndroid.TOP, ToastAndroid.LONG);
        return;
      }
      setLoading(true);
      const res = await axiosClient.put('/parent/profile-info-update', {
        fullname: capitalizeFirstLetter(values.fullname),
        age: values.age,
        gender: values.gender,
        address: capitalizeFirstLetter(values.address),
        qualification: capitalizeFirstLetter(values.qualification),
        occupation: capitalizeFirstLetter(values.occupation),
      });
      if (res?.data?.statusCode === 200) {
        ToastAndroid.show(res.data.result, ToastAndroid.TOP, ToastAndroid.LONG);
        navigation.navigate(ROUTE.DASHBOARD);
      }
    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.TOP, ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        fullname: parent.fullname || '',
        age: parent.age?.toString() || '',
        gender: parent.gender || '',
        address: parent.address || '',
        qualification: parent.qualification || '',
        occupation: parent.occupation || '',
      }}
      enableReinitialize
      onSubmit={handleFormSubmit}>
      {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
        <ScrollView>
           {loading && (
              <View style={styles.loading}>
                <Loader />
              </View>
            )}
            <View style={styles.container}>
              <View style={styles.header}>
                <Pressable
                  onPress={() =>
                    navigation.navigate(ROUTE.TAB, {screen: ROUTE.DASHBOARD})
                  }>
                  <Image
                    source={Backbutton}
                    style={styles.backButton}
                    resizeMode="contain"
                  />
                </Pressable>
                <Text style={styles.headerText}>
                  {t('profile.editProfile')}{' '}
                </Text>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>{t('profile.yourName')}</Text>
                <TextInput
                  style={styles.input}
                  placeholder= {t('editForm.enterFull')}
                  placeholderTextColor="gray"
                  value={values.fullname}
                  onChangeText={handleChange('fullname')}
                  onBlur={handleBlur('fullname')}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>{t('profile.age')}</Text>
                <TextInput
                  style={styles.input}
                  placeholder= {t('editForm.enterAge')}
                  placeholderTextColor="gray"
                  keyboardType="numeric"
                  value={values.age}
                  onChangeText={handleChange('age')}
                  onBlur={handleBlur('age')}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.genderLabel}>{t('profile.gender')}</Text>
                <CustomDropdown
                  items={genderOption}
                  desc= {t('editForm.selectGender')}
                  onSelect={selectedItem =>
                    setFieldValue('gender', selectedItem.value)
                  }
                  selectedValue={values.gender}
                  isDisabled={false}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>{t('profile.Address')}</Text>
                <TextInput
                  style={styles.input}
                  placeholder= {t('editForm.enterAddress')}
                  placeholderTextColor="gray"
                  value={values.address}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>{t('profile.Qualification')}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={t('editForm.enterQualification')}
                  placeholderTextColor="gray"
                  value={values.qualification}
                  onChangeText={handleChange('qualification')}
                  onBlur={handleBlur('qualification')}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>{t('profile.occupation')}</Text>
                <TextInput
                  style={styles.input}
                  placeholder= {t('editForm.enterOccupation')}
                  placeholderTextColor="gray"
                  value={values.occupation}
                  onChangeText={handleChange('occupation')}
                  onBlur={handleBlur('occupation')} 
                />
              </View>
              <TouchableOpacity
                style={styles.updateButton}
                onPress={handleSubmit}>
                <Text style={styles.updateButtonText}>
                  {t('profile.updateProfile')}
                </Text>
              </TouchableOpacity>
            </View>
        </ScrollView>
      )}
    </Formik>
  );
}

export default ParentEdit;
