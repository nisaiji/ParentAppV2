import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import leftArrow from '../../../../assets/images/leftArrow.png';
import add from '../../../../assets/images/add.png';
import verifyed from '../../../../assets/images/verifyed.png';
import {styles} from './styles';
import BackgroundView from '../../../../components/BackgroundView';
import {useTranslation} from 'react-i18next';
import Header from '../../../../components/Header';
import {ROUTE} from '../../../../navigation/constant';
import {useNavigation} from '@react-navigation/native';
import {axiosClient} from '../../../../services/axiosClient';
import {EndPoints} from '../../../../ParentApi';
import {errorToast, successToast} from '../../../../components/CustomToast';
import {useDispatch, useSelector} from 'react-redux';
import {setChildList} from '../../../../redux/authSlice';

export default function ChildDetail() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [t] = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const childs = useSelector(state => state?.auth?.childs ?? []);
  console.log(JSON.stringify(childs));

  const addChild = async () => {
    if (name?.length > 0 && childs.length < 5) {
      try {
        const res = await axiosClient.put(EndPoints.ADD_STUDENT, {
          studentName: name,
        });
        // console.log(res.data);
        if (res?.data?.statusCode === 200) {
          dispatch(setChildList(res?.data?.result));
          successToast('Child Added');
          setName('');
          setId('');
        }
      } catch (e) {
        errorToast(e);
      }
    } else {
      errorToast('upto 5 child can be added');
    }
  };

  const onSubmit = () => {
    navigation.navigate(ROUTE.TAB, {
      screen: ROUTE.SUCCESS_PAGE,
      params: {
        message: t('passwordSuccess'),
        nextRoute: ROUTE.PARENT_DETAIL,
      },
    });
  };

  return (
    <BackgroundView>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <Header heading={t('childDetail.heading')} noBack />
        {childs.map((item, i) => (
          <View style={styles.verifiedContainer} key={i}>
            <Text style={styles.nameText}>{item?.child}</Text>
            <View style={styles.verifiedWrapper}>
              <Text style={styles.verifyedText}>Verified</Text>
              <Image source={verifyed} style={styles.verifiedIcon} />
            </View>
          </View>
        ))}
        {/* name */}
        <Text style={styles.label}>Name</Text>
        <View style={styles.inputContainerWithIcon}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>
        {/* Student id */}
        <Text style={styles.label}>{`Student ID (optional)`}</Text>
        <View style={styles.inputContainerWithIcon}>
          <TextInput
            style={styles.input}
            placeholder="12 digit ID"
            placeholderTextColor="#aaa"
            value={id}
            onChangeText={text => setId(text)}
          />
        </View>
        {/* Continue or add child */}
        {childs?.length === 0 && (
          <TouchableOpacity
            disabled={name?.length === 0}
            onPress={addChild}
            style={[styles.addChildButton, {marginBottom: 0}]}>
            <Image source={add} style={styles.addIcon} resizeMode="contain" />
            <Text style={styles.addChildText}>Add Child</Text>
          </TouchableOpacity>
        )}
        {childs?.length > 0 && (
          <TouchableOpacity
            onPress={onSubmit}
            style={[styles.continueButton, {marginTop: 28}]}>
            <Text style={styles.continueText}>
              {name?.length ? 'Verify' : 'Continue'}
            </Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </BackgroundView>
  );
}
