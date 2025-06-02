import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTE} from './constant';
import AuthStackNavigator from './AuthStackNavigator';
import TabStackNavigator from './TabStackNavigator';
import Splash from './splash';
import {navigationRef} from '../services/NavigationServices';

const Stack = createNativeStackNavigator();

/**
 * Navigation
 *
 * The root navigation component of the app.
 * It handles the top-level navigation stack, including:
 * - Splash screen
 * - Authentication flow
 * - Main tabbed application
 *
 * It also applies global navigation control via `navigationRef`.
 *
 * @returns {JSX.Element} A configured NavigationContainer with root stack
 */
export default function Navigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={ROUTE.SPLASH}>
        <Stack.Screen
          name={ROUTE.SPLASH}
          options={{headerShown: false}}
          component={Splash}
        />
        <Stack.Screen
          name={ROUTE.AUTH}
          options={{headerShown: false}}
          component={AuthStackNavigator}
        />
        <Stack.Screen
          name={ROUTE.TAB}
          options={{headerShown: false}}
          component={TabStackNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
