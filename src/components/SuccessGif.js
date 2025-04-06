import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { Fonts, Size } from '../theme/fonts';
import colors from '../theme/colors';
import FastImage from 'react-native-fast-image';
import BackgroundView from './BackgroundView';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function SuccessGif() {
  const navigation = useNavigation()
  const route = useRoute()
  const { message, nextRoute } = route?.params;

  
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(nextRoute)
    }, 3000);
  }, [])
  return (
    <BackgroundView>
      <View style={styles.container}>
        <FastImage
          style={styles.image}
          source={require('@src/assets/images/update.gif')}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={styles.text}>{message}</Text>
      </View>
    </BackgroundView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  text: {
    fontSize: Size.font_24,
    fontFamily: Fonts.BOLD,
    color: colors.WHITE,
    width: '70%',
    textAlign: 'center',
  },
  image: {
    height: 300,
    width: 300,
  },
});
