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
import DropdownComponent from '../../../../components/DropdownComponent';
import {Colors} from '../../../../theme/fonts';
import DatePicker from 'react-native-date-picker';

const EditChild = () => {
  const [t] = useTranslation();
  const [dob, setDob] = useState(new Date());
  const [open, setOpen] = useState(false);

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
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    gender: Yup.string().required('Please select a gender'),
    bloodGroup: Yup.string().required('Please select a blood group'),
    dob: Yup.string().required('Date of birth is required'),
    address: Yup.string().required('Address is required'),
  });

  return (
    <GestureHandlerRootView>
      <BackgroundView>
        <SafeAreaView style={styles.container}>
          <Header heading={t('title.childSetting')} />
          <ScrollView style={styles.innerContainer}>
            <View style={styles.header}>
              <Text style={styles.schoolName}>IPS Academy</Text>
              <View style={styles.classContainer}>
                <Text style={styles.classSec}>11th - C</Text>
              </View>
            </View>
            <View style={styles.childImgContainer}>
              <Image
                source={childDummy}
                style={styles.childImg}
                resizeMode="contain"
              />
              <Image
                source={circlePencilIcon}
                style={styles.pencilIcon}
                resizeMode="contain"
              />
            </View>

            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                gender: '',
                bloodGroup: '',
                dob: '',
                address: '',
              }}
              validationSchema={validationSchema}
              onSubmit={values => {
                console.log('Form submitted with:', values);
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
                        {dob ? dob.toLocaleDateString() : 'MM/DD/YYYY'}
                      </Text>
                    </TouchableOpacity>

                    <DatePicker
                      modal
                      open={open}
                      date={dob}
                      mode="date"
                      theme="dark"
                      onConfirm={date => {
                        setOpen(false);
                        setDob(date);
                      }}
                      onCancel={() => {
                        setOpen(false);
                      }}
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
          </ScrollView>
        </SafeAreaView>
      </BackgroundView>
    </GestureHandlerRootView>
  );
};

export default EditChild;
