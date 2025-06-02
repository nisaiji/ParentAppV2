import {Toast} from 'react-native-toast-notifications';
import {Fonts, Size, Colors} from '@src/theme/fonts';
import {ToastAndroid} from 'react-native';

/**
 * errorToast
 *
 * Displays an error message using Android's native `ToastAndroid`.
 * 
 * NOTE: The `react-native-toast-notifications` implementation is commented out, 
 * but could be restored if needed to maintain cross-platform consistency.
 *
 * @param {string} message - The error message to be shown.
 * @returns {void}
 */
export const errorToast = message => {
  // return Toast.show(message, {
  //   duration: 1000,
  //   animationType: 'zoom-in',
  //   type: 'danger',
  //   dangerColor: Colors.ERROR,
  //   placement: 'bottom',
  //   textStyle: {fontSize: Size.font_14, fontFamily: Fonts.BOLD},
  // });
  if (message) {
    return ToastAndroid.show(message, ToastAndroid.LONG, ToastAndroid.TOP);
  }
};

/**
 * warningToast
 *
 * Displays a warning toast using `react-native-toast-notifications`.
 *
 * @param {string} message - The warning message to be shown.
 * @returns {void}
 */
export const warningToast = message => {
  if (message) {
    return Toast.show(message, {
      duration: 3000,
      animationType: 'zoom-in',
      type: 'warning',
      warningColor: Colors.WARNING,
      placement: 'bottom',
      textStyle: {fontSize: Size.font_14, fontFamily: Fonts.BOLD},
    });
  }
};

/**
 * successToast
 *
 * Displays a success toast using `react-native-toast-notifications`.
 *
 * @param {string} message - The success message to be shown.
 * @returns {void}
 */
export const successToast = message => {
  if (message) {
    return Toast.show(message, {
      duration: 2000,
      animationType: 'zoom-in',
      type: 'success',
      successColor: Colors.SUCCESS,
      placement: 'bottom',
      textStyle: {fontSize: Size.font_14, fontFamily: Fonts.BOLD},
    });
  }
};
