/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';
import bgvideo from '@src/assets/videos/loginBG.mp4';
import styles from './styles';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {ROUTE} from '../../../navigation/constant';
import LoginScreen from '../component/LoginScreen';
import OTPVerificationScreen from '../component/verification/PasswordVerification';
import EmailVerificationScreen from '../component/verification/EmailVerification';
import CreatePasswordScreen from '../component/verification/CreatePassword';
import ParentDetailScreen from '../component/verification/ParentDetail';
import ChildDetailScreen from '../component/verification/ChildDetails';

function Login() {
  const navigation = useNavigation();

  const onLoginPress = () => {
    navigation.navigate(ROUTE.TAB);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <Video
          resizeMode="cover"
          muted={true}
          repeat
          source={bgvideo}
          style={styles.backgroundVideo}
        />
        <ChildDetailScreen />
        {/* <ParentDetailScreen /> */}
        {/* <CreatePasswordScreen /> */}
        {/* <EmailVerificationScreen /> */}
        {/* <OTPVerificationScreen /> */}
        {/* <LoginScreen /> */}
      </View>
    </GestureHandlerRootView>
  );
}

export default Login;
