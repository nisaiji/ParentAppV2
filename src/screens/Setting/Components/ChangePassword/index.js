/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import BackgroundView from '@src/components/BackgroundView';
import {GestureHandlerRootView, TextInput} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../../components/Header';
import {useTranslation} from 'react-i18next';
import show from '../../../../assets/images/show.png';
import hide from '../../../../assets/images/hide.png';

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [t] = useTranslation();

  const validateForm = () => {
    const newErrors = {};

    if (!currentPassword) {
      newErrors.currentPassword = t('validation.requiredPassword');
    }
    if (!newPassword) {
      newErrors.newPassword = t('validation.requiredNewPassword');
    } else if (newPassword.length < 8) {
      newErrors.newPassword = t('validation.weakPassword');
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = t('validation.requiredConfirmPassword');
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = t('validation.passwordMismatch');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (validateForm()) {
      console.log('Password updated!');
      // API call or update logic here
    }
  };

  return (
    <GestureHandlerRootView>
      <BackgroundView>
        <SafeAreaView style={styles.container}>
          <Header heading={t('title.updatePassword')} />
          <ScrollView
            style={styles.innerContainer}
            keyboardShouldPersistTaps="handled">
            {/* Current Password */}
            <Text style={styles.label}>{t('label.currentPassword')}</Text>
            <View style={styles.inputContainerWithIcon}>
              <TextInput
                style={styles.input}
                placeholder={t('placeholder.currentPassword')}
                placeholderTextColor="#aaa"
                secureTextEntry={!showCurrent}
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowCurrent(!showCurrent)}>
                <Image
                  source={showCurrent ? hide : show}
                  style={styles.eyeIconImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            {errors.currentPassword && (
              <Text style={styles.errorText}>{errors.currentPassword}</Text>
            )}

            {/* New Password */}
            <Text style={styles.label}>{t('label.newPassword')}</Text>
            <View style={styles.inputContainerWithIcon}>
              <TextInput
                style={styles.input}
                placeholder={t('placeholder.createPassword')}
                placeholderTextColor="#aaa"
                secureTextEntry={!showNew}
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowNew(!showNew)}>
                <Image
                  source={showNew ? hide : show}
                  style={styles.eyeIconImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            {errors.newPassword && (
              <Text style={styles.errorText}>{errors.newPassword}</Text>
            )}

            {/* Confirm Password */}
            <Text style={styles.label}>{t('label.confirmPassword')}</Text>
            <View style={styles.inputContainerWithIcon}>
              <TextInput
                style={styles.input}
                placeholder={t('placeholder.confirmPassword')}
                placeholderTextColor="#aaa"
                secureTextEntry={!showConfirm}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirm(!showConfirm)}>
                <Image
                  source={showConfirm ? hide : show}
                  style={styles.eyeIconImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

            {/* Continue Button */}
            <TouchableOpacity
              onPress={onSubmit}
              style={[styles.continueButton, {marginTop: 35}]}>
              <Text style={styles.continueText}>{t('button.update')}</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </BackgroundView>
    </GestureHandlerRootView>
  );
}

export default ChangePassword;
