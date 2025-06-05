import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Setting from '@src/screens/Setting/Container';
import ChangePassword from '@src/screens/Setting/Components/ChangePassword';
import {ROUTE} from './constant';
import EditProfile from '../screens/Setting/Components/EditProfile';
import Dashboard from '../screens/Dashboard/Container';
import Event from '../screens/events/Event';
import EditChild from '../screens/Child/Components/EditChild';

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
    </Stack.Navigator>
  );
}
