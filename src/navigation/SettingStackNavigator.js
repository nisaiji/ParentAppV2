import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Setting from '@src/screens/Setting/Container';
import { ROUTE } from './constant';

const Stack = createNativeStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={ROUTE.SETTING}>
      <Stack.Screen name={ROUTE.SETTING} component={Setting} />
      <Stack.Screen name={ROUTE.EDIT_PROFILE} component={Setting} />
    </Stack.Navigator>
  );
}
