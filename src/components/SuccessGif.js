import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import { Fonts, Size } from '../theme/fonts';

export default function SuccessGif({message}) {
  return (
    <View style={styles.container}>
      {/* <FastImage
        style={styles.image}
        source={require('@src/assets/images/update.gif')}
        resizeMode={FastImage.resizeMode.contain}
      /> */}
      <Text style={styles.text}>{message}</Text>
    </View>
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
    color: 'white',
    width: '70%',
    textAlign: 'center',
  },
  image: {
    height: 300,
    width: 300,
  },
});
