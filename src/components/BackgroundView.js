import React from 'react';
import { StyleSheet, View, } from 'react-native';
import colors from '../theme/colors';
import { scale } from 'react-native-size-matters';

/**
 * Background color of screen
 */
const BackgroundView = ({ children, style = {} }) => {
    return (<View style={[styles.background, style]}>{children}</View>)
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.BLACK3,
        paddingTop:scale(10),
        paddingHorizontal: scale(12)
    },
});

export default BackgroundView;