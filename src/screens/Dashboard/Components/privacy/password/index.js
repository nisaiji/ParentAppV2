import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  TextInput,
  Platform,
  Alert,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Backbutton from '@src/assets/images/Backbutton.png';
import Eye from '@src/assets/images/Eye.png';
import openEye from '@src/assets/images/openEye.png';
import {styles} from './styles';
import {AuthContext} from '@src/context/AuthContext';
import {axiosClient} from '@src/services/axiosClient';
import {useNavigation} from '@react-navigation/native';
import {ROUTE} from '@src/navigation/constant';
import Loader from '../../../../../components/Loader';
import {useTranslation} from 'react-i18next';

export default function ParentPassword() {
  const navigation = useNavigation();
  const {fetchChildrenData} = useContext(AuthContext);
  const [t] = useTranslation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleNewPasswordChange = password => {
    setNewPassword(password);
    if (!passwordRegex.test(password)) {
      const missingRequirements = [];
      if (!/(?=.*[A-Z])/.test(password))
        missingRequirements.push('one uppercase letter');
      if (!/(?=.*\d)/.test(password)) missingRequirements.push('one number');
      if (!/(?=.*[@$!%*?&])/.test(password))
        missingRequirements.push('one special character');
      if (password.length < 8)
        missingRequirements.push('at least 8 characters');
      setNewPasswordError(
        `Password must include ${missingRequirements.join(', ')}.`,
      );
    } else {
      setNewPasswordError('');
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(
        'New password and confirm password do not match.',
      );
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleConfirmPasswordChange = password => {
    setConfirmPassword(password);
    if (password !== newPassword) {
      setConfirmPasswordError(
        'New password and confirm password do not match.',
      );
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleSave = async () => {
    if (newPasswordError || confirmPasswordError) {
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      const missingRequirements = [];
      if (!/(?=.*[A-Z])/.test(newPassword))
        missingRequirements.push('one uppercase letter');
      if (!/(?=.*\d)/.test(newPassword)) missingRequirements.push('one number');
      if (!/(?=.*[@$!%*?&])/.test(newPassword))
        missingRequirements.push('one special character');
      if (newPassword.length < 8)
        missingRequirements.push('at least 8 characters');
      setNewPasswordError(
        `Password must include ${missingRequirements.join(', ')}.`,
      );
      return;
    }

    // Alert.alert('Success', 'Password changed successfully!');
    try {
      setLoading(true);
      const res = await axiosClient.put('/parent/password-change', {
        oldPassword,
        password: newPassword,
      });
      // console.log('res', res.data);
      if (res?.data?.statusCode === 200) {
        fetchChildrenData();
        ToastAndroid.show(res.data.result, ToastAndroid.TOP, ToastAndroid.LONG);
        navigation.navigate(ROUTE.AUTH, {screen: ROUTE.PARENT_EDIT});
      }
    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.TOP, ToastAndroid.LONG);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollView}
      enableOnAndroid={true}
      extraScrollHeight={0}>
      {loading && (
        <View style={styles.loading}>
          <Loader />
        </View>
      )}
      <View style={{flex: 1}}>
        {/* Privacy and Security Section */}
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(ROUTE.AUTH, {screen: ROUTE.PARENT_EDIT})
            }>
            <Image
              resizeMode="contain"
              source={Backbutton}
              style={styles.image}
            />
          </TouchableOpacity>
          <View style={styles.sectionTitle}>
            <Text style={styles.titleText}> {t('privacy.privacyHeader')}</Text>
            <Text style={styles.subtitleText}>{t('privacy.changePass')}</Text>
          </View>
        </View>

        {/* oldPassword Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}> {t('privacy.oldPass')}</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your oldPassword" 
              placeholderTextColor="gray"
              value={oldPassword}
              onChangeText={setOldPassword}
            />
          </View>
        </View>

        {/* New Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t('privacy.newPass')}</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              secureTextEntry={!showNewPassword}
              placeholder="Enter your new password"
              placeholderTextColor="gray"
              value={newPassword}
              onChangeText={handleNewPasswordChange}
            />
            <TouchableOpacity
              onPress={() => setShowNewPassword(!showNewPassword)}
              style={showNewPassword && styles.activeEyeIcon}>
              <Image
                resizeMode="contain"
                source={showNewPassword ? openEye : Eye}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
          {newPasswordError ? (
            <Text style={styles.errorMessage}>{newPasswordError}</Text>
          ) : null}
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}> {t('privacy.confirmPass')}</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              secureTextEntry={!showConfirmPassword}
              placeholder="Confirm your new password"
              placeholderTextColor="gray"
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={showConfirmPassword && styles.activeEyeIcon}>
              <Image
                resizeMode="contain"
                source={showConfirmPassword ? openEye : Eye}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
          {confirmPasswordError ? (
            <Text style={styles.errorMessage}>{confirmPasswordError}</Text>
          ) : null}
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>{t('privacy.save')}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
