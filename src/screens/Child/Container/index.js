/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import BackgroundView from '../../../components/BackgroundView';
import Header from '../../../components/Header';
import rightArrow from '../../../assets/images/rightArrow.png';
import childDummy from '../../../assets/images/childDummy.png';
import {useNavigation} from '@react-navigation/native';
import {ROUTE} from '../../../navigation/constant';
import {useDispatch, useSelector} from 'react-redux';
import {updateCurrentChildByIndex} from '../../../redux/authSlice';

function EventHoliday() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {data} = useSelector(state => state.auth);

  const onArrowPress = index => {
    dispatch(updateCurrentChildByIndex(index));
    navigation.navigate(ROUTE.EDIT_CHILD);
  };

  return (
    <BackgroundView>
      <SafeAreaView style={styles.container}>
        <Header noBack heading="Your Child" />
        <View style={styles.childContainer}>
          {data?.students.map((item, index) => (
            <TouchableOpacity
              onPress={() => onArrowPress(index)}
              key={index}
              style={styles.childCard}>
              <Image
                source={
                  item?.photo
                    ? {uri: `data:image/jpeg;base64,${item?.photo}`}
                    : childDummy
                }
                style={styles.childImg}
                resizeMode="contain"
              />
              <Text style={styles.childName}>
                {item?.firstname} {item?.lastname}
              </Text>
              <Image
                source={rightArrow}
                style={styles.rightArrow}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </BackgroundView>
  );
}

export default EventHoliday;
