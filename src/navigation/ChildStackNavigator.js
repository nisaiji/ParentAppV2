import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Child from '@src/screens/Child/Container/index';
import EditChild from '../screens/Child/Components/EditChild/index';
import { ROUTE } from './constant';

const Stack = createNativeStackNavigator();

/**
 * ChildStackNavigator
 *
 * This navigator manages the stack navigation related to child data,
 * including the main Child screen and the EditChild screen.
 *
 * @returns {JSX.Element} A configured stack navigator for child-related routes
 */
export default function ChildStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={ROUTE.CHILD}>
      <Stack.Screen name={ROUTE.CHILD} component={Child} />
      <Stack.Screen name={ROUTE.EDIT_CHILD} component={EditChild} />
    </Stack.Navigator>
  );
}
