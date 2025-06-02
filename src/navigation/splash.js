import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {ROUTE} from './constant';
import {useDispatch, useSelector} from 'react-redux';
import {isLogin} from '../redux/authSlice';
import {navigationRef} from '../services/NavigationServices';

/**
 * Splash
 *
 * This is the splash screen component shown when the app starts.
 * It checks user authentication status and navigates to the appropriate screen.
 *
 * Navigation flow decisions are based on:
 * - If the user is logged in (valid token)
 * - If the password, email, parent details, and child details are updated
 * - If not logged in or required details are missing, navigates to relevant auth screens
 *
 * Uses Redux to access login status and dispatch auth check.
 */
export default function Splash() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const {token, status} = useSelector(state => state.auth);
  // console.log(status);

  /**
   * On component mount, dispatch `isLogin` to verify token and user status.
   * `finally` ensures loading state is set to false after check.
   */
  useEffect(() => {
    dispatch(isLogin()).finally(() => {
      setLoading(false);
    });
  }, [dispatch]);

  /**
   * Run logic to determine where the user should go once login check is complete.
   * Triggers whenever token, status, or loading changes.
   */
  useEffect(() => {
    checkNextNavigationScreen();
  }, [token, status, loading]);

  /**
   * Determine which screen the user should be navigated to based on their login and setup status.
   */
  const checkNextNavigationScreen = async () => {
    if (loading || !navigationRef.isReady()) return;

    const currentRoute = navigationRef.getCurrentRoute()?.name;

    // If not logged in or password not updated, go to AUTH stack
    if (!token || !status?.passwordUpdated) {
      navigation.navigate(ROUTE.AUTH);
      return;
    }

    // If email not verified, redirect to email verification screen
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

    // If parent details not provided, navigate to ParentDetail screen
    if (!status?.personalInfoUpdated) {
      navigation.navigate(ROUTE.AUTH, {
        screen: ROUTE.PARENT_DETAIL,
      });
      return;
    }

    // If child not added yet, navigate to ChildDetail screen
    if (!status?.studentAdded) {
      navigation.navigate(ROUTE.AUTH, {
        screen: ROUTE.CHILD_DETAIL,
      });
      return;
    }

    // All setup complete, navigate to main app
    navigation.reset({
      index: 0,
      routes: [{name: ROUTE.TAB}],
    });
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
