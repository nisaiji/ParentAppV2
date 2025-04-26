import React, {useEffect, useRef, useState} from 'react';
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
import Header from '../../../../components/Header';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {axiosClient} from '../../../../services/axiosClient';
import {EndPoints} from '../../../../ParentApi';
import {errorToast, successToast} from '../../../../components/CustomToast';
import {globalStyle} from '../../../../theme/fonts';
import {setAuth} from '../../../../redux/authSlice';
import Loader from '../../../../components/Loader';

export default function EmailOTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const {status} = useSelector(state => state.auth);
  const inputRefs = useRef([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [t] = useTranslation();

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

  const onSubmit = async () => {
    try {
      if (otp.join('').length !== 5) {
        return errorToast(t('validation.shortOtp'));
      }
      setLoading(true);
      const res = await axiosClient.put(EndPoints.EMAIL_OTP_VERIFY, {
        otp: Number(otp.join('')),
      });
      if (res?.data?.statusCode === 200) {
        successToast(res?.data?.result?.messsage);
        dispatch(setAuth({emailVerified: true}));
        navigation.navigate(ROUTE.AUTH, {
          screen: ROUTE.PARENT_DETAIL,
        });
      }
    } catch (e) {
      errorToast(e);
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.post(EndPoints.EMAIL_OTP_SEND, {
        phone: status?.phone,
      });
      if (res?.data?.statusCode === 200) {
        successToast(res?.data?.result);
        setTimer(30);
        setIsResendDisabled(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
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
    <BackgroundView>
      {loading && <Loader />}
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <Header heading={t('otp.otpVerification')} />

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          {t('otp.subtitle')} {status?.email}
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
            {isResendDisabled ? t('otp.resendOtpIn') + timer + 's' : ''}
          </Text>
          {!isResendDisabled && (
            <TouchableOpacity
              onPress={resendOtp}
              hitSlop={globalStyle.hitSlop10}>
              <Text style={[styles.blueText]}>{t('button.resendOtp')}</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Continue Button */}
        <TouchableOpacity onPress={onSubmit} style={styles.continueButton}>
          <Text style={styles.continueText}>{t('button.continue')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </BackgroundView>
  );
}
