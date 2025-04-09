/* eslint-disable prettier/prettier */
import React from 'react';
import {
    Text,
  View,
} from 'react-native';
import styles from './styles';
import BackgroundView from '../../../components/BackgroundView';

function Dashboard() {
  return (
      <BackgroundView>
      <View style={styles.container}>
        <Text>Home</Text>
      </View>
      </BackgroundView>
  );
}

export default Dashboard;
