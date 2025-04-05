import React, {useEffect} from 'react';
import {AuthProvider} from './src/context/AuthContext.js';
import Navigation from './src/navigation/Navigation.js';
import 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';
import {I18nextProvider} from 'react-i18next';
import i18n from './src/locale/i18n.js';

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
    <AuthProvider>
      <I18nextProvider i18n={i18n}>
          <Navigation />
      </I18nextProvider>
    </AuthProvider>
  );
}
