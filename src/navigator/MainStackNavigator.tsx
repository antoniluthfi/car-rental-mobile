import ChangePasswordScreen from 'screens/ChangePasswordScreen/ChangePasswordScreen';
import CodePush from 'react-native-code-push';
import CodepushUpdateManager from 'screens/CodepushUpdateManager/CodepushUpdateManager';
import DailyBookingOrderDetailScreen from 'screens/DailyBookingOrderDetailScreen/DailyBookingOrderDetailScreen';
import DeviceInfo from 'react-native-device-info';
import MainTabNavigator from './MainTabNavigator';
import NotificationScreen from 'screens/NotificationScreen/NotificationScreen';
import ProfileScreen from 'screens/ProfileScreen/ProfileScreen';
import React, {useEffect} from 'react';
import UploadBankTransferScreen from 'screens/UploadBankTransferScreen/UploadBankTransferScreen';
import {authState} from 'redux/features/auth/authSlice';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigator';
import {theme} from 'utils';
import {useAppSelector} from 'redux/hooks';
import {useNavigation} from '@react-navigation/native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const navigation = useNavigation();
  const auth = useAppSelector(authState);

  const checkCodepushUpdate = () => {
    CodePush.checkForUpdate()
      .then(async update => {
        if (update?.failedInstall) {
          await AsyncStorage.clear();
        } else {
          navigation.navigate('CodepushUpdateManager', {
            failedInstall: !!update?.failedInstall,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    const bundleId = DeviceInfo.getBundleId();
    console.log(bundleId);
    checkCodepushUpdate();
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
      <RootStack.Screen
        name="CodepushUpdateManager"
        component={CodepushUpdateManager}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
    </RootStack.Navigator>
  );
};

export default MainStack;
