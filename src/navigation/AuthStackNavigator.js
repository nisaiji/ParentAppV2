import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '@src/screens/Login/Container';
import {ROUTE} from '@src/navigation/constant';
import OTPVerification from '../screens/Login/Components/verification/OTPVerification';
import EmailVerification from '../screens/Login/Components/verification/EmailVerification';
import CreatePassword from '../screens/Login/Components/verification/CreatePassword';
import EmailOTPVerification from '../screens/Login/Components/verification/EmailOTPVerification';
import ParentDetail from '../screens/Login/Components/verification/ParentDetail';
import SuccessGif from '../components/SuccessGif';
import ChildDetail from '../screens/Login/Components/verification/ChildDetails';

const Stack = createNativeStackNavigator();

export default function AuthStackNavigator() {
  return (
    <Stack.Navigator initialRouteName={ROUTE.LOGIN}>
      <Stack.Screen
        name={ROUTE.LOGIN}
        options={{headerShown: false}}
        component={Login}
      />
      <Stack.Screen
        name={ROUTE.OTP}
        options={{headerShown: false}}
        component={OTPVerification}
      />
      <Stack.Screen
        name={ROUTE.EMAIL_VERIFICATION}
        options={{headerShown: false}}
        component={EmailVerification}
      />
      <Stack.Screen
        name={ROUTE.EMAIL_OTP_VERIFICATION}
        options={{headerShown: false}}
        component={EmailOTPVerification}
      />
      <Stack.Screen
        name={ROUTE.CREATE_PASSWORD}
        options={{headerShown: false}}
        component={CreatePassword}
      />
      <Stack.Screen
        name={ROUTE.PARENT_DETAIL}
        options={{headerShown: false}}
        component={ParentDetail}
      />
      <Stack.Screen
          name={ROUTE.SUCCESS_PAGE}
          options={{headerShown: false}}
          component={SuccessGif}
        />
      <Stack.Screen
          name={ROUTE.CHILD_DETAIL}
          options={{headerShown: false}}
          component={ChildDetail}
        />
    </Stack.Navigator>
  );
}
