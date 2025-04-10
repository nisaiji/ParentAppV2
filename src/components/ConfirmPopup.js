import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';

import { Fonts, globalStyle, Size } from '../theme/fonts';
import { scale } from 'react-native-size-matters';
import { useTranslation } from 'react-i18next';
import Loader from './Loader';
import colors from '../theme/colors';

/**
 * ConfirmPopup Component
 * 
 * A reusable confirmation modal popup for logging out.
 * 
 * @param {boolean} isVisible - Controls the visibility of the modal.
 * @param {boolean} loading - Indicates if a loading state should be shown.
 * @param {function} onClose - Function to close the modal.
 * @param {function} onConfirm - Function to execute on confirmation (logout action).
 */
const ConfirmPopup = ({ isVisible, loading, onClose, onConfirm }) => {
  const [t] = useTranslation();

  return (
    <Modal visible={isVisible} transparent={true} onRequestClose={onClose}>
      {loading && <Loader />}
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <Text style={styles.title}>Log out account</Text>
          <Text style={styles.message}>
            Are you sure you want to logout of your account?
          </Text>
          <TouchableOpacity onPress={onConfirm} style={styles.confirmButton}>
            <Text style={styles.buttonLabel}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={[styles.confirmButton, styles.cancelButton]}>
            <Text style={styles.buttonLabel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    width: '80%',
    paddingTop: scale(20),
    padding: scale(16),
    backgroundColor: colors.COLOR_4,
    borderRadius: scale(12),
    elevation: 5, // Add shadow for Android
    shadowColor: colors.BLACK, // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: 'center'
  },
  title: {
    color: colors.WHITE,
    fontFamily: Fonts.BOLD,
    fontSize: Size.font_18,
    marginBottom: scale(10)
  },
  message: {
    color: colors.COLOR_2,
    fontFamily: Fonts.MEDIUM,
    fontSize: Size.font_14,
    marginBottom: scale(24)
  },
  confirmButton: {
    borderRadius: scale(12),
    backgroundColor: colors.RED,
    width: '100%',
    height: scale(44),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(12)
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderColor: colors.COLOR_2,
    borderWidth: 1,
    marginBottom: 0
  },
  buttonLabel: {
    color: colors.WHITE,
    fontFamily: Fonts.BOLD,
    fontSize: Size.font_16,
  }
});

export default ConfirmPopup;
