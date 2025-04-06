import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import leftArrow from '../../../../assets/images/leftArrow.png';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { ROUTE } from '../../../../navigation/constant';
import BackgroundView from '../../../../components/BackgroundView';
import Header from '../../../../components/Header';
import { useTranslation } from 'react-i18next';

export default function EmailOTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const inputRefs = useRef([]);
  const navigation = useNavigation()
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

  const onBack = () => {
    navigation.goBack()
  }

  const onSubmit = () => {
    navigation.navigate(ROUTE.CREATE_PASSWORD)
  }

  return (
    <BackgroundView>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <Header heading={t('otp.otpVerification')} />

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          We have sent a verification code to +91 7853065649
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
        <Text style={styles.subtitle}>
          <Text style={styles.grayText}>Resend otp in </Text>30
        </Text>

        {/* Continue Button */}
        <TouchableOpacity onPress={onSubmit} style={styles.continueButton}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </BackgroundView>
  );
}