import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  BackHandler,
  ScrollView,
} from 'react-native';
import leftArrow from '../../../../assets/images/leftArrow.png';
import add from '../../../../assets/images/add.png';
import verifyed from '../../../../assets/images/verifyed.png';
import {styles} from './styles';
import BackgroundView from '../../../../components/BackgroundView';
import {useTranslation} from 'react-i18next';
import Header from '../../../../components/Header';
import {ROUTE} from '../../../../navigation/constant';
import {useNavigation, useRoute} from '@react-navigation/native';
import {axiosClient} from '../../../../services/axiosClient';
import {EndPoints} from '../../../../ParentApi';
import {errorToast, successToast} from '../../../../components/CustomToast';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAndSetData, setAuth} from '../../../../redux/authSlice';
import Loader from '../../../../components/Loader';
import CustomButton from '../../../../components/CustomButton';
import {scale} from 'react-native-size-matters';

export default function ChildDetail() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [childs, setChilds] = useState([]);
  const [showField, setShowField] = useState(true);
  const [t] = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {data} = useSelector(state => state.auth);
  const route = useRoute();

  const onContinue = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.put(EndPoints.ADD_STUDENT, {
        studentIds: childs.map(item => item?._id),
      });
      // console.log('res is ', res.data);

      if (res?.data?.statusCode === 200) {
        if (route?.params) {
          goToRouteName();
        }
        dispatch(fetchAndSetData());
        dispatch(setAuth({studentAdded: true}));
        successToast('Child Added');
        setName('');
        setId('');
        setChilds([]);
        setShowField(true);
      }
    } catch (e) {
      errorToast(e);
    } finally {
      setLoading(false);
    }
  };

  const addChild = async () => {
    try {
      if (!name) {
        return errorToast(t('validation.fullname'));
      }
      setLoading(true);
      const res = await axiosClient.put(EndPoints.CHECK_VALID_STUDENT, {
        studentName: name,
      });
      if (res?.data?.statusCode === 200) {
        setChilds([...childs, res?.data?.result]);
        successToast('Child verified');
        setShowField(false);
        setName('');
        setId('');
      }
    } catch (e) {
      errorToast(e);
    } finally {
      setLoading(false);
    }
  };

  const goToRouteName = () => {
    const {mainStackNavigator, tabNavigator, routes} = route.params;
    navigation.reset({
      index: 1,
      routes: [
        {
          name: mainStackNavigator,
          state: {
            routes: [
              {
                name: tabNavigator,
                state: {
                  routes,
                },
              },
            ],
          },
        },
      ],
    });
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      },
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <BackgroundView>
      {loading && <Loader />}
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <Header heading={t('childDetail.heading')} />
        <ScrollView>
          {route?.params &&
            data?.students.map((item, i) => (
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
          {showField && (
            <>
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
            </>
          )}
          {/* Continue or add child */}
          {childs?.length > 0 && (
            <TouchableOpacity
              onPress={onContinue}
              style={[styles.continueButton, {marginTop: 28}]}>
              <Text style={styles.continueText}>{t('button.continue')}</Text>
            </TouchableOpacity>
          )}
          {!showField ? (
            <CustomButton
              onPress={() => setShowField(true)}
              btnStyle={[styles.addChildButton, {marginBottom: 0}]}
              btnLabelStyle={styles.addChildText}
              source={add}
              label={t('button.addChild')}
            />
          ) : (
            <CustomButton
              disabled={name?.length === 0}
              onPress={addChild}
              btnStyle={[styles.continueButton, {marginTop: scale(28)}]}
              btnLabelStyle={styles.continueText}
              label={t('button.verify')}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </BackgroundView>
  );
}
