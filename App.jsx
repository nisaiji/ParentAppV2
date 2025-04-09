import React, {useEffect} from 'react';
import {AuthProvider} from './src/context/AuthContext.js';
import Navigation from './src/navigation/Navigation.js';
import {ToastProvider} from 'react-native-toast-notifications';
import 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';
import {I18nextProvider} from 'react-i18next';
import i18n from './src/locale/i18n.js';
import BackgroundView from './src/components/BackgroundView.js';
import store from './src/redux/store.js';
import {Provider} from 'react-redux';

export default function App() {
  useEffect(() => {
    // Lock the orientation to portrait on component mount
    Orientation.lockToPortrait();
    // Optionally, unlock orientation on component unmount
    return () => {
      // Orientation.unlockAllOrientations();
    };
  }, []);

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ToastProvider>
          <Navigation />
        </ToastProvider>
      </I18nextProvider>
    </Provider>
  );
}
