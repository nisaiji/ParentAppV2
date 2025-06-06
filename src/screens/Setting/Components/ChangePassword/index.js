/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {BackHandler, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import BackgroundView from '@src/components/BackgroundView';
import {GestureHandlerRootView, TextInput} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../../components/Header';
import {useTranslation} from 'react-i18next';
import show from '../../../../assets/images/show.png';
import hide from '../../../../assets/images/hide.png';
import {axiosClient} from '../../../../services/axiosClient';
import {EndPoints} from '../../../../ParentApi';
import {errorToast, successToast} from '../../../../components/CustomToast';
import {useNavigation} from '@react-navigation/native';
import {ROUTE} from '../../../../navigation/constant';
import Loader from '../../../../components/Loader';
import { REGEX } from '../../../../utils/Rejex';

function ChangePassword() {
  const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [t] = useTranslation();

  const validateForm = () => {
    const newErrors = {};

    if (!oldPassword) {
      newErrors.oldPassword = t('validation.oldPass');
    }
    if (!newPassword) {
      newErrors.newPassword = t('validation.newPassword');
    } else if (oldPassword === newPassword) {
      newErrors.newPassword = t('validation.samePassword');
    } else if (!REGEX.PASSWORD.test(newPassword)) {
      const missingRequirements = [];
      if (!REGEX.UPPERCASE.test(newPassword))
        missingRequirements.push(t('validation.uppercase'));
      if (!REGEX.NUMBER.test(newPassword))
        missingRequirements.push(t('validation.number'));
      if (!REGEX.SPECIALCHAR.test(newPassword))
        missingRequirements.push(t('validation.specialChar'));
      if (newPassword.length < 8)
        missingRequirements.push(t('validation.passLength'));
      newErrors.newPassword = `${t(
        'validation.include',
      )} ${missingRequirements.join(', ')}.`;
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = t('validation.confirmPassword');
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = t('validation.passNotMatch');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (validateForm()) {
      // console.log('Password updated!');
      // API call or update logic here
      try {
        setLoading(true);
        const res = await axiosClient.put(EndPoints.EDIT_PASSWORD, {
          oldPassword: oldPassword,
          newPassword,
        });
        // console.log(res.data);

        if (res.data.statusCode === 200) {
          successToast(res?.data?.result);
          // navigation.navigate(ROUTE.DASHBOARD_STACK, {screen: ROUTE.SETTING});
          navigation.navigate(ROUTE.DASHBOARD_STACK, {
            screen: ROUTE.SETTING_STACK,
            params: {
              screen: ROUTE.SETTING,
            },
          });
        }
      } catch (e) {
        // console.log(e);
        errorToast(e);
      } finally {
        setLoading(false);
      }
    }
  };

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
    <GestureHandlerRootView>
      <BackgroundView>
        {loading && <Loader />}
        <SafeAreaView style={styles.container}>
          <Header heading={t('title.changePassword')} />
          <ScrollView
            style={styles.innerContainer}
            keyboardShouldPersistTaps="handled">
            {/* Current Password */}
            <Text style={styles.label}>{t('label.oldPassword')}</Text>
            <View style={styles.inputContainerWithIcon}>
              <TextInput
                style={styles.input}
                placeholder={t('placeholder.oldPassword')}
                placeholderTextColor="#aaa"
                secureTextEntry={!showOld}
                value={oldPassword}
                onChangeText={setOldPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowOld(!showOld)}>
                <Image
                  source={showOld ? hide : show}
                  style={styles.eyeIconImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            {errors.oldPassword && (
              <Text style={styles.errorText}>{errors.oldPassword}</Text>
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
