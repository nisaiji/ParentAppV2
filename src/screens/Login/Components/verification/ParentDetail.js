import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import leftArrow from '../../../../assets/images/leftArrow.png';
import {styles} from './styles';
import BackgroundView from '../../../../components/BackgroundView';
import { ROUTE } from '../../../../navigation/constant';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../../components/Header';
import { useTranslation } from 'react-i18next';

export default function ParentDetail() {
  const [name, setName] = useState('');
  const [optionalName, setOptionalName] = useState('');
  const navigation = useNavigation()
  const [t] = useTranslation();

    const onSubmit = () => {
      navigation.navigate(ROUTE.CHILD_DETAIL)
    }

  return (
    <BackgroundView>
      <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header heading={t('parentDetail.heading')} noBack/>

      {/* New Password */}
      <Text style={styles.label}>Name</Text>
      <View style={styles.inputContainerWithIcon}>
        <TextInput
          style={styles.input}
          placeholder="Father's / Mother's name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>

      {/* Confirm Password */}
      <Text style={styles.label}>{`Co-parent's name (optional)`}</Text>
      <View style={styles.inputContainerWithIcon}>
        <TextInput
          style={styles.input}
          placeholder="Father's / Mother's name"
          placeholderTextColor="#aaa"
          value={optionalName}
          onChangeText={text => setOptionalName(text)}
        />
      </View>

      {/* Continue Button */}
      <TouchableOpacity onPress={onSubmit} style={[styles.continueButton, {marginBottom: 0}]}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </BackgroundView>
  );
}
