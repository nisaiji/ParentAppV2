import {useContext, useState} from 'react';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import logo from '@src/assets/images/logo.png';
import {
  TouchableOpacity,
  View,
  TextInput,
  Text,
  ToastAndroid,
  KeyboardAvoidingView,
  Image,
  ScrollView,
} from 'react-native';
import * as yup from 'yup';
import Eye from '@src/assets/images/Eye.png';
import openEye from '@src/assets/images/openEye.png';
import {axiosClient} from '@src/services/axiosClient';
import {styles} from './styles';
import {ROUTE} from '@src/navigation/constant';
import {AuthContext} from '@src/context/AuthContext';
import Loader from '../../../../components/Loader';
import {useTranslation} from 'react-i18next';

export default function LoginForm() {
  const {login} = useContext(AuthContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const userSchemaValidation = yup.object({
    user: yup.string().required('User is required'),
    password: yup
      .string()
      .min(8, 'Password must have at least 8 characters')
      .required('Password is required'),
  });

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <Formik
            initialValues={{
              user: '',
              password: '',
            }}
            validationSchema={userSchemaValidation}
            onSubmit={async values => {
              // console.log('Login pressed');
              try {
                setLoading(true);
                const res = await axiosClient.post('/parent/login', {
                  user: values.user.trim(),
                  password: values.password,
                });
                // console.log(res.data);
                if (res?.data?.statusCode === 200) {
                  ToastAndroid.show(
                    'Login Successful',
                    ToastAndroid.TOP,
                    ToastAndroid.LONG,
                  );
                  login(res.data.result.accessToken);
                  if (res?.data?.result?.isLoginAlready === true) {
                    navigation.reset({
                      index: 0,
                      routes: [{name: ROUTE.TAB}],
                    });
                  } else {
                    // console.log('ftl');
                    navigation.navigate(ROUTE.AUTH, {
                      screen: ROUTE.UPDATE_PASSWORD,
                    });
                  }
                }
              } catch (error) {
                ToastAndroid.show(error, ToastAndroid.LONG, ToastAndroid.TOP);
              } finally {
                setLoading(false);
              }
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              resetForm,
            }) => (
              <View>
                {loading && (
                  <View style={styles.loading}>
                    <Loader />
                  </View>
                )}
                <View style={styles.formContainer}>
                  <View style={styles.logoContainer}>
                    <Image source={logo} alt="" style={styles.logo} />
                    <Text style={styles.logoText}> {t('loginForm.LOGO')}</Text>
                  </View>
                  <View style={styles.infocontainer}>
                    <View style={styles.welcomeContainer}>
                      <Text style={styles.welcomeTextPrimary}>
                        {t('loginForm.welcome')}
                      </Text>
                      <Text style={styles.welcomeTextSecondary}>
                        {t('loginForm.loginHere')}
                      </Text>
                    </View>
                    <Text style={styles.description}>
                      {t('loginForm.enterCredentials')}
                    </Text>
                    <View style={styles.inputContainer}>
                      {/* <Text style={styles.inputLabel}>
                        {t('loginForm.entryLabel')}
                      </Text> */}
                      <TextInput
                        onChangeText={handleChange('user')}
                        onBlur={handleBlur('user')}
                        value={values.user}
                        style={styles.input}
                        placeholder="Phone, email or username"
                        placeholderTextColor={'gray'}
                      />
                      {touched.user && errors.user && (
                        <Text style={styles.errorText}>{errors.user}</Text>
                      )}
                    </View>
                    <View style={styles.inputContainer}>
                      {/* <Text style={styles.inputLabel}>
                        {' '}
                        {t('loginForm.Password')}
                      </Text> */}
                      <View style={styles.passwordInputContainer}>
                        <TextInput
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          value={values.password}
                          style={styles.passwordInput}
                          placeholder="Password"
                          placeholderTextColor={'gray'}
                          secureTextEntry={!isPasswordVisible}
                        />
                        <TouchableOpacity
                          style={styles.passwordVisibilityToggle}
                          onPress={handlePasswordVisibility}>
                          <Image
                            source={isPasswordVisible ? openEye : Eye}
                            style={styles.eyeIcon}
                          />
                        </TouchableOpacity>
                      </View>
                      {touched.password && errors.password && (
                        <Text style={styles.errorText}>{errors.password}</Text>
                      )}
                    </View>

                    <TouchableOpacity
                      onPress={() => navigation.navigate('ForgotPassword')}>
                      <Text style={styles.forgotPasswordText}>
                        {t('loginForm.forgotPassword')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleSubmit}>
                    <Text style={styles.loginButtonText}>
                      {' '}
                      {t('loginForm.login')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
