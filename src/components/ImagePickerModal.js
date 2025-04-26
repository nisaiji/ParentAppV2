import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {openCamera, openGallery} from '@src/components/ImageUpload';

import camera from '@src/assets/images/camera.png';
import gallery from '@src/assets/images/gallery.png';

import {Colors, Fonts, Size} from '@src/theme/fonts';
import {scale} from 'react-native-size-matters';
import metrics from '@src/theme/metrics';
import Loader from './Loader';
import {globalStyle} from '@src/theme/fonts';

/**
 * ImagePickerModal Component
 *
 * This modal allows users to pick an image from the camera or gallery.
 * It handles permission requests, image selection, and uploading.
 *
 * @param {boolean} visible - Controls modal visibility
 * @param {boolean} loading - Displays a loading indicator during upload
 * @param {Function} onClose - Callback function to close the modal
 * @param {Function} onUpload - Callback function to handle image upload
 * @param {boolean} hasPhoto - Determines if the user already has a profile picture
 *
 * @returns {JSX.Element} ImagePickerModal component
 */
const ImagePickerModal = ({visible, loading, onClose, onUpload, hasPhoto}) => {
  if (!visible) return null;
  const {t} = useTranslation();

  /**
   * Handles capturing a photo using the device camera.
   * Requests camera permissions before opening the camera.
   * If an image is selected, it is uploaded as a base64 string.
   */
  const handleTakePhoto = async () => {
    try {
      const base64Image = await openCamera(t);
      if (base64Image) {
        await onUpload(base64Image, 'POST'); // Call parent function for uploading
      }
    } catch (error) {
      // console.log('handleTakePhoto error', error);
    } finally {
      onClose();
    }
  };

  /**
   * Handles selecting an image from the gallery.
   * Requests gallery permissions before opening the picker.
   * If an image is selected, it is uploaded as a base64 string.
   */
  const handleSelectFromGallery = async () => {
    try {
      const base64Image = await openGallery(t);
      if (base64Image) {
        await onUpload(base64Image, 'POST'); // Call parent function for uploading
      }
    } catch (error) {
      // console.log('handleSelectFromGallery error', error);
    } finally {
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      {loading && <Loader />}
      <TouchableWithoutFeedback testID="closeButton" onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.header}>
                <View style={styles.handleBar} />
              </View>
              <View style={styles.content}>
                <Text style={styles.title}>{t('title.uploadPhoto')}</Text>
                <View style={styles.optionsContainer}>
                  <TouchableOpacity
                    onPress={handleTakePhoto}
                    hitSlop={globalStyle.hitSlop10}>
                    <View style={styles.optionContainer}>
                      <Image
                        source={camera}
                        style={styles.cameraIcon}
                        resizeMode="contain"
                      />
                      <Text style={styles.label}>{t('options.camera')}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSelectFromGallery}
                    hitSlop={globalStyle.hitSlop10}>
                    <View style={styles.optionContainer}>
                      <Image
                        source={gallery}
                        style={styles.galleryIcon}
                        resizeMode="contain"
                      />
                      <Text style={styles.label}>{t('options.gallery')}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.overlayDark,
  },
  modalContent: {
    height: '25%',
    backgroundColor: Colors.BLACK,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: scale(15),
  },
  header: {
    alignItems: 'center',
    marginBottom: scale(10),
  },
  handleBar: {
    width: 50,
    height: 4,
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: Size.font_20,
    color: Colors.WHITE,
    marginBottom: 30,
    fontFamily: Fonts.BOLD,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: metrics.screenWidth,
    marginTop: scale(10),
  },
  optionContainer: {
    alignItems: 'center',
  },
  cameraIcon: {
    width: 38,
    height: 32,
    tintColor: Colors.WHITE,
  },
  galleryIcon: {
    width: 35,
    height: 32,
    tintColor: Colors.WHITE,
  },
  deleteIcon: {
    width: 28,
    height: 32,
  },
  label: {
    marginTop: scale(20),
    fontSize: Size.font_12,
    color: Colors.WHITE,
    textAlign: 'center',
    fontFamily: Fonts.BOLD,
  },
  closeButton: {
    alignSelf: 'center',
    marginTop: scale(24),
  },
});

export default ImagePickerModal;
