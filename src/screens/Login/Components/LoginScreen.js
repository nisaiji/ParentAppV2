import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import logo from '../../../assets/images/logo.png';
import downArrow from '../../../assets/images/downArrow.png';
import indianFlag from '../../../assets/images/indianFlag.png';
import cross from '../../../assets/images/cross.png';
import {styles} from './styles';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {ROUTE} from '../../../navigation/constant';
import globalStyles from '../../../theme/styles';
import {axiosClient} from '../../../services/axiosClient';
import {EndPoints} from '../../../ParentApi';
import {successToast} from '../../../components/CustomToast';
import {useDispatch, useSelector} from 'react-redux';
import {setAuth} from '../../../redux/authSlice';

export default function Login() {
  const [phone, setPhone] = useState('7771872012');
  const [t] = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const clearPhone = () => setPhone('');
  const {token, status} = useSelector(state => state.auth);
  console.log(token,status);

  const getStatus = async () => {
    try {
      const res = await axiosClient.post(EndPoints.GET_STATUS, {phone});
      const data = res?.data?.result;

      if (data) {
        dispatch(setAuth({...data, phone}));
      }
      // console.log(data);

      if (!data?.phoneVerified) {
        try {
          const res = await axiosClient.post(EndPoints.OTP_SEND, {phone});
          if (res?.data?.statusCode === 200) {
            successToast(res?.data?.result);
            navigation.navigate(ROUTE.OTP);
          }
        } catch (e) {
          // console.log('OTP_SEND Error:', e);
          errorToast(e);
        }
      } else if (!data?.emailVerified) {
        navigation.navigate(ROUTE.EMAIL_VERIFICATION);
      }
    } catch (e) {
      // console.log('GET_STATUS Error:', e);
      errorToast(e);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{t('login.signupOrLogin')}</Text>
              <View style={styles.phoneInputWrapper}>
                {/* Country Code */}
                <TouchableOpacity disabled style={styles.countryCodeContainer}>
                  <Image
                    source={indianFlag}
                    style={styles.flag}
                    resizeMode="contain"
                  />
                  <Text style={styles.code}>+91</Text>
                  <Image
                    source={downArrow}
                    style={styles.downArrow}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                {/* Phone Number Input */}
                <View style={styles.phoneInputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Phone number"
                    placeholderTextColor="#aaa"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                  />
                  {phone.length > 0 && (
                    <Pressable
                      onPress={clearPhone}
                      style={styles.clearButton}
                      hitSlop={globalStyles.hitSlop10}>
                      <Image
                        source={cross}
                        style={styles.crossIcon}
                        resizeMode="contain"
                      />
                    </Pressable>
                  )}
                </View>
              </View>

              <TouchableOpacity onPress={getStatus} style={styles.button}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
