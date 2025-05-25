import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import DashboardScreen from '@src/screens/Dashboard/Container/index';
import SettingStackNavigator from '@src/navigation/SettingStackNavigator';
import home from '@src/assets/images/home.png';
import child from '@src/assets/images/child.png';
import setting from '@src/assets/images/setting.png';
import {scale} from 'react-native-size-matters';
import {ROUTE} from './constant';
import {Colors, Fonts, Size} from '../theme/fonts';
import colors from '../theme/colors';
import ChildStackNavigator from './ChildStackNavigator';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Event from '../screens/events/Event';

const Tab = createBottomTabNavigator();

function TabStackNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={ROUTE.CHILD}
      screenOptions={({route, navigation}) => ({
        headerShown: false,
        tabBarButton: props => {
          const {accessibilityState, onPress} = props;
          const focused = accessibilityState.selected;
          const isDashboard = route.name === ROUTE.DASHBOARD;
          const isEvent = route.name === ROUTE.EVENT;
          const isChild = route.name === ROUTE.CHILD_STACK;
          const isSetting = route.name === ROUTE.SETTING_STACK;

          let iconSource;
          let label = '';
          let bgColor = '';
          let labelColor = colors.WHITE;
          let rn = route.name;

          if (isDashboard) {
            iconSource = home;
            label = 'Home';
            bgColor = colors.BLUE;
          } else if (isEvent) {
            iconSource = child;
            label = 'Event';
            bgColor = colors.PURPLE;
          } else if (isChild) {
            iconSource = child;
            label = 'Child';
            bgColor = colors.PURPLE;
          } else if (isSetting) {
            iconSource = setting;
            label = 'Settings';
            bgColor = colors.WHITE;
            labelColor = colors.BLACK1;
          }

          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(rn); // Navigate to the respective route on icon press
              }}
              style={[
                styles.tabButton,
                focused ? {backgroundColor: bgColor} : null,
              ]}>
              <Image
                source={iconSource}
                style={[
                  styles.icon,
                  {tintColor: focused ? labelColor : Colors.DARKGRAY},
                ]}
              />
              {focused && (
                <Text style={[styles.label, {color: labelColor}]}>{label}</Text>
              )}
            </TouchableOpacity>
          );
        },
        tabBarStyle: {
          height: scale(65),
          backgroundColor: colors.BLACK3,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderTopWidth: 0,
          alignItems: 'center',
          paddingHorizontal: scale(10),
        },
      })}>
      <Tab.Screen name={ROUTE.DASHBOARD} component={DashboardScreen} />
      <Tab.Screen
        options={({route}) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeMain';

          if (routeName === ROUTE.EVENT) {
            return {
              tabBarStyle: {display: 'none'},
            };
          }

          return {};
        }}
        name={ROUTE.EVENT}
        component={Event}
      />
      <Tab.Screen
        options={({route}) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeMain';

          if (routeName === ROUTE.EDIT_CHILD) {
            return {
              tabBarStyle: {display: 'none'},
            };
          }

          return {};
        }}
        name={ROUTE.CHILD_STACK}
        component={ChildStackNavigator}
      />
      <Tab.Screen
        options={({route}) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeMain';

          if (
            routeName === ROUTE.CHANGE_PASSWORD ||
            routeName === ROUTE.EDIT_PROFILE
          ) {
            return {
              tabBarStyle: {display: 'none'},
            };
          }

          return {};
        }}
        name={ROUTE.SETTING_STACK}
        component={SettingStackNavigator}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(12),
    height: scale(40),
    flex: 0.25,
  },
  icon: {
    height: scale(16),
    width: scale(16),
    resizeMode: 'contain',
    marginRight: scale(5),
  },
  label: {
    color: colors.WHITE,
    fontFamily: Fonts.BOLD,
    fontSize: Size.font_12,
  },
});

export default TabStackNavigator;
