import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Keyboard,
  Image,
} from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { ROUTE } from '../../../../navigation/constant';
import BackgroundView from '../../../../components/BackgroundView';
import { useTranslation } from 'react-i18next';
import Header from '../../../../components/Header';
import { axiosClient } from '../../../../services/axiosClient';
import { EndPoints } from '../../../../ParentApi';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../../../redux/authSlice';
import { errorToast, successToast } from '../../../../components/CustomToast';
import { REGEX } from '../../../../utils/Rejex';
import Loader from '../../../../components/Loader';
import indianFlag from '../../../../assets/images/indianFlag.png';
import downArrow from '../../../../assets/images/downArrow.png';

export default function PhoneNumberVerification() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

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

  const onSubmit = async () => {
    try {
      Keyboard.dismiss()
      if (!validatePhone()) return;
      setLoading(true);
      const otpRes = await axiosClient.post(EndPoints.OTP_SEND, { phone });
      if (otpRes?.data?.statusCode === 200) {
        successToast(otpRes?.data?.result);
        navigation.navigate(ROUTE.AUTH, {
          screen: ROUTE.OTP, params: {
            mainStackNavigator: ROUTE.TAB, 
            tabNavigator: ROUTE.SETTING_STACK,
            routes: [
              { name: ROUTE.SETTING },      // 👈 push Settings first
              { name: ROUTE.EDIT_PROFILE }     // 👈 then EditProfile second
            ]
          }
        });
      }
    } catch (e) {
      errorToast(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundView>
      {loading && <Loader />}
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <Header heading={t('phoneVerification.heading')} />

        {/* Subtitle */}
        <Text style={styles.label}>{t('phoneVerification.verifyPhone')}</Text>

        {/* Phone number */}
        <View style={styles.phoneNumberContainer}>
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
          <View style={styles.inputContainer1}>
            <TextInput
              style={styles.input}
              placeholder="Phone number"
              placeholderTextColor="#aaa"
              keyboardType="phone-pad"
              maxLength={10}
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity onPress={onSubmit} style={styles.continueButton}>
          <Text style={styles.continueText}>{t('button.continue')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </BackgroundView>
  );
}
