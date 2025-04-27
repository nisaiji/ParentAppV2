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
import {setAuth} from '../../../../redux/authSlice';
import Loader from '../../../../components/Loader';

export default function ChildDetail() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [t] = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [childs, setChilds] = useState([]);

  const addChild = async () => {
    try {
      if (!name) {
        return errorToast(t('validation.fullname'));
      }
      setLoading(true);
      const res = await axiosClient.put(EndPoints.CHECK_VALID_STUDENT, {
        studentName: name,
      });
      // console.log('res', res?.data?.result);
      if (res?.data?.statusCode === 200) {
        setChilds([...childs, res?.data?.result]);
        successToast('Child verified');
        setName('');
        setId('');
      }
    } catch (e) {
      errorToast(e);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const studentIds = childs.map(item => item._id);
      const res = await axiosClient.put(EndPoints.ADD_STUDENT, {
        studentIds,
      });
      // console.log('res', res?.data?.result);
      if (res?.data?.statusCode === 200) {
        dispatch(setAuth({studentAdded: true}));
        successToast(res?.data?.result);
        setName('');
        setId('');
        navigation.navigate(ROUTE.TAB, {
          screen: ROUTE.SUCCESS_PAGE,
          params: {
            message: t('passwordSuccess'),
            nextRoute: ROUTE.PARENT_DETAIL,
          },
        });
      }
    } catch (e) {
      errorToast(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundView>
      {loading && <Loader />}
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
        <Text style={styles.label}>{t('parentDetail.name')}</Text>
        <View style={styles.inputContainerWithIcon}>
          <TextInput
            style={styles.input}
            placeholder={t('placeholder.studentName')}
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
            <Text style={styles.continueText}>{t('button.continue')}</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </BackgroundView>
  );
}
