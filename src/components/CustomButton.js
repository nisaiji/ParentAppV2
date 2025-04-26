import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../theme/colors';
import { scale } from 'react-native-size-matters';
import { Fonts, Size } from '../theme/fonts';

const CustomButton = ({ onPress = () => { }, label = "", btnStyle = {}, btnLabelStyle = {}, source, imgStyle={}, disabled = false }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, btnStyle]}
            disabled={disabled}>
            {source && <Image source={source} style={[styles.addIcon, imgStyle]} resizeMode="contain" />}
            <Text style={[styles.buttonText, btnLabelStyle]}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.WHITE,
        borderRadius: scale(12),
        alignItems: 'center',
        width: '100%',
        height: scale(50),
        justifyContent: 'center',
        flexDirection:'row',
    },
    buttonText: {
        color: colors.BLACK,
        fontSize: Size.font_18,
        fontFamily: Fonts.BOLD,
    },
    addIcon: {
        height: scale(24),
        width: scale(24),
        marginRight: scale(8)
    }
});

export default CustomButton;