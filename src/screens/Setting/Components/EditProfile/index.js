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
import { useTranslation } from 'react-i18next';

function EditProfile() {
  const [t] = useTranslation();
  const genderOptions = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Other', value: 'Other'},
  ];

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    gender: Yup.string().required('Please select a gender'),
    age: Yup.number()
      .required('Age is required')
      .min(1, 'Age must be at least 1')
      .max(150, 'Age must be realistic'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    contact: Yup.string().required('Contact is required'),
    qualification: Yup.string().required('Qualification is required'),
    occupation: Yup.string().required('Occupation is required'),
    address: Yup.string().required('Address is required'),
  });

  return (
    <GestureHandlerRootView>
      <BackgroundView>
        <SafeAreaView style={styles.container}>
          <Header heading={t('title.editProfile')} />
          <ScrollView style={styles.innerContainer}>
            <View style={styles.childImgContainer}>
              <Image
                source={childDummy}
                style={styles.childImg}
                resizeMode="contain"
              />
              <TouchableOpacity style={styles.pencilIconView}>
                <Image
                  source={circlePencilIcon}
                  style={styles.pencilIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                gender: '',
                age: '',
                email: '',
                contact: '',
                qualification: '',
                occupation: '',
                address: '',
              }}
              validationSchema={validationSchema}
              onSubmit={values => {
                console.log('Submitted Profile:', values);
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

                  <View style={styles.formInput}>
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
                  </View>

                  <View style={styles.formInput}>
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
                  </View>

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
                    <Text style={styles.buttonLabel}>{t('button.updateSave')}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </ScrollView>
        </SafeAreaView>
      </BackgroundView>
    </GestureHandlerRootView>
  );
}

export default EditProfile;
