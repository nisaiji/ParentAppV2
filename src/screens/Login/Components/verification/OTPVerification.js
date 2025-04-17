import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {ROUTE} from '../../../../navigation/constant';
import BackgroundView from '../../../../components/BackgroundView';
import Header from '../../../../components/Header';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {axiosClient} from '../../../../services/axiosClient';
import {EndPoints} from '../../../../ParentApi';
import {errorToast, successToast} from '../../../../components/CustomToast';
import {setToken} from '../../../../redux/authSlice';
import {globalStyle} from '../../../../theme/fonts';

export default function OTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const {status} = useSelector(state => state.auth);
  // console.log({status});
  const inputRefs = useRef([]);
  const navigation = useNavigation();
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const handleChange = (text, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);

    if (text && index < 4) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const onBack = () => {
    navigation.goBack();
  };

  const onSubmit = async () => {
    try {
      const res = await axiosClient.put(EndPoints.OTP_VERIFY, {
        phone: status?.phone,
        otp: Number(otp.join('')),
      });

      if (res?.data?.statusCode === 200) {
        dispatch(setToken({token: res?.data?.result?.token}));
        successToast(res?.data?.result?.messsage);
        navigation.navigate(ROUTE.EMAIL_VERIFICATION);
      }
    } catch (e) {
      // console.error(err);
      errorToast(e);
    }
  };

  const resendOtp = async () => {
    try {
      const res = await axiosClient.post(EndPoints.OTP_SEND, {
        phone: status?.phone,
      });
      if (res?.data?.statusCode === 200) {
        successToast(res?.data?.result);
        setTimer(30);
        setIsResendDisabled(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Countdown effect
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundView>
        {/* Header */}
        <Header heading={t('otp.otpVerification')} />

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          We have sent a verification code to +91 {status?.phone}
        </Text>

        {/* OTP Boxes */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputRefs.current[index] = ref)}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={text => handleChange(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
            />
          ))}
        </View>

        {/* resend otp */}
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text style={styles.grayText}>
            {isResendDisabled ? 'Resend OTP in ' + timer + 's' : ''}
          </Text>
          {!isResendDisabled && (
            <TouchableOpacity
              onPress={resendOtp}
              hitSlop={globalStyle.hitSlop10}>
              <Text style={[styles.blueText]}>Resend OTP</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Continue Button */}
        <TouchableOpacity onPress={onSubmit} style={styles.continueButton}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </BackgroundView>
    </SafeAreaView>
  );
}
