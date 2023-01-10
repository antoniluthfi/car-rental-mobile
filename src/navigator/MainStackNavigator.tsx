import {createStackNavigator} from '@react-navigation/stack';
import React, { useEffect } from 'react';
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
  CardPaymentScreen,
  VirtualAccountScreen,
  BankTransferScreen,
  InstantPaymentScreen,
  InboxDetailScreen,
} from '../screens';
import MainTabNavigator from './MainTabNavigator';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {authState, logout} from 'redux/features/auth/authSlice';
import {theme} from 'utils';
import DailyBookingOrderDetailScreen from 'screens/DailyBookingOrderDetailScreen/DailyBookingOrderDetailScreen';
import UploadBankTransferScreen from 'screens/UploadBankTransferScreen/UploadBankTransferScreen';
import ChangePasswordScreen from 'screens/ChangePasswordScreen/ChangePasswordScreen';
import ProfileScreen from 'screens/ProfileScreen/ProfileScreen';
import NotificationScreen from 'screens/NotificationScreen/NotificationScreen';

const RootStack = createStackNavigator<RootStackParamList>();

const topToDownAnimation = {
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

const leftToRightAnimation = {
  cardStyleInterpolator: ({current, layouts}: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
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
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (auth.isSignIn && auth.status === 'failed' && !auth.token.token) {
      dispatch(logout());
    }
  }, []);

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
          <RootStack.Screen
            name="RegisterPassword"
            component={RegisterPasswordScreen}
          />
          <RootStack.Screen
            name="RegisterVerification"
            component={RegisterVerificationScreen}
          />
          <RootStack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
          <RootStack.Screen
            name="ResetPassword"
            component={ResetPasswordScreen}
          />
        </>
      )}
      {auth.isSignIn && (
        <>
          <RootStack.Screen
            name="MainTab"
            component={MainTabNavigator}
            options={topToDownAnimation}
          />
          <RootStack.Screen
            name="ListCar"
            component={ListCarScreen}
            options={{
              headerStyle: {
                backgroundColor: theme.colors.navy,
              },
            }}
          />
          <RootStack.Screen
            name="DetailCar"
            component={DetailCarScreen}
            options={{
              headerStyle: {
                backgroundColor: theme.colors.navy,
              },
            }}
          />
          <RootStack.Screen
            name="OrderDetail"
            component={OrderDetailScreen}
            options={{
              headerStyle: {
                backgroundColor: theme.colors.navy,
              },
            }}
          />
          <RootStack.Screen
            name="PaymentMethod"
            component={PaymentMethodScreen}
            options={{
              headerStyle: {
                backgroundColor: theme.colors.navy,
              },
            }}
          />
          <RootStack.Screen
            name="DailyBookingOrderDetailScreen"
            component={DailyBookingOrderDetailScreen}
            options={{
              headerStyle: {
                backgroundColor: theme.colors.navy,
              },
            }}
          />
          <RootStack.Screen
            name="CardPayment"
            component={CardPaymentScreen}
            options={{
              headerStyle: {
                backgroundColor: theme.colors.navy,
              },
            }}
          />
          <RootStack.Screen
            name="VirtualAccount"
            component={VirtualAccountScreen}
            options={{
              headerStyle: {
                backgroundColor: theme.colors.navy,
              },
            }}
          />
          <RootStack.Screen
            name="BankTransfer"
            component={BankTransferScreen}
            options={{
              headerStyle: {
                backgroundColor: theme.colors.navy,
              },
            }}
          />
          <RootStack.Screen
            name="UploadBankTransfer"
            component={UploadBankTransferScreen}
            options={{
              headerStyle: {
                backgroundColor: theme.colors.navy,
              },
            }}
          />
          <RootStack.Screen
            name="InstantPayment"
            component={InstantPaymentScreen}
            options={{
              headerStyle: {
                backgroundColor: theme.colors.navy,
              },
            }}
          />
          <RootStack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              headerStyle: {
                backgroundColor: theme.colors.navy,
              },
              ...leftToRightAnimation,
            }}
          />
          <RootStack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
            options={{
              headerStyle: {
                backgroundColor: theme.colors.navy,
              },
              ...leftToRightAnimation,
            }}
          />
          <RootStack.Screen
            name="Notification"
            component={NotificationScreen}
            options={{
              headerStyle: {
                backgroundColor: theme.colors.navy,
              },
              ...leftToRightAnimation,
            }}
          />
          <RootStack.Screen
            name="InboxDetail"
            component={InboxDetailScreen}
            options={{
              headerStyle: {
                backgroundColor: theme.colors.navy,
              },
              ...leftToRightAnimation,
            }}
          />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default MainStack;
