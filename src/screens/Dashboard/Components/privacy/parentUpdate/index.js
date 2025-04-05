import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import Backbutton from '@src/assets/images/Backbutton.png';
import Path2 from '@src/assets/images/Path2.png';
import Email from '@src/assets/images/Email.png';
import India from '@src/assets/images/India.png';
import {useNavigation} from '@react-navigation/native';
import {ROUTE} from '@src/navigation/constant';
import {styles} from './styles';
import {AuthContext} from '@src/context/AuthContext';
import {axiosClient} from '@src/services/axiosClient';
import Loader from '../../../../../components/Loader';
import {useTranslation} from 'react-i18next';

function ParentUpdate() {
  const {parentEmail, setAuth, phone, fetchChildrenData} =
    useContext(AuthContext);
  const [email, setParentEmail] = useState(parentEmail);
  const [phoneNumber, setPhoneNumber] = useState(phone);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {t} = useTranslation();

  const handleEmailChange = text => {
    setParentEmail(text.toLowerCase());
  };

  const handlePhoneNumberChange = text => {
    setPhoneNumber(text);
  };

  const validateData = () => {
    if (!email.trim()) return  t('privacy.emailReq');
    if (!/\S+@\S+\.\S+/.test(email)) return t('privacy.invalidEmail');
    if (!phoneNumber.trim()) return t('privacy.PhoneReq');
    if (!/^[1-5]\d{9}$/.test(phoneNumber))
      return  t('privacy.phoneCriteria');
    return '';
  };

  const handleSave = async () => {
    try {
      const error = validateData();
      if (error) {
        ToastAndroid.show(error, ToastAndroid.TOP, ToastAndroid.LONG);
        return;
      }
      setLoading(true);
      const res = await axiosClient.put('/parent/profile-update', {
        email,
        phone: phoneNumber,
      });
      if (res?.data?.statusCode === 200) {
        setAuth(email, phone);
        fetchChildrenData();
        console.log(res.data);
        ToastAndroid.show(res.data.result, ToastAndroid.TOP, ToastAndroid.LONG);
        navigation.navigate(ROUTE.TAB);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      {loading && (
        <View style={styles.loading}>
          <Loader />
        </View>
      )}
      <View style={styles.container}>
        {/* Privacy and Security Section */}
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTE.DASHBOARD)}>
            <Image
              resizeMode="contain"
              source={Backbutton}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>{t('privacy.privacyHeader')}</Text>
        </View>

        {/* Email Section */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t('privacy.yourEmail')}</Text>
          
          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={handleEmailChange}
              placeholder= {t('privacy.enterEmail')}
              placeholderTextColor={'gray'}
              keyboardType="email-address"
            />
            <Image
              resizeMode="contain"
              source={Email}
              style={styles.inputIcon}
            />
          </View>
        </View>

        {/* Phone Number Section */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t('privacy.phone')} </Text>
          
          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              placeholder= {t('privacy.enterPhone')}
              placeholderTextColor={'gray'}
              keyboardType="phone-pad"
            />
            <Image
              resizeMode="contain"
              source={India}
              style={styles.inputIcon}
            />
          </View>
        </View>

        {/* Change Password Section */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t('privacy.changePass')} </Text>
          <Text style={styles.description}>{t('privacy.updatePass')} </Text>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => navigation.navigate(ROUTE.PARENT_PRIVACY)}>
            <Text style={styles.updateButtonText}>
              {t('privacy.tapUpdate')}
            </Text>
            <Image
              resizeMode="contain"
              source={Path2}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>{t('privacy.save')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ParentUpdate;
