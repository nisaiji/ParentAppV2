import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Keyboard,
  BackHandler,
} from 'react-native';
import {styles} from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ROUTE} from '../../../../navigation/constant';
import BackgroundView from '../../../../components/BackgroundView';
import Header from '../../../../components/Header';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {axiosClient} from '../../../../services/axiosClient';
import {EndPoints} from '../../../../ParentApi';
import {errorToast, successToast} from '../../../../components/CustomToast';
import {setToken, updatePhoneInData} from '../../../../redux/authSlice';
import {globalStyle} from '../../../../theme/fonts';
import Loader from '../../../../components/Loader';
import CustomButton from '../../../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const {status} = useSelector(state => state.auth);
  const inputRefs = useRef([]);
  const navigation = useNavigation();
  const route = useRoute();
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

  const goToRouteName = () => {
    const {mainStackNavigator, tabNavigator, routes} = route.params;
    navigation.reset({
      index: 1,
      routes: [
        {
          name: mainStackNavigator,
          state: {
            routes: [
              {
                name: tabNavigator,
                state: {
                  routes,
                },
              },
            ],
          },
        },
      ],
    });
  };

  const onSubmit = async () => {
    try {
      Keyboard.dismiss();
      if (otp.join('').length !== 5) {
        return errorToast(t('validation.shortOtp'));
      }
      setLoading(true);
      const phoneNumber = route?.params
        ? await AsyncStorage.getItem('phoneUpdate')
        : status?.phone;
      const res = await axiosClient.put(
        route?.params ? EndPoints.OTP_VERIFY_UPDATE : EndPoints.OTP_VERIFY,
        {
          phone: phoneNumber,
          otp: Number(otp.join('')),
        },
      );

      if (res?.data?.statusCode === 200) {
        dispatch(setToken({token: res?.data?.result?.token}));
        if (route?.params) {
          dispatch(updatePhoneInData(phoneNumber));
          successToast(res?.data?.result);
          await AsyncStorage.removeItem('phoneUpdate');
          goToRouteName();
        } else {
          successToast(res?.data?.result?.messsage);
          navigation.navigate(ROUTE.AUTH, {screen: ROUTE.CREATE_PASSWORD});
        }
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
      const res = await axiosClient.post(EndPoints.OTP_SEND, {
        phone: status?.phone,
      });
      if (res?.data?.statusCode === 200) {
        successToast(res?.data?.result);
        setOtp(['', '', '', '', '']);
        inputRefs.current[0]?.focus();
        setTimer(30);
        setIsResendDisabled(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

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

  useEffect(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          navigation.goBack();
          return true;
        },
      );
  
      return () => {
        backHandler.remove();
      };
    }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loader />}
      <BackgroundView>
        {/* Header */}
        <Header heading={t('otp.otpVerification')} />

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          {t('otp.subtitle')} +91 {status?.phone}
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
        <View style={{flexDirection: 'row'}}>
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
        <CustomButton
          onPress={onSubmit}
          btnStyle={styles.continueButton}
          label={t('button.continue')}
        />
      </BackgroundView>
    </SafeAreaView>
  );
}
