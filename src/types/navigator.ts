import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {IPayments, IRegisterVerificationStep} from './global.types';

type RootStackParamList = {
  ProductDetail: {productId: string};
  MainTab?: RootTabParamList;
  Login: undefined;
  Auth: undefined;
  Register: undefined;
  RegisterPassword: undefined;
  RegisterVerification: {
    page: IRegisterVerificationStep;
  };
  ForgotPassword: undefined;
  ResetPassword: undefined;
  ListCar: undefined;
  DetailCar: {
    vehicle_id: number;
  };
  OrderDetail: undefined;
  PaymentMethod?: {
    transaction_key: string;
  };
  DailyBookingOrderDetailScreen: {
    transaction_key: string;
  };
  CardPayment: {
    selectedPayment: IPayments;
    transaction_key?: string;
  };
  VirtualAccount: {
    selectedPayment: IPayments;
    transaction_key: string;
  };
  BankTransfer: {
    selectedPayment: IPayments;
    transaction_key?: string;
  };
  UploadBankTransfer: {
    selectedPayment: IPayments;
    transaction_key?: string;
  };
  InstantPayment: {
    selectedPayment: IPayments;
    transaction_key: string;
  };
  Profile: undefined;
  ChangePassword: undefined;
  Notification: undefined;
  InboxDetail: {
    id: number;
  };
  CodepushUpdateManager: {failedInstall: boolean};
};

type RootTabParamList = {
  Home: undefined;
  Booking: undefined;
  Inbox: undefined;
  Account: undefined;
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;

type navigationProps = StackNavigationProp<RootStackParamList>;

export type {RootStackParamList, navigationProps, RootTabParamList};
