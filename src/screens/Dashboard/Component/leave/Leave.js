import React from 'react';
import {Text, View} from 'react-native';
import BackgroundView from '@src/components/BackgroundView';
import Header from '@src/components/Header';
import { styles } from './styles';

export default function Leave() {
  return (
    <BackgroundView>
      <Header heading="Leave" />
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>Coming Soon</Text>
      </View>
    </BackgroundView>
  );
}
