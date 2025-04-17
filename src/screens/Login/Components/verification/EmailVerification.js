import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import leftArrow from '../../../../assets/images/leftArrow.png';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {ROUTE} from '../../../../navigation/constant';
import BackgroundView from '../../../../components/BackgroundView';
import {useTranslation} from 'react-i18next';
import Header from '../../../../components/Header';
import {axiosClient} from '../../../../services/axiosClient';
import {EndPoints} from '../../../../ParentApi';
import {useDispatch} from 'react-redux';
import {setAuth} from '../../../../redux/authSlice';
import { errorToast, successToast } from '../../../../components/CustomToast';

export default function EmailVerification() {
  const [email, setEmail] = useState('');
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onBack = () => {
    navigation.goBack();
  };

  const onSubmit = async () => {
    try {
      const res = await axiosClient.post(EndPoints.EMAIL_OTP_SEND, {email});
      if (res?.data?.statusCode === 200) {
        dispatch(setAuth({email}));
        successToast(res?.data?.result);
        navigation.navigate(ROUTE.EMAIL_OTP_VERIFICATION);
      }
    } catch (e) {
      // console.log('OTP_SEND Error:', e);
      errorToast(e);
    }
  };

  return (
    <BackgroundView>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <Header heading={t('emailVerification.heading')} />

        {/* Subtitle */}
        <Text style={styles.subtitle}>Verify your email</Text>

        {/* OTP Boxes */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="#aaa"
            keyboardType="phone-pad"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Continue Button */}
        <TouchableOpacity onPress={onSubmit} style={styles.continueButton}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </BackgroundView>
  );
}
