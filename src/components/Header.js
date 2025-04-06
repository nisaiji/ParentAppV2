import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import leftArrow from '../assets/images/leftArrow.png'; // or use vector icon
import { scale } from 'react-native-size-matters';
import colors from '../theme/colors';
import { Fonts, Size } from '../theme/fonts';
import commonStyle from '../theme/styles'

const Header = ({ noBack = false, heading = '', style = {} }) => {
  const navigation = useNavigation();

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.innerHeader}>
        {!noBack && (
          <TouchableOpacity onPress={onBack} style={styles.backWrapper} hitSlop={commonStyle.hitSlop10}>
            <Image source={leftArrow} style={styles.backButton} resizeMode="contain" />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{heading}</Text>
        {/* Spacer to balance title centering */}
        {!noBack && <View style={styles.backWrapper} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(42),
  },
  innerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backWrapper: {
    width: scale(24),
    height: scale(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    width: scale(20),
    height: scale(20),
    tintColor: colors.WHITE,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: colors.WHITE,
    fontSize: Size.font_20,
    fontFamily: Fonts.BOLD,
    position: 'absolute',
    left: 0,
    right: 0,
  },
});

export default Header;
