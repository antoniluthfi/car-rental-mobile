import {useNavigation} from '@react-navigation/native';
import {
  ic_american_express,
  ic_arrow_left_white,
  ic_arrow_right,
  ic_bca,
  ic_confirmation,
  ic_dana,
  ic_facebook,
  ic_gopay,
  ic_jcb,
  ic_mandiri,
  ic_master_card,
  ic_ovo,
  ic_visa,
} from 'assets/icons';
import appBar from 'components/AppBar/AppBar';
import Button from 'components/Button';
import hoc from 'components/hoc';
import React, {FC, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {appDataState} from 'redux/features/appData/appDataSlice';
import {useAppSelector} from 'redux/hooks';
import {IPayments, METHOD_PAYMENT} from 'types/global.types';
import {theme} from 'utils';
import {showBSheet} from 'utils/BSheet';
import {iconCustomSize, iconSize, rowCenter, WINDOW_WIDTH} from 'utils/mixins';
import {h1, h4} from 'utils/styles';

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

const OrderDetailScreen: FC = () => {
  const navigation = useNavigation();
  const paymentMethods = useAppSelector(appDataState).payments;
  const [form, setForm] = useState({
    filter_car_type: '',
    filter_shit: '',
    filter_koper: '',
  });
  const [checkInfo, setCheckInfo] = useState(false);
  console.log(paymentMethods);

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
              Pilih Metode Pembayaran
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

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
            <Text>Apakah anda yakin melanjutkan Pembayaran ini?</Text>
            <View style={{width: '95%', margin: 16}}>
              <Button
                _theme="navy"
                title="Iya, Lanjutkan"
                onPress={() => {
                  let screen = '';
                  if (data.method === 'Credit Card') {
                    navigation.navigate('CardPayment', {selectedPayment: data});
                  } else if (data.method === 'Manual Transfer') {
                    navigation.navigate('BankTransfer', {
                      selectedPayment: data,
                    });
                  } else if (data.method === 'E-money') {
                    navigation.navigate('InstantPayment', {
                      selectedPayment: data,
                    });
                  } else if (data.method === 'Virtual Account') {
                    navigation.navigate('VirtualAccount', {
                      selectedPayment: data,
                    });
                  }

                  methods.handleConfirmation(data);
                }}
                styleWrapper={{marginBottom: 20}}
              />
              <Button
                _theme="white"
                title="Kembali"
                onPress={() => methods.handleConfirmation(data)}
              />
            </View>
          </View>
        ),
      });
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
          break;

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
            <View style={{margin: 16}}>
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

export default hoc(OrderDetailScreen);

const styles = StyleSheet.create({
  lineHorizontal: {
    borderBottomColor: theme.colors.grey6,
    borderBottomWidth: 1,
  },
});