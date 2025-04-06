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
import downArrow from '../../../assets/images/downarrow.png';
import indianFlag from '../../../assets/images/indianFlag.png';
import {styles} from './styles';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { ROUTE } from '../../../navigation/constant';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [t] = useTranslation();
  const navigation = useNavigation()

  const clearPhone = () => setPhone('');
  const onSubmit = () => {
    navigation.navigate(ROUTE.OTP)
  }

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
                    <Pressable onPress={clearPhone} style={styles.clearButton}>
                      <Text style={styles.clearText}>✕</Text>
                    </Pressable>
                  )}
                </View>
              </View>

              <TouchableOpacity onPress={onSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
