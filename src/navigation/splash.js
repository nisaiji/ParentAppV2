import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {ROUTE} from './constant';
import {useDispatch, useSelector} from 'react-redux';
import {isLogin} from '../redux/authSlice';
import {navigationRef} from '../services/NavigationServices';

export default function Splash() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const {token, status} = useSelector(state => state.auth);
  // console.log(status);

  useEffect(() => {
    dispatch(isLogin()).finally(() => {
      setLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    checkNextNavigationScreen();
  }, [token, status, loading]);

  const checkNextNavigationScreen = async () => {
    if (loading || !navigationRef.isReady()) return;

    const currentRoute = navigationRef.getCurrentRoute()?.name;

    if (!token || !status?.passwordUpdated) {
      navigation.navigate(ROUTE.AUTH);
      return;
    }

    if (!status?.emailVerified) {
      if (
        currentRoute !== ROUTE.EMAIL_VERIFICATION &&
        currentRoute !== ROUTE.EMAIL_OTP_VERIFICATION
      ) {
        navigation.navigate(ROUTE.AUTH, {
          screen: ROUTE.EMAIL_VERIFICATION,
        });
      }
      return;
    }

    if (!status?.personalInfoUpdated) {
      navigation.navigate(ROUTE.AUTH, {
        screen: ROUTE.PARENT_DETAIL,
      });
      return;
    }

    if (!status?.studentAdded) {
      navigation.navigate(ROUTE.AUTH, {
        screen: ROUTE.CHILD_DETAIL,
      });
      return;
    }

    navigation.navigate(ROUTE.TAB);
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
