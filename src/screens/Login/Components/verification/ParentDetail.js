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
import {ROUTE} from '../../../../navigation/constant';
import {useNavigation} from '@react-navigation/native';
import Header from '../../../../components/Header';
import {useTranslation} from 'react-i18next';
import {scale} from 'react-native-size-matters';
import {axiosClient} from '../../../../services/axiosClient';
import {EndPoints} from '../../../../ParentApi';
import { errorToast, successToast } from '../../../../components/CustomToast';

export default function ParentDetail() {
  const [name, setName] = useState('');
  const [optionalName, setOptionalName] = useState('');
  const navigation = useNavigation();
  const [t] = useTranslation();

  const onSubmit = async () => {
    try {
      const res = await axiosClient.put(EndPoints.UPDATE_PARENT_FULLNAME, {
        fullname: name,
      });

      if (res?.data?.statusCode === 200) {
        successToast(res?.data?.result);
        navigation.navigate(ROUTE.CHILD_DETAIL);
      }
    } catch (e) {
      errorToast(e);
    }
  };
  
  return (
    <BackgroundView>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <Header heading={t('parentDetail.heading')} noBack />

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
        <TouchableOpacity
          onPress={onSubmit}
          style={[
            styles.continueButton,
            {marginBottom: 0, marginTop: scale(28)},
          ]}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </BackgroundView>
  );
}
