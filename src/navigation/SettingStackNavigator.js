import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Setting from '@src/screens/Setting/Container';
import ChangePassword from '@src/screens/Setting/Components/ChangePassword';
import { ROUTE } from './constant';
import EditProfile from '../screens/Setting/Components/EditProfile';

const Stack = createNativeStackNavigator();


/**
 * SettingStackNavigator
 *
 * This navigator manages the stack navigation related to setting data,
 * including the main setting, edit profile and the change password screen.
 *
 * @returns {JSX.Element} A configured stack navigator for setting-related routes
 */
export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={ROUTE.SETTING}>
      <Stack.Screen name={ROUTE.SETTING} component={Setting} />
      <Stack.Screen name={ROUTE.EDIT_PROFILE} component={EditProfile} />
      <Stack.Screen name={ROUTE.CHANGE_PASSWORD} component={ChangePassword} />
    </Stack.Navigator>
  );
}
