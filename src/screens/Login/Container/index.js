/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
  Modal,
} from 'react-native';
import Video from 'react-native-video';
import bgvideo from '@src/assets/videos/loginBG.mp4';
import LoginForm from '@src/screens/Login/Components/LoginForm';
import Uparrows1 from '../../../assets/images/Uparrows1.png';
import styles from './styles';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';

function LoginScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const {t} = useTranslation();

  const handleOpenPress = () => {
    setModalVisible(true);
    Keyboard.dismiss(); // Ensure keyboard is dismissed when opening the modal
  };

  const handleClosePress = () => {
    setModalVisible(false);
    Keyboard.dismiss(); // Ensure keyboard is dismissed when closing the modal
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <Video
          resizeMode="cover"
          muted={true}
          repeat
          source={bgvideo}
          style={styles.backgroundVideo}
        />
        <View style={styles.header}>
          <Text style={styles.logoText}>{t('loginForm.LOGO')}</Text>
          <Text style={styles.headerText}>{t('loginForm.monitorAtt')}</Text>
          <Text style={styles.subHeaderText}>{t('loginForm.anytime')}</Text>
        </View>
        <View style={styles.overlay}>
          <TouchableOpacity
            onPress={handleOpenPress}
            style={styles.swipeContainer}>
            <View style={styles.swipeText}>
              <Text style={styles.swipeBlack}>{t('loginForm.swipeUp')}</Text>
              <Text style={styles.swipeWhite}>{t('loginForm.startedMsg')}</Text>
            </View>
            <Image alt="" source={Uparrows1} style={styles.arrowIcon} />
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleClosePress}>
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <LoginForm />
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

export default LoginScreen;
