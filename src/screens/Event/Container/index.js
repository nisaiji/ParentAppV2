/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import styles from './styles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BackgroundView from '../../../components/BackgroundView';

function EventHoliday() {
  return (
    <BackgroundView>
      <View style={styles.container}>
        <Text>Child</Text>
      </View>
    </BackgroundView>
  );
}

export default EventHoliday;
