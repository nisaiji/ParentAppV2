import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {ROUTE} from './constant';
import {useDispatch, useSelector} from 'react-redux';
import {isLogin} from '../redux/authSlice';
// import {navigationRef} from '../services/NavigationServices';
export default function Splash() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const {token, status} = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(isLogin()).finally(() => {
      setLoading(false);
    });
    // setTimeout(() => {
    //   navigation.navigate(ROUTE.AUTH);
    // }, 3000);
  }, [dispatch]);

  useEffect(() => {
    checkNextNavigationScreen();
  }, [token, status, loading]);
  // console.log(token, status);

  const checkNextNavigationScreen = async () => {
    if (!loading) {
      if (!token || !status?.passwordUpdated) {
        navigation.navigate(ROUTE.AUTH);
      } else if (!status?.emailVerified) {
        navigation.navigate(ROUTE.EMAIL_VERIFICATION);
      } else if (!status?.personalInfoUpdated) {
        navigation.navigate(ROUTE.PARENT_DETAIL);
      } else {
        navigation.navigate(ROUTE.TAB);
      }
    }
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
