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
import {setAuth, setChildList} from '../../../../redux/authSlice';

export default function ChildDetail() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [t] = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const childs = useSelector(state => state.auth.childs) || [];

  const addChild = async () => {
    if (childs.length < 5) {
      try {
        if (!name) {
          return errorToast(t('validation.fullname'));
        }
        const res = await axiosClient.put(EndPoints.ADD_STUDENT, {
          studentName: name,
        });
        // console.log(res.data);
        if (res?.data?.statusCode === 200) {
          // console.log('res', res?.data?.result);

          dispatch(setChildList(res?.data?.result));
          dispatch(setAuth({studentAdded: true}));
          successToast('Child Added');
          setName('');
          setId('');
        }
      } catch (e) {
        errorToast(e);
      }
    } else {
      errorToast('validation.maxChild');
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
            <Text style={styles.nameText}>
              {item?.firstname} {item?.lastname}
            </Text>
            <View style={styles.verifiedWrapper}>
              <Text style={styles.verifyedText}>
                {t('childDetail.verified')}
              </Text>
              <Image source={verifyed} style={styles.verifiedIcon} />
            </View>
          </View>
        ))}
        {/* name */}
        <Text style={styles.label}>{t('childDetail.studentId')}</Text>
        <View style={styles.inputContainerWithIcon}>
          <TextInput
            style={styles.input}
            placeholder={t('childDetail.studentId')}
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>
        {/* Student id */}
        <Text style={styles.label}>{t('childDetail.studentId')}</Text>
        <View style={styles.inputContainerWithIcon}>
          <TextInput
            style={styles.input}
            placeholder={t('placeholder.id')}
            placeholderTextColor="#aaa"
            value={id}
            onChangeText={text => setId(text)}
          />
        </View>
        {/* Continue or add child */}
        <TouchableOpacity
          disabled={name?.length === 0}
          onPress={addChild}
          style={[styles.addChildButton, {marginBottom: 0}]}>
          <Image source={add} style={styles.addIcon} resizeMode="contain" />
          <Text style={styles.addChildText}>{t('button.addChild')}</Text>
        </TouchableOpacity>
        {childs?.length > 0 && (
          <TouchableOpacity
            onPress={onSubmit}
            style={[styles.continueButton, {marginTop: 28}]}>
            <Text style={styles.continueText}>
              {name?.length ? t('button.verify') : t('button.continue')}
            </Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </BackgroundView>
  );
}
