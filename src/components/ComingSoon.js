import React from 'react';
import {Image, Text, View} from 'react-native';
import BackgroundView from '@src/components/BackgroundView';
import Header from '@src/components/Header';
import colors from '../theme/colors';
import {Fonts, Size} from '../theme/fonts';
import {useRoute} from '@react-navigation/native';
import comingSoon from '@src/assets/images/comingSoon.png';
import {scale} from 'react-native-size-matters';

export default function ComingSoon() {
  const route = useRoute();
  const {message} = route?.params;

  return (
    <BackgroundView>
      <Header heading={message} />
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>Coming Soon!</Text>
        <Image source={comingSoon} style={styles.image} />
      </View>
    </BackgroundView>
  );
}

const styles = {
  noDataContainer: {
    height: '70%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    color: colors.WHITE,
    fontFamily: Fonts.BOLD,
    fontSize: Size.font_16,
    marginBottom: scale(9),
  },
  image: {
    height: 200,
    width: 200,
  },
};
