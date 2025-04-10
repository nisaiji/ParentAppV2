/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import BackgroundView from '@src/components/BackgroundView';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import show from '../../../../assets/images/show.png';
import hide from '../../../../assets/images/hide.png';

function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigation = useNavigation()
  const [t] = useTranslation();
  const onSubmit = () => {

  }
  return (
    <GestureHandlerRootView>
      <BackgroundView>
        <SafeAreaView style={styles.container}>
          <Header heading='Update Password' />
          <ScrollView style={styles.innerContainer}>
            {/* New Password */}
            <Text style={styles.label}>New Password</Text>
            <View style={styles.inputContainerWithIcon}>
              <TextInput
                style={styles.input}
                placeholder="Create new password"
                placeholderTextColor="#aaa"
                secureTextEntry={!showNew}
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowNew(!showNew)}>
                <Image
                  source={showNew ? hide : show}
                  style={styles.eyeIconImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            { /* Confirm Password */}
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputContainerWithIcon}>
              <TextInput
                style={styles.input}
                placeholder="Confirm new password"
                placeholderTextColor="#aaa"
                secureTextEntry={!showNew}
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowNew(!showNew)}>
                <Image
                  source={showNew ? hide : show}
                  style={styles.eyeIconImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            {/* Continue Button */}
            <TouchableOpacity onPress={onSubmit} style={[styles.continueButton, { marginTop: 35 }]}>
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </BackgroundView></GestureHandlerRootView>
  );
}

export default ChangePassword;
