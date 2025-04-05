import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import { ROUTE } from './constant';
export default function Splash() {
  const navigation = useNavigation()

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(ROUTE.AUTH)
    }, 3000);
  },[])

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
