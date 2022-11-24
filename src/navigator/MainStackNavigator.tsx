import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {RootStackParamList} from '../types/navigator';
import {
  AuthScreen,
  ForgotPasswordScreen,
  DetailCarScreen,
  ListCarScreen,
  LoginScreen,
  OrderDetailScreen,
  RegisterPasswordScreen,
  RegisterScreen,
  RegisterVerificationScreen,
  ResetPasswordScreen,
  PaymentMethodScreen,
} from '../screens';
import MainTabNavigator from './MainTabNavigator';
import {useAppSelector} from 'redux/hooks';
import {authState} from 'redux/features/auth/authSlice';
import { theme } from 'utils';

const RootStack = createStackNavigator<RootStackParamList>();

const leftToRightAnimation = {
  cardStyleInterpolator: ({current, layouts}: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [-layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

const MainStack: React.FC = () => {
  const auth = useAppSelector(authState);

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
      }}
      initialRouteName="Auth">
      {!auth.isSignIn && (
        <>
          <RootStack.Screen name="Auth" component={AuthScreen} />
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen name="Register" component={RegisterScreen} />
          <RootStack.Screen name="RegisterPassword" component={RegisterPasswordScreen} />
          <RootStack.Screen name="RegisterVerification" component={RegisterVerificationScreen} />
          <RootStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <RootStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        </>
      )}
      {auth.isSignIn && (
        <>
          <RootStack.Screen
            name="MainTab"
            component={MainTabNavigator}
            options={leftToRightAnimation}
          />
          <RootStack.Screen name="ListCar" component={ListCarScreen} options={{
            headerStyle: {
              backgroundColor: theme.colors.navy
            }
          }} />
          <RootStack.Screen name="DetailCar" component={DetailCarScreen} options={{
            headerStyle: {
              backgroundColor: theme.colors.navy
            }
          }} />
          <RootStack.Screen name="OrderDetail" component={OrderDetailScreen} options={{
            headerStyle: {
              backgroundColor: theme.colors.navy
            }
          }} />
           <RootStack.Screen name="PaymentMethod" component={PaymentMethodScreen} options={{
            headerStyle: {
              backgroundColor: theme.colors.navy
            }
          }} />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default MainStack;
