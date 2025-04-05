/* eslint-disable prettier/prettier */
import React from 'react';
import {
    Text,
  View,
} from 'react-native';
import styles from './styles';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function Profile() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <Text>Profile</Text>
      </View>
    </GestureHandlerRootView>
  );
}

export default Profile;
