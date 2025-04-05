import {View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

export default function Loader() {
  return (
    <View>
      <FastImage
        style={{height: 50, width: 50}}
        source={require('@src/assets/images/Loader.gif')}
        resizeMode={FastImage.resizeMode.center}
      />
    </View>
  );
}
