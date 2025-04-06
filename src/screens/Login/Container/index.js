/* eslint-disable prettier/prettier */
import React from 'react';
import {View} from 'react-native';
import Video from 'react-native-video';
import bgvideo from '@src/assets/videos/loginBG.mp4';
import styles from './styles';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import LoginScreen from '../Components/LoginScreen';

function Login() {

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
        <LoginScreen />
      </View>
    </GestureHandlerRootView>
  );
}

export default Login;
