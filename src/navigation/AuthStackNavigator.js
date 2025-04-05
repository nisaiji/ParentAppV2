import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '@src/screens/Login/Container/index';
import {ROUTE} from '@src/navigation/constant';

const Stack = createNativeStackNavigator();

export default function AuthStackNavigator() {
  return (
    <Stack.Navigator initialRouteName={ROUTE.LOGIN}>
      <Stack.Screen
        name={ROUTE.LOGIN}
        options={{headerShown: false}}
        component={Login}
      />
    </Stack.Navigator>
  );
}
