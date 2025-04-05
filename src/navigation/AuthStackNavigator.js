import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '@src/screens/Login/Container/index';
import UpdatePassword from '@src/screens/Login/Components/UpdatePassword/index';
import {ROUTE} from '@src/navigation/constant';
import ParentUpdate from '@src/screens/Dashboard/Components/privacy/parentUpdate/index';
import ParentPassword from '@src/screens/Dashboard/Components/privacy/password/index';
import ParentEdit from '@src/screens/Dashboard/Components/editProfile/index';
import ForgotPassword from '@src/screens/Login/Components/Forgot';
import EventSearch from '../screens/EventHoliday/Components/EventSearch';


const Stack = createNativeStackNavigator();

export default function AuthStackNavigator() {
  return (
    <Stack.Navigator initialRouteName={ROUTE.LOGIN}>
      <Stack.Screen
        name={ROUTE.LOGIN}
        options={{headerShown: false}}
        component={LoginScreen}
      />
      <Stack.Screen
        name={ROUTE.FORGOTPASSWORD}
        options={{headerShown: false}}
        component={ForgotPassword}
      />
      <Stack.Screen
        name={ROUTE.UPDATE_PASSWORD}
        options={{headerShown: false}}
        component={UpdatePassword}
      />
      <Stack.Screen
        name={ROUTE.PARENT_EDIT}
        options={{headerShown: false}}
        component={ParentUpdate}
      />
      <Stack.Screen
        name={ROUTE.PARENT_PRIVACY}
        options={{headerShown: false}}
        component={ParentPassword}
      />
      <Stack.Screen
        name={ROUTE.PARENT_PROFILE_EDIT}
        options={{headerShown: false}}
        component={ParentEdit}
      />
      
    </Stack.Navigator>
  );
}
