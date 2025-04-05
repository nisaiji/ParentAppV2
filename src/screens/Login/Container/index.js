/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import bgvideo from '@src/assets/videos/loginBG.mp4';
import styles from './styles';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { ROUTE } from '../../../navigation/constant';

function Login() {
  const navigation = useNavigation()
 
  const onLoginPress = () => {
    navigation.navigate(ROUTE.TAB)
  }

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
        <TouchableOpacity onPress={onLoginPress}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

export default Login;
