import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTE} from './constant';
import EditProfile from '@src/screens/Setting/Components/EditProfile';
import Dashboard from '@src/screens/Dashboard/Container';
import Event from '@src/screens/Dashboard/Component/events/Event';
import Notice from '@src/screens/Dashboard/Component/notice/Notice';
import Leave from '@src/screens/Dashboard/Component/leave/Leave';
import SettingStackNavigator from '@src/navigation/SettingStackNavigator';
import EditChild from '@src/screens/Dashboard/Component/child';
import ComingSoon from '@src/components/ComingSoon';

const Stack = createNativeStackNavigator();

/**
 * SettingStackNavigator
 *
 * This navigator manages the stack navigation related to setting data,
 * including the main setting, edit profile and the change password screen.
 *
 * @returns {JSX.Element} A configured stack navigator for setting-related routes
 */
export default function DashboardStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={ROUTE.DASHBOARD}>
      <Stack.Screen name={ROUTE.DASHBOARD} component={Dashboard} />
      <Stack.Screen name={ROUTE.EVENT} component={Event} />
      <Stack.Screen name={ROUTE.EDIT_CHILD} component={EditChild} />
      <Stack.Screen name={ROUTE.EDIT_PROFILE} component={EditProfile} />
      <Stack.Screen name={ROUTE.NOTICE} component={Notice} />
      <Stack.Screen name={ROUTE.LEAVE} component={Leave} />
      <Stack.Screen name={ROUTE.SETTING_STACK} component={SettingStackNavigator} />
      <Stack.Screen name={ROUTE.COMING_SOON} component={ComingSoon} />
    </Stack.Navigator>
  );
}
