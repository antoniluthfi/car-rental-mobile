import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { IRegisterVerificationStep } from './global.types';

type RootStackParamList = {
  ProductDetail: {productId: string};
  MainTab: RootTabParamList;
  Login: undefined;
  Auth: undefined;
  Register: undefined;
  RegisterPassword: undefined;
  RegisterVerification: {
    page: IRegisterVerificationStep;
  };
  ListCar: undefined;
  DetailCar: {
    carId: number;
  };
  OrderDetail: undefined;
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
