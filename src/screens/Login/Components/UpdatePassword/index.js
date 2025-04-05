import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {Fonts} from '@src/theme/fonts';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {axiosClient} from '@src/services/axiosClient';
import {useNavigation} from '@react-navigation/native';
// import update from '@src/assets/images/update.png';
import {ROUTE} from '@src/navigation/constant';
import styles from './styles';
import Eye from '@src/assets/images/Eye.png';
import openEye from '@src/assets/images/openEye.png';
import {AuthContext} from '@src/context/AuthContext';
import FastImage from 'react-native-fast-image';
import Loader from '../../../../components/Loader';
import {useTranslation} from 'react-i18next';

export default function UpdatePassword() {
  const {setParentUsername} = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handlePasswordVisibility = field => {
    if (field === 'password') {
      setIsPasswordVisible(!isPasswordVisible);
    } else if (field === 'confirmPassword') {
      setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = async values => {
    // console.log(values);
    try {
      setLoading(true);
      const res = await axiosClient.put('parent/auth-update', values);
      if (res?.data?.statusCode === 200) {
        setParentUsername(values.username);
        console.log(res.result);
        setIsLogin(true);
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{name: ROUTE.TAB}],
          });
        }, 3000);
      }
    } catch (e) {
      console.log('error in update password', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isLogin ? (
        <View
          style={{
            backgroundColor: '#4e2973',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FastImage
            style={{height: 300, width: 300}}
            source={require('@src/assets/images/update.gif')}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={{fontSize: 24, fontFamily: Fonts.BOLD, color: 'white'}}>
            {t('loginForm.passUpdate')}
          </Text>
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            {loading && (
              <View style={styles.loading}>
                <Loader />
              </View>
            )}
            <View style={styles.container}>
              <View style={styles.header}>
                <View style={styles.logoContainer}>
                  <Text style={styles.logoText}>{t('loginForm.A')} </Text>
                </View>
                <Text style={styles.logoTitle}> {t('loginForm.LOGO')}</Text>
              </View>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <View style={styles.formContainer}>
                    <Text style={styles.formTitle}>
                      {t('loginForm.updateDetails')}
                    </Text>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>
                        {' '}
                        {t('loginForm.createUser')}
                      </Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter your username"
                        placeholderTextColor="black"
                        onChangeText={text =>
                          handleChange('username')(
                            text.charAt(0).toUpperCase() +
                              text.slice(1).toLowerCase(),
                          )
                        }
                        onBlur={handleBlur('username')}
                        value={values.username}
                      />
                      {touched.username && errors.username && (
                        <Text style={styles.errorText}>{errors.username}</Text>
                      )}
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>{t('loginForm.newPass')}</Text>
                      <View style={styles.passwordInputContainer}>
                        <TextInput
                          style={styles.inputWithIcon}
                          placeholder="Enter your new password"
                          placeholderTextColor="black"
                          secureTextEntry={!isPasswordVisible}
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          value={values.password}
                        />
                        {/* <TouchableOpacity
                          style={styles.passwordVisibilityToggle}
                          onPress={() => handlePasswordVisibility('password')}>
                          {isPasswordVisible ? (
                            <Icon name="eye" size={22} color="black" />
                          ) : (
                            <Icon name="eye-slash" size={22} color="black" />
                          )}
                        </TouchableOpacity> */}
                        <TouchableOpacity
                          style={styles.passwordVisibilityToggle}
                          onPress={() => handlePasswordVisibility('password')}>
                          <Image
                            source={isPasswordVisible ? openEye : Eye}
                            style={styles.eyeIcon}
                          />
                        </TouchableOpacity>
                      </View>
                      {touched.password && errors.password && (
                        <Text style={styles.errorText}>{errors.password}</Text>
                      )}
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>
                        {' '}
                        {t('loginForm.confirmPass')}
                      </Text>
                      <View style={styles.passwordInputContainer}>
                        <TextInput
                          style={styles.inputWithIcon}
                          placeholder="Confirm your new password"
                          placeholderTextColor="black"
                          secureTextEntry={!isConfirmPasswordVisible}
                          onChangeText={handleChange('confirmPassword')}
                          onBlur={handleBlur('confirmPassword')}
                          value={values.confirmPassword}
                        />
                        {/* <TouchableOpacity
                          style={styles.passwordVisibilityToggle}
                          onPress={() =>
                            handlePasswordVisibility('confirmPassword')
                          }
                        >
                          {isConfirmPasswordVisible ? (
                            <Icon name="eye" size={22} color="black" />
                          ) : (
                            <Icon name="eye-slash" size={22} color="black" />
                          )}
                        </TouchableOpacity> */}
                        <TouchableOpacity
                          style={styles.passwordVisibilityToggle}
                          onPress={() =>
                            handlePasswordVisibility('confirmPassword')
                          }>
                          <Image
                            source={isConfirmPasswordVisible ? openEye : Eye}
                            style={styles.eyeIcon}
                          />
                        </TouchableOpacity>
                      </View>
                      {touched.confirmPassword && errors.confirmPassword && (
                        <Text style={styles.errorText}>
                          {errors.confirmPassword}
                        </Text>
                      )}
                    </View>

                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleSubmit}>
                      <Text style={styles.buttonText}>
                        {t('loginForm.updatePass')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </>
  );
}
