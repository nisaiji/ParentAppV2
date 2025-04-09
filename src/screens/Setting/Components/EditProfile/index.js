/* eslint-disable prettier/prettier */
import React from 'react';
import {
    Text,
  View,
} from 'react-native';
import styles from './styles';
import BackgroundView from '@src/components/BackgroundView';

function Setting() {
  return (
    <BackgroundView>
      <View style={styles.container}>
        <Text>Setting</Text>
      </View>
    </BackgroundView>
  );
}

export default Setting;
