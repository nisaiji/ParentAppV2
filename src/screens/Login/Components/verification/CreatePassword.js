import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import leftArrow from '../../../../assets/images/leftArrow.png';
import show from '../../../../assets/images/show.png';
import hide from '../../../../assets/images/hide.png';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {ROUTE} from '../../../../navigation/constant';
import {useTranslation} from 'react-i18next';
import BackgroundView from '../../../../components/BackgroundView';
import Header from '../../../../components/Header';
import {axiosClient} from '../../../../services/axiosClient';
import {EndPoints} from '../../../../ParentApi';
import {errorToast, successToast} from '../../../../components/CustomToast';

export default function CreatePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigation = useNavigation();
  const [t] = useTranslation();

  const onSubmit = async () => {
    try {
      const res = await axiosClient.put(EndPoints.PASSWORD_UPDATE, {
        password: newPassword,
      });
      if (res?.data?.statusCode === 200) {
        successToast(res?.data?.result);
        navigation.navigate(ROUTE.SUCCESS_PAGE, {
          message: t('passwordSuccess'),
          nextRoute: ROUTE.PARENT_DETAIL,
        });
      }
    } catch (e) {
      errorToast(e);
    }
  };

  return (
    <BackgroundView>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <Header heading={t('createPassword.heading')} noBack={true} />

        {/* New Password */}
        <Text style={styles.label}>New Password</Text>
        <View style={styles.inputContainerWithIcon}>
          <TextInput
            style={styles.input}
            placeholder="Create new password"
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

        {/* Confirm Password */}
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.inputContainerWithIcon}>
          <TextInput
            style={styles.input}
            placeholder="Confirm new password"
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

        {/* Continue Button */}
        <TouchableOpacity
          onPress={onSubmit}
          style={[styles.continueButton, {marginTop: 35}]}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </BackgroundView>
  );
}
