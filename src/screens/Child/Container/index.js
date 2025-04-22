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
import {useSelector} from 'react-redux';

function EventHoliday() {
  // const data = useSelector(state => state.auth.data);
  // console.log(JSON.stringify(data));
  // const [childs, setChilds] = useState(data?.students);
  const navigation = useNavigation();

  const onArrowPress = () => {
    navigation.navigate(ROUTE.EDIT_CHILD);
  };
  return (
    <BackgroundView>
      <SafeAreaView style={styles.container}>
        <Header noBack heading="Your Child" />
        <View style={styles.childContainer}>
          {/* {childs.map(item => (
            <TouchableOpacity
              onPress={onArrowPress}
              key={item?.id}
              style={styles.childCard}>
              <Image
                source={childDummy}
                style={styles.childImg}
                resizeMode="contain"
              />
              <Text style={styles.childName}>{item?.name}</Text>
              <Image
                source={rightArrow}
                style={styles.rightArrow}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))} */}
        </View>
      </SafeAreaView>
    </BackgroundView>
  );
}

export default EventHoliday;
