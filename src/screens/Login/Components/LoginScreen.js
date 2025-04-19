import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import logo from '../../../assets/images/logo.png';
import downArrow from '../../../assets/images/downArrow.png';
import indianFlag from '../../../assets/images/indianFlag.png';
import cross from '../../../assets/images/cross.png';
import show from '../../../assets/images/show.png';
import hide from '../../../assets/images/hide.png';

import {styles} from './styles';
import {styles as styles2} from './verification/styles';
import globalStyles from '../../../theme/styles';
import {globalStyle} from '../../../theme/fonts';
import {ROUTE} from '../../../navigation/constant';
import {axiosClient} from '../../../services/axiosClient';
import {EndPoints} from '../../../ParentApi';
import {errorToast, successToast} from '../../../components/CustomToast';
import {setAuth, setToken} from '../../../redux/authSlice';
import {REGEX} from '../../../utils/Rejex';

export default function Login() {
  const [phone, setPhone] = useState('7771872012');
  const [password, setPassword] = useState('Test@123');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const {status, token} = useSelector(state => state.auth);
  const [t] = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const clearPhone = () => setPhone('');

  const validatePhone = () => {
    if (!phone) {
      errorToast(t('validation.requiredPhone'));
      return false;
    } else if (phone.length < 10) {
      errorToast(t('validation.shortPhone'));
      return false;
    } else if (!REGEX.PHONE.test(phone)) {
      errorToast(t('validation.invalidPhone'));
      return false;
    }
    return true;
  };

  // console.log(token, status);
  const getStatus = async () => {
    if (!validatePhone()) return;

    try {
      const res = await axiosClient.post(EndPoints.GET_STATUS, {phone});
      const data = res?.data?.result;

      if (!data) return;

      dispatch(setAuth({...data, phone}));

      if (data.phoneVerified && data.passwordUpdated) {
        setShowPasswordInput(true);
      } else {
        const otpRes = await axiosClient.post(EndPoints.OTP_SEND, {phone});
        if (otpRes?.data?.statusCode === 200) {
          successToast(otpRes?.data?.result);
          navigation.navigate(ROUTE.OTP);
        }
      }
    } catch (e) {
      errorToast(e);
    }
  };

  const login = async () => {
    if (!validatePhone()) return;

    if (!password) {
      return errorToast(t('validation.requiredPassword'));
    } else if (password.length < 8) {
      return errorToast(t('validation.weakPassword'));
    }

    try {
      const res = await axiosClient.post(EndPoints.LOGIN, {phone, password});
      if (res?.data?.statusCode === 200) {
        const token = res?.data?.result?.accessToken;
        // console.log(token);

        dispatch(setToken({token}));

        const {emailVerified, personalInfoUpdated} = status;
        // console.log(emailVerified, personalInfoUpdated);

        if (!emailVerified) {
          // console.log('email');
          navigation.navigate(ROUTE.EMAIL_VERIFICATION);
        } else if (!personalInfoUpdated) {
          // console.log('parent');
          navigation.navigate(ROUTE.PARENT_DETAIL);
        } else {
          // console.log('tab');
          navigation.navigate(ROUTE.TAB);
        }
      }
    } catch (e) {
      errorToast(e);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{t('login.signupOrLogin')}</Text>
              <View style={styles.phoneInputWrapper}>
                {/* Country Code */}
                <TouchableOpacity disabled style={styles.countryCodeContainer}>
                  <Image
                    source={indianFlag}
                    style={styles.flag}
                    resizeMode="contain"
                  />
                  <Text style={styles.code}>+91</Text>
                  <Image
                    source={downArrow}
                    style={styles.downArrow}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                {/* Phone Number Input */}
                <View style={styles.phoneInputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Phone number"
                    placeholderTextColor="#aaa"
                    keyboardType="phone-pad"
                    maxLength={10}
                    value={phone}
                    onChangeText={setPhone}
                  />
                  {phone.length > 0 && (
                    <Pressable
                      onPress={clearPhone}
                      style={styles.clearButton}
                      hitSlop={globalStyles.hitSlop10}>
                      <Image
                        source={cross}
                        style={styles.crossIcon}
                        resizeMode="contain"
                      />
                    </Pressable>
                  )}
                </View>
              </View>

              {showPasswordInput && (
                <View style={styles2.inputContainerWithIcon}>
                  <TextInput
                    style={styles2.input}
                    placeholder={t('placeholder.enterPassword')}
                    placeholderTextColor="#aaa"
                    secureTextEntry={!showNew}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    style={styles2.eyeIcon}
                    onPress={() => setShowNew(!showNew)}
                    hitSlop={globalStyle.hitSlop10}>
                    <Image
                      source={showNew ? hide : show}
                      style={styles2.eyeIconImage}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              )}

              <TouchableOpacity
                onPress={showPasswordInput ? login : getStatus}
                style={styles.button}>
                <Text style={styles.buttonText}>{t('button.continue')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
