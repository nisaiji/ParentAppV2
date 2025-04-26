import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Keyboard,
} from 'react-native';
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
import {REGEX} from '../../../../utils/Rejex';
import {globalStyle} from '../../../../theme/fonts';
import {useDispatch} from 'react-redux';
import {setAuth} from '../../../../redux/authSlice';
import Loader from '../../../../components/Loader';

export default function CreatePassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [t] = useTranslation();

  const onSubmit = async () => {
    try {
      Keyboard.dismiss();
      if (!password) {
        return errorToast(t('validation.newPassword'));
      } else if (!REGEX.PASSWORD.test(password)) {
        const missingRequirements = [];
        if (!REGEX.UPPERCASE.test(password))
          missingRequirements.push(t('validation.uppercase'));
        if (!REGEX.NUMBER.test(password))
          missingRequirements.push(t('validation.number'));
        if (!REGEX.SPECIALCHAR.test(password))
          missingRequirements.push(t('validation.specialChar'));
        if (password.length < 8)
          missingRequirements.push(t('validation.passLength'));
        return errorToast(
          `${t('validation.include')} ${missingRequirements.join(', ')}.`,
        );
      } else if (!confirmPassword) {
        return errorToast(t('validation.confirmPassword'));
      } else if (password !== confirmPassword) {
        return errorToast(t('validation.passNotMatch'));
      }
      setLoading(true);
      const res = await axiosClient.put(EndPoints.PASSWORD_UPDATE, {
        password,
      });
      if (res?.data?.statusCode === 200) {
        successToast(res?.data?.result);
        dispatch(setAuth({passwordUpdated: true}));
        navigation.navigate(ROUTE.SUCCESS_PAGE, {
          message: t('passwordSuccess'),
          nextRoute: ROUTE.EMAIL_VERIFICATION,
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
        <Header heading={t('createPassword.heading')} noBack={true} />

        {/* New Password */}
        <Text style={styles.label}>{t('createPassword.newPassword')}</Text>
        <View style={styles.inputContainerWithIcon}>
          <TextInput
            style={styles.input}
            placeholder={t('placeholder.createPassword')}
            placeholderTextColor="#aaa"
            secureTextEntry={!showNew}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowNew(!showNew)}
            hitSlop={globalStyle.hitSlop10}>
            <Image
              source={showNew ? hide : show}
              style={styles.eyeIconImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <Text style={styles.label}>{t('createPassword.confirmPassword')}</Text>
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
            onPress={() => setShowConfirm(!showConfirm)}
            hitSlop={globalStyle.hitSlop10}>
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
          <Text style={styles.continueText}>{t('button.continue')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </BackgroundView>
  );
}
