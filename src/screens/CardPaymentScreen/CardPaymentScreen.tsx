import appBar from 'components/AppBar/AppBar';
import hoc from 'components/hoc';
import React, {useEffect, useRef, useState} from 'react';

import {iconCustomSize, iconSize, rowCenter} from 'utils/mixins';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ic_american_express,
  ic_arrow_left_white,
  ic_arrow_right,
  ic_jcb,
  ic_master_card,
  ic_shield,
  ic_visa,
} from 'assets/icons';
import {h1, h2, h3, h4, h5} from 'utils/styles';
import {theme} from 'utils';
import TextInputCredit from 'components/TextInputCredit/TextInputCredit';
import TextInputTimeExpired from 'components/TextInputTimeExpired/TextInputTimeExpired';
import TextInputCVV from 'components/TextInputCVV/TextInputCVV';
import Button from 'components/Button';
import {showToast} from 'utils/Toast';
import {showBSheet} from 'utils/BSheet';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import axios from 'axios';
import {API_MIDTRANS, MIDTRANS_CLIENT} from '@env';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {createDisbursements} from 'redux/features/order/orderAPI';
import {orderState} from 'redux/features/order/orderSlice';
import {RootStackParamList} from 'types/navigator';
import TextInputName from 'components/TextInputName/TextInputName';
import { useTranslation } from 'react-i18next';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

const FAQ = [
  'Masukan No. kartu, Masa berlaku dan juga kode CVV  anda di form yang telah disediakan, pastikan nomor yang diinput valid dan tidak salah dalam penulisan',
  'Lalu verifikasi Debit Card anda dengan menekan button “Verifikasi”. Setelah Debit Card terverifikasi maka anda bisa melanjutkan pembayaran.',
  'Setelah pembayaran berhasil dan terverifikasi maka status pesanan anda akan success serta transaksi anda akan nyaman dan aman.',
];

interface IForm {
  card_number: string;
  card_cvv: string;
  card_exp: string;
  card_owner_name: string;
}
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'CardPayment'>;
const CardPaymentScreen = () => {
  const {t} = useTranslation();
  const route = useRoute<ProfileScreenRouteProp>();
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const order = useAppSelector(orderState).order;

  const [form, setForm] = useState<IForm>({
    card_cvv: '',
    card_exp: '',
    card_number: '',
    card_owner_name: '',
  });

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
              {t('card_payment.tabBarLabel')}
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  const methods = {
    handleFAQ: () => {
      showBSheet({
        content: (
          <View
            style={{
              width: '100%',
              flex: 1,
              margin: 16,
            }}>
            <Text style={[h1, {margin: 16, fontSize: 18}]}>
            {t(
                    `card_payment.payment_Instruction`,
                  )}
            </Text>
            {[
              ...Array(
                t(
                  `card_payment.card_payment_length`,
                ),
              ).fill(''),
            ].map((x, i) => (
              <View key={i} style={[{margin: 16, flexDirection: 'row'}]}>
                <Text>{i + 1}. </Text>
                <Text>
                  {t(
                    `card_payment.steps.${i}`,
                  )}
                </Text>
              </View>
            ))}
          </View>
        ),
      });
    },
    handleMitransGetToken: async () => {
      // console.log({
      //   client_key: MIDTRANS_CLIENT,
      //   card_number: form.card_number,
      //   card_cvv: form.card_cvv,
      //   card_exp_month: form.card_exp.slice(0, 2),
      //   card_exp_year: '20' + form.card_exp.slice(-2),
      // });
      // return
      const config: any = {
        method: 'get',
        url: `${API_MIDTRANS}/v2/token`,
        params: {
          client_key: MIDTRANS_CLIENT,
          card_number: form.card_number,
          card_cvv: form.card_cvv,
          card_exp_month: form.card_exp.slice(0, 2),
          card_exp_year: '20' + form.card_exp.slice(-2),
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      try {
        const data = await axios(config);
        if (data.data.status_code !== '200') {
          showToast({
            message:
              data.data.validation_messages?.toString() ||
              data.data.status_message,
            title: t('global.alert.error'),
            type: 'error',
          });
          return;
        }
        const res = await dispatch(
          createDisbursements({
            payment_type_id: route.params.selectedPayment.id,
            transaction_key:
              order.transaction_key || (route.params?.transaction_key as any),
            card_token_id: data?.data?.token_id,
            card_owner_name: form.card_owner_name,
          }),
        );

        if (res.type.includes('fulfilled')) {
          try {
            Linking.openURL(res?.payload.data?.disbursement?.redirect_url);
            setTimeout(() => {
              navigation.navigate('MainTab', {screen: 'Booking'});
            }, 1000);
          } catch (error) {
            showToast({
              message: t('global.alert.payment_can_not_be_made'),
              title: t('global.alert.error'),
              type: 'error',
            });
          }
        }
        // return data.data;
      } catch (error) {
        console.log(error);
      }
    },
  };

  return (
    <View
      style={{
        flex: 1,
        margin: 16,
      }}>
      <Text style={[h1]}>{t('card_payment.insert_card_info')}</Text>

      <TextInputName
        onChangeText={(c: string) => setForm({...form, card_owner_name: c})}
      />
      <TextInputCredit
        onChangeText={(c: string) => setForm({...form, card_number: c})}
      />
      <View
        style={[
          rowCenter,
          {width: '100%', justifyContent: 'space-between', marginTop: 10},
        ]}>
        <TextInputTimeExpired
          onChangeText={(c: string) => setForm({...form, card_exp: c})}
        />
        <View style={{marginHorizontal: 5}} />
        <TextInputCVV
          onChangeText={(c: string) => setForm({...form, card_cvv: c})}
        />
      </View>

      <View style={[rowCenter, styles.guardWrapper]}>
        <Image
          source={ic_shield}
          style={iconCustomSize(25)}
          resizeMode={'contain'}
        />
        <Text style={h3}> {t('card_payment.your_data_will_be_protected')}</Text>
      </View>
      <Button
        _theme="navy"
        onPress={() => {
          methods.handleMitransGetToken();
        }}
        title={'Lanjutkan Pembayaran'}
        styleWrapper={{
          marginTop: 26,
        }}
      />
      <View style={styles.lineHorizontal} />

      <Text style={[h1, {marginTop: 20}]}>{t('virtual_account.payment_Instruction')}</Text>

      <TouchableOpacity
        style={[
          styles.HowToWrapper,
          rowCenter,
          {justifyContent: 'space-between'},
        ]}
        onPress={methods.handleFAQ}>
        <Text style={h4}>{t('virtual_account.payment_Instruction')}</Text>
        <Image
          source={ic_arrow_right}
          style={iconCustomSize(10)}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default hoc(CardPaymentScreen);

const styles = StyleSheet.create({
  guardWrapper: {
    backgroundColor: theme.colors.cloud,
    padding: 17,
    marginTop: 23,
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
  },
  lineHorizontal: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey6,
    marginTop: 20,
  },
  HowToWrapper: {
    borderWidth: 1,
    borderColor: theme.colors.grey4,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
});
