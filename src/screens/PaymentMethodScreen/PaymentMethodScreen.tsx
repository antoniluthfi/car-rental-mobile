import appBar from 'components/AppBar/AppBar';
import Button from 'components/Button';
import hoc from 'components/hoc';
import React, {FC, useEffect} from 'react';
import {appDataState} from 'redux/features/appData/appDataSlice';
import {createDisbursements} from 'redux/features/order/orderAPI';
import {getPayments} from 'redux/features/appData/appDataAPI';
import {h1, h4} from 'utils/styles';
import {iconCustomSize, iconSize, rowCenter, WINDOW_WIDTH} from 'utils/mixins';
import {IPayments, METHOD_PAYMENT} from 'types/global.types';
import {orderState} from 'redux/features/order/orderSlice';
import {RootStackParamList} from 'types/navigator';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {showBSheet} from 'utils/BSheet';
import {theme} from 'utils';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {useTranslation} from 'react-i18next';
import {
  ic_american_express,
  ic_arrow_left_white,
  ic_arrow_right,
  ic_bca,
  ic_confirmation,
  ic_gopay,
  ic_jcb,
  ic_mandiri,
  ic_master_card,
  ic_visa,
} from 'assets/icons';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const DATA_METHOD_PAYMENT: {
  title: string;
  method: METHOD_PAYMENT;
  icon?: any;
}[] = [
  {
    title: 'Card Payment',
    method: 'Credit Card',
    icon: [ic_visa, ic_master_card, ic_jcb, ic_american_express],
  },
  {
    title: 'Virtual Account',
    method: 'Virtual Account',
  },
  {
    title: 'Transfer',
    method: 'Manual Transfer',
  },
  {
    title: 'Instant Payment',
    method: 'E-money',
  },
];

type PaymentMethodScreenRouteProp = RouteProp<
  RootStackParamList,
  'PaymentMethod'
>;

const PaymentMethodScreen: FC = () => {
  const navigation = useNavigation();
  const route = useRoute<PaymentMethodScreenRouteProp>();
  const dispatch = useAppDispatch();
  const paymentMethods = useAppSelector(appDataState).payments;
  const order = useAppSelector(orderState).order;
  const {t} = useTranslation();

  useEffect(() => {
    navigation.setOptions(
      appBar({
        leading: (
          <TouchableOpacity
            style={rowCenter}
            onPress={() => navigation.goBack()}>
            <Image
              source={ic_arrow_left_white}
              style={{
                height: 20,
                width: 20,
                marginLeft: 16,
              }}
            />
            <Text style={[h1, {color: 'white', marginLeft: 10}]}>
              {t('payment_method.header')}
            </Text>
          </TouchableOpacity>
        ),
      }),
    );

    dispatch(getPayments());
  }, [navigation, t]);

  const methods = {
    handleConfirmation: (data: IPayments) => {
      showBSheet({
        content: (
          <View
            style={{
              width: WINDOW_WIDTH,
              flex: 1,
              alignItems: 'center',
              margin: 16,
            }}>
            <Image
              source={ic_confirmation}
              style={iconCustomSize(200)}
              resizeMode={'contain'}
            />
            <Text style={[h1, {marginVertical: 20}]}>
              {t('global.alert.payment_confirm')}
            </Text>
            <View style={{width: '95%', margin: 16}}>
              <Button
                _theme="navy"
                title={t('global.button.yesNext')}
                onPress={() => {
                  if (data.method === 'Credit Card') {
                    navigation.navigate('CardPayment', {
                      selectedPayment: data,
                      transaction_key: route.params?.transaction_key,
                    });
                  } else if (data.method === 'Manual Transfer') {
                    navigation.navigate('BankTransfer', {
                      selectedPayment: data,
                      transaction_key: route.params?.transaction_key,
                    });
                  } else if (data.method === 'E-money') {
                    methods.handleInstantPayment(data);
                  } else if (data.method === 'Virtual Account') {
                    methods.handlePaymentVA(data);
                  }

                  methods.handleConfirmation(data);
                }}
                styleWrapper={{marginBottom: 20}}
              />
              <Button
                _theme="white"
                title={t('global.button.back')}
                onPress={() => methods.handleConfirmation(data)}
              />
            </View>
          </View>
        ),
        snapPoint: ['60%', '90%'],
      });
    },
    handlePaymentVA: async (data: IPayments) => {
      const res = await dispatch(
        createDisbursements({
          payment_type_id: data.id,
          transaction_key: order.transaction_key,
        }),
      );
      if (res.type.includes('fulfilled')) {
        navigation.navigate('VirtualAccount', {
          selectedPayment: data,
          transaction_key:
            route.params?.transaction_key || order.transaction_key,
        });
      }
    },
    handleInstantPayment: async (data: IPayments) => {
      const res = await dispatch(
        createDisbursements({
          payment_type_id: data.id,
          transaction_key:
            route.params?.transaction_key || order.transaction_key,
        }),
      );
      if (res.type.includes('fulfilled')) {
        navigation.navigate('InstantPayment', {
          selectedPayment: data,
          transaction_key:
            route.params?.transaction_key || order.transaction_key,
        });
      }
    },
    handleIcon: (ic: string) => {
      switch (ic) {
        case 'BCA':
          return ic_bca;
        case 'BNI':
          return ic_bca;
        case 'BRI':
          return ic_bca;
        case 'Mandiri':
          return ic_mandiri;
        case 'Permata':
          return ic_bca;
        case 'Gopay':
          return ic_gopay;
        default:
          break;
      }
    },
  };

  return (
    <>
      <View
        style={{
          flex: 1,
        }}>
        <ScrollView>
          {DATA_METHOD_PAYMENT.map((_payment, i) => (
            <View style={{margin: 16}} key={i}>
              <Text style={[h1, {fontSize: 14, marginTop: 25}]}>
                {_payment.title}
              </Text>

              {paymentMethods
                .filter(obj => obj.method === _payment.method)
                ?.map((x, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[
                      rowCenter,
                      {justifyContent: 'space-between', marginTop: 14},
                    ]}
                    onPress={() => methods.handleConfirmation(x)}>
                    <Text style={h4}>{x.code || x.description}</Text>

                    <View
                      style={[
                        rowCenter,
                        {
                          width: '40%',
                          justifyContent:
                            (x.code || x.description) === 'Credit Card'
                              ? 'space-between'
                              : 'flex-end',
                        },
                      ]}>
                      {(x.code || x.description) === 'Credit Card' ? (
                        <>
                          <Image source={ic_visa} style={iconSize} />
                          <Image source={ic_master_card} style={iconSize} />
                          <Image source={ic_jcb} style={iconSize} />
                          <Image
                            source={ic_american_express}
                            style={iconSize}
                          />
                        </>
                      ) : (
                        <Image
                          source={methods.handleIcon(x.code)}
                          style={[iconSize, {marginRight: 10}]}
                        />
                      )}

                      <Image
                        source={ic_arrow_right}
                        style={iconCustomSize(12)}
                        resizeMode={'contain'}
                      />
                    </View>
                  </TouchableOpacity>
                ))}
              <View style={[styles.lineHorizontal, {marginVertical: 10}]} />
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default hoc(PaymentMethodScreen);

const styles = StyleSheet.create({
  lineHorizontal: {
    borderBottomColor: theme.colors.grey6,
    borderBottomWidth: 1,
  },
});
