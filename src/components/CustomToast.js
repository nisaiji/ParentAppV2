import {Toast} from 'react-native-toast-notifications';
import {Fonts, Size, Colors} from '@src/theme/fonts';
import {ToastAndroid} from 'react-native';

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
