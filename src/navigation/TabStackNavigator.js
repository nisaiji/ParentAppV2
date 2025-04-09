import React, { useContext, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, TouchableOpacity, StyleSheet, Text, DevSettings } from 'react-native';
import DashboardScreen from '@src/screens/Dashboard/Container/index';
import ProfileStackNavigator from '@src/navigation/ProfileStackNavigator';
import home from '@src/assets/images/home.png';
import child from '@src/assets/images/child.png';
import setting from '@src/assets/images/setting.png';
import { scale } from 'react-native-size-matters';
import { ROUTE } from './constant';
import { Colors, Fonts } from '../theme/fonts';
import { AuthContext } from '../context/AuthContext';
import EventHoliday from '../screens/Event/Container';
import colors from '../theme/colors';

const Tab = createBottomTabNavigator();

function TabStackNavigator() {
  const { profileDrawer, setProfileDrawer } = useContext(AuthContext);
  return (
    <Tab.Navigator
      initialRouteName={ROUTE.DASHBOARD}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarButton: (props) => {
          const { accessibilityState, onPress } = props;
          const focused = accessibilityState.selected;
          const isDashboard = route.name === ROUTE.DASHBOARD;
          const isChild = route.name === ROUTE.CHILD;
          const isSetting = route.name === ROUTE.SETTING;

          let iconSource;
          let label = '';
          let bgColor = "";
          let labelColor = colors.WHITE;

          if (isDashboard) {
            iconSource = home;
            label = 'Home';
            bgColor = colors.BLUE;
          } else if (isChild) {
            iconSource = child;
            label = 'Child';
            bgColor = colors.PURPLE;
          } else if (isSetting) {
            iconSource = setting;
            label = 'Settings';
            bgColor = colors.WHITE;
            labelColor = colors.BLACK1
          }

          return (
            <TouchableOpacity
              onPress={() => {
                onPress();
                if (profileDrawer) setProfileDrawer(false);
              }}
              style={[
                styles.tabButton,
                focused ? { backgroundColor: bgColor } : null,
              ]}
            >
              <Image
                source={iconSource}
                style={[
                  styles.icon,
                  { tintColor: focused ? labelColor : Colors.DARKGRAY },
                ]}
              />
              {focused && <Text style={[
                styles.label,
                { color: labelColor }
              ]}>{label}</Text>}
            </TouchableOpacity>
          );
        },
        tabBarStyle: {
          height: scale(65),
          backgroundColor: colors.BLACK3,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderTopWidth: 0,
          alignItems: 'center'
        },
      })}
    >
      <Tab.Screen
        name={ROUTE.DASHBOARD}
        component={DashboardScreen}
      />
      <Tab.Screen
        name={ROUTE.CHILD}
        component={EventHoliday}
      />
      <Tab.Screen
        name={ROUTE.SETTING}
        component={ProfileStackNavigator}
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
    flex: 0.33
  },
  icon: {
    height: scale(20),
    width: scale(20),
    resizeMode: 'contain',
    marginRight: scale(5),
  },
  label: {
    color: colors.WHITE,
    fontFamily: Fonts.MEDIUM,
    fontSize: scale(16),
  },
});

export default TabStackNavigator;
