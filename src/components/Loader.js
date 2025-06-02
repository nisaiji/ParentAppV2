import {View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

// Loader code
export default function Loader() {
  return (
    <View style={styles.loading}>
      <FastImage
        style={{height: 50, width: 50}}
        source={require('@src/assets/images/Loader.gif')}
        resizeMode={FastImage.resizeMode.center}
      />
    </View>
  );
}

const styles = {
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 100,
  },
};
