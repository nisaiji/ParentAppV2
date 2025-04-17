import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {ROUTE} from './constant';
import {useDispatch, useSelector} from 'react-redux';
import {isLogin} from '../redux/authSlice';
// import {navigationRef} from '../services/NavigationServices';
export default function Splash() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const {token, status} = useSelector(state => state.auth);

  useEffect(() => {
    // dispatch(isLogin());
    setTimeout(() => {
      navigation.navigate(ROUTE.AUTH);
    }, 3000);
  }, [dispatch]);

  // useEffect(() => {
  //   checkNextNavigationScreen();
  // }, [token, status]);

  // const checkNextNavigationScreen = async () => {
  //   if (!token) {
  //     // Navigate to authentication flow if no token is available
  //     navigation.navigate(ROUTE.AUTH);
  //   } 
  //   else if (!status?.emailVerified) {
  //     navigation.navigate(ROUTE.EMAIL_VERIFICATION);
  //   }
  // };

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
