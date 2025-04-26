import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import metrics from '@src/theme/metrics';
import {errorToast, warningToast} from './CustomToast';

/**
 * Requests camera permission for Android devices.
 * iOS does not require explicit permission.
 *
 * @param {Function} t - Translation function for localized messages.
 * @returns {Promise<boolean>} - Returns true if permission is granted, otherwise false.
 */
const requestCameraPermission = async t => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: t('permission.cameraPermission'),
          message: t('permission.cameraAccess'),
          buttonNeutral: t('permission.askLater'),
          buttonNegative: t('permission.cancel'),
          buttonPositive: t('permission.ok'),
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('Camera permission granted');
        return true;
      } else {
        // console.log('Camera permission denied');
        Alert.alert(
          'Permission Denied',
          'Please enable camera access in settings.',
        );
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    return true; // iOS doesn't require explicit permission
  }
};

/**
 * Requests gallery permission for Android devices.
 * Handles different Android versions (pre-Android 13 vs. Android 13+).
 * iOS does not require explicit permission.
 *
 * @param {Function} t - Translation function for localized messages.
 * @returns {Promise<boolean>} - Returns true if permission is granted, otherwise false.
 */
const requestGalleryPermission = async t => {
  if (Platform.OS === 'android') {
    let androidOsVersion = Platform.Version;
    // console.log('androidOsVersion', androidOsVersion);
    try {
      const granted = await PermissionsAndroid.request(
        androidOsVersion < 33
          ? PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
          : PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES, // For Android 13+
        {
          title: t('permission.galleryPermission'),
          message: t('permission.galleryAccess'),
          buttonNeutral: t('permission.askLater'),
          buttonNegative: t('permission.cancel'),
          buttonPositive: t('permission.ok'),
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('Gallery permission granted');
        return true;
      } else {
        // console.log('Gallery permission denied');
        Alert.alert(
          'Permission Denied',
          'Please enable gallery access in settings.',
        );
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    // iOS doesn't require permission for gallery access explicitly
    return true;
  }
};

/**
 * Opens the device camera and allows the user to capture an image.
 * If permission is not granted, prompts the user to open settings.
 *
 * @param {Function} t - Translation function for localized messages.
 * @returns {Promise<string|null>} - Returns the image in base64 format or null if canceled/failed.
 */
export const openCamera = async t => {
  const hasPermission = await requestCameraPermission(t);
  if (!hasPermission) {
    Alert.alert(
      t('permission.permissionDenay'),
      t('permission.askCameraPermission'),
      [
        {
          text: t('permission.openSetting'),
          onPress: () => Linking.openSettings(),
        },
      ],
    );
    return null;
  }

  try {
    const image = await ImagePicker.openCamera({
      mediaType: 'photo',
      includeBase64: true, // Set to true to include base64
      compressImageQuality: 0.9, // Initial compression quality
      width: metrics.screenWidth - 20, // Resize to a smaller width
      height: metrics.screenHeight - 180, // Resize to a smaller height
      cropping: true, // Enable cropping after taking the picture
    });

    // Enforce image format
    if (
      !image?.path?.endsWith('.png') &&
      !image?.path?.endsWith('.jpg') &&
      !image?.path?.endsWith('.jpeg')
    ) {
      warningToast(t('permission.invalidImageFormat'));
      return null;
    }

    // 2MB limit
    if (image?.size > 1048576) {
      Alert.alert(t('permission.largeFile'), t('permission.selectSmallImage'));
      return null;
    }

    return image?.data; // returns image as base64
  } catch (error) {
    // Handle different errors
    if (error?.message?.includes('User cancelled')) {
      return null;
    } else {
      errorToast(error?.message);
      return null;
    }
  }
};

/**
 * Opens the device gallery and allows the user to select an image.
 * If permission is not granted, prompts the user to open settings.
 *
 * @param {Function} t - Translation function for localized messages.
 * @returns {Promise<string|null>} - Returns the image in base64 format or null if canceled/failed.
 */
export const openGallery = async t => {
  const hasPermission = await requestGalleryPermission(t);
  if (!hasPermission) {
    Alert.alert(
      t('permission.permissionDenay'),
      t('permission.askGalleryPermission'),
      [
        {
          text: t('permission.openSetting'),
          onPress: () => Linking.openSettings(),
        },
      ],
    );
    return null;
  }

  try {
    const image = await ImagePicker.openPicker({
      mediaType: 'photo',
      includeBase64: true, // Set to true to include base64
      compressImageQuality: 0.9, // Initial compression quality
      width: metrics.screenWidth - 20, // Resize to a smaller width
      height: metrics.screenHeight - 180, // Resize to a smaller height
      cropping: true, // Enable cropping after selecting the image
    });

    // Enforce image format
    if (
      !image?.path?.endsWith('.png') &&
      !image?.path?.endsWith('.jpg') &&
      !image?.path?.endsWith('.jpeg')
    ) {
      warningToast(t('permission.invalidImageFormat'));
      return null;
    }

    // 2MB limit
    if (image?.size > 1048576) {
      Alert.alert(t('permission.largeFile'), t('permission.selectSmallImage'));
      return null;
    }

    return image?.data; // returns image as base64
  } catch (error) {
    // Handle different errors
    if (error?.message?.includes('User cancelled')) {
      return null;
    } else {
      errorToast(error?.message);
      return null;
    }
  }
};
