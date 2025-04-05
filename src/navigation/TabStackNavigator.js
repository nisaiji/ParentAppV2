import React, {useContext, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import DashboardScreen from '@src/screens/Dashboard/Container/index';
import ProfileStackNavigator from '@src/navigation/ProfileStackNavigator';
import home from '@src/assets/images/home.png';
import homeoutlined from '@src/assets/images/homeoutlined.png';
import event from '@src/assets/images/event.png';
import eventoutlined from '@src/assets/images/eventoutlined.png';
import profile from '@src/assets/images/profile.png';
import profileoutlined from '@src/assets/images/profileoutlined.png';
import {scale} from 'react-native-size-matters';
import {ROUTE} from './constant';
import {Colors, Fonts} from '../theme/fonts';
import {AuthContext} from '../context/AuthContext';
import EventHoliday from '../screens/Event/Container';

const Tab = createBottomTabNavigator();

function TabStackNavigator() {
  const {profileDrawer, setProfileDrawer} = useContext(AuthContext);
  return (
    <Tab.Navigator
      initialRouteName={ROUTE.DASHBOARD}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconSource;
          let rn = route.name;

          if (rn === ROUTE.DASHBOARD) {
            iconSource = focused ? home : homeoutlined;
          } else if (rn === ROUTE.EVENT) {
            iconSource = focused ? event : eventoutlined;
          } else if (rn === ROUTE.PROFILE) {
            iconSource = focused ? profile : profileoutlined;
          }

          return (
            <Image
              source={iconSource}
              style={[
                {
                  height: 30,
                  width: 30,
                  resizeMode: 'contain',
                  tintColor: focused
                    ? iconSource === event
                      ? ''
                      : Colors.PURPLE1
                    : '',
                },
              ]}
            />
          );
        },
        tabBarActiveTintColor: Colors.COLOR_7,
        tabBarInactiveTintColor: Colors.DARKGRAY,
        tabBarLabelStyle: {
          paddingBottom: scale(10),
          fontSize: scale(10),
          fontFamily: Fonts.BOLD,
        },
        tabBarStyle: {
          padding: scale(10),
          height: scale(70),
        },
      })}>
      <Tab.Screen
        name={ROUTE.DASHBOARD}
        component={DashboardScreen}
        options={{
          headerShown: false,
          tabBarButton: props => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                props.onPress();
                if (profileDrawer) {
                  setProfileDrawer(false);
                }
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTE.EVENT}
        component={EventHoliday}
        options={{
          headerShown: false,
          tabBarButton: props => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                props.onPress();
                // console.log('props', props);
                if (profileDrawer) {
                  setProfileDrawer(false);
                }
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTE.PROFILE}
        component={ProfileStackNavigator}
        options={{
          headerShown: false,
          tabBarButton: props => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                props.onPress();
                if (profileDrawer) {
                  setProfileDrawer(false);
                }
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabStackNavigator;
