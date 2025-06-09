import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import leftArrow from '../assets/images/leftArrow.png'; // or use vector icon
import {scale} from 'react-native-size-matters';
import colors from '../theme/colors';
import {Fonts, Size, globalStyle} from '../theme/fonts';

/**
 * Header Component
 *
 * A reusable header bar that displays:
 * - A back button (unless `noBack` is true)
 * - A centered heading/title
 *
 * Props:
 * @param {boolean} noBack - Whether to hide the back button (default: false)
 * @param {string} heading - The title to display in the center of the header
 * @param {object} style - Optional custom style to override the container style
 */
const Header = ({noBack = false, heading = '', style = {}}) => {
  const navigation = useNavigation();

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.innerHeader}>
        {!noBack ? (
          <TouchableOpacity
            onPress={onBack}
            style={styles.sideButton}
            hitSlop={globalStyle.hitSlop10}>
            <Image
              source={leftArrow}
              style={styles.backButton}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.sideButton} />
        )}

        {/* Center - Title */}
        <View style={styles.centerContainer}>
          <Text style={styles.title}>{heading}</Text>
        </View>

        {/* Right - Placeholder to balance */}
        <View style={styles.sideButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(30),
  },
  innerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sideButton: {
    width: scale(40),
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  backButton: {
    width: scale(20),
    height: scale(20),
    tintColor: colors.WHITE,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  title: {
    color: colors.WHITE,
    fontSize: Size.font_20,
    fontFamily: Fonts.BOLD,
  },
});

export default Header;
