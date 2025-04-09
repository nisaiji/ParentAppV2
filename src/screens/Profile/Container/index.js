/* eslint-disable prettier/prettier */
import React from 'react';
import {
    Text,
  View,
} from 'react-native';
import styles from './styles';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BackgroundView from '../../../components/BackgroundView';

function Profile() {
  return (
    <BackgroundView>
      <View style={styles.container}>
        <Text>Profile</Text>
      </View>
    </BackgroundView>
  );
}

export default Profile;
