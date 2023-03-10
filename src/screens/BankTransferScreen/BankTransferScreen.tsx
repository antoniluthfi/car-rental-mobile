import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import hoc from 'components/hoc';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import appBar from 'components/AppBar/AppBar';
import {iconCustomSize, rowCenter} from 'utils/mixins';
import {
  ic_arrow_left_white,
  ic_arrow_right,
  ic_bca,
  ic_copy,
  ic_mandiri,
} from 'assets/icons';
import {h1, h4, h5} from 'utils/styles';
import {theme} from 'utils';
// import TextInputCredit from 'components/TextInputCredit/TextInputCredit';
// import TextInputTimeExpired from 'components/TextInputTimeExpired/TextInputTimeExpired';
// import TextInputCVV from 'components/TextInputCVV/TextInputCVV';
import Button from 'components/Button';
import {showBSheet} from 'utils/BSheet';
import {RootStackParamList} from 'types/navigator';
import {currencyFormat} from 'utils/currencyFormat';
import { showToast } from 'utils/Toast';
import { Clipboard } from '@react-native-clipboard/clipboard/dist/Clipboard';
import { useTranslation } from 'react-i18next';

const FAQ = [
  'Masukan No. kartu, Masa berlaku dan juga kode CVV  anda di form yang telah disediakan, pastikan nomor yang diinput valid dan tidak salah dalam penulisan',
  'Lalu verifikasi Debit Card anda dengan menekan button “Verifikasi”. Setelah Debit Card terverifikasi maka anda bisa melanjutkan pembayaran.',
  'Setelah pembayaran berhasil dan terverifikasi maka status pesanan anda akan success serta transaksi anda akan nyaman dan aman.',
];

type BankTransferScreenRouteProp = RouteProp<
  RootStackParamList,
  'BankTransfer'
>;

const BankTransferScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const route = useRoute<BankTransferScreenRouteProp>();

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
              {t('bank_transfer.bank_transfer')}
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  const methods = {
    handleFAQ: (index: number) => {
      showBSheet({
        content: (
          <View
            style={{
              width: '100%',
              flex: 1,
              margin: 16,
            }}>
            <Text style={[h1, {margin: 16, fontSize: 18}]}>
              {t('instant_payment.payment_instruction')}
            </Text>
            {[
              ...Array(
                t(
                  `manual_transfer.${route.params?.selectedPayment.code.toLowerCase()}.${index}.step_length`,
                ),
              ).fill(''),
            ].map((x, i) => (
              <View key={i} style={[{margin: 16, flexDirection: 'row'}]}>
                <Text>{i + 1}. </Text>
                <Text>
                  {t(
                    `manual_transfer.${route.params?.selectedPayment.code.toLowerCase()}.${index}.steps.${i}`,
                  )}
                </Text>
              </View>
            ))}
          </View>
        ),
      });
    },
    copyText: (text: string) => {
      Clipboard.setString(text);
      showToast({
        title: t('global.alert.success'),
        type: 'success',
        message: t('global.alert.success_copy_text'),
      });
    },
  };

  return (
    <View
      style={{
        flex: 1,
        margin: 16,
      }}>
      <Text style={[h1, {marginTop: 20}]}>
        {t('bank_transfer.make_payment')}
      </Text>

      <View style={[rowCenter, {marginTop: 10}]}>
        <Image source={ic_mandiri} style={iconCustomSize(30)} />
        <Text style={[h5, {fontSize: 12, marginLeft: 10}]}>
          {t('bank_transfer.mandiri_transfer')}
        </Text>
      </View>

      <View
        style={[
          rowCenter,
          {
            justifyContent: 'space-between',
            backgroundColor: theme.colors.cloud,
            padding: 10,
          },
        ]}>
        <Text style={[h1]}>2132113123213</Text>
        <TouchableOpacity onPress={() => methods.copyText('2132113123213')}>
          <Image
            source={ic_copy}
            style={iconCustomSize(40)}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>

      <View style={[rowCenter, {marginTop: 10}]}>
        <Image source={ic_bca} style={iconCustomSize(30)} />
        <Text style={[h5, {fontSize: 12, marginLeft: 10}]}>
          {t('bank_transfer.bca_transfer')}
        </Text>
      </View>

      <View
        style={[
          rowCenter,
          {
            justifyContent: 'space-between',
            backgroundColor: theme.colors.cloud,
            padding: 10,
          },
        ]}>
        <Text style={[h1]}>2132113123213</Text>
        <TouchableOpacity onPress={() => methods.copyText('2132113123213')}>
          <Image
            source={ic_copy}
            style={iconCustomSize(40)}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.lineHorizontal} />
      <Text style={[h1, {marginTop: 20, marginBottom: 10}]}>
        {t('bank_transfer.total_payment')}
      </Text>

      <View
        style={[
          {
            backgroundColor: theme.colors.cloud,
            padding: 10,
          },
        ]}>
        <Text>{currencyFormat(120000)}</Text>
      </View>

      <View style={styles.lineHorizontal} />

      <Text style={[h1, {marginTop: 20}]}>
          {t('virtual_account.payment_Instruction')}
        </Text>

        {[
          ...Array(
            t(
              `manual_transfer.${route.params?.selectedPayment.code.toLowerCase()}_length`,
            ),
          ).fill(''),
        ].map((x, i) => (
          <TouchableOpacity
            style={[
              styles.HowToWrapper,
              rowCenter,
              {justifyContent: 'space-between'},
            ]}
            key={i.toString()}
            onPress={() => methods.handleFAQ(i)}>
            <Text style={h4}>
              {t(
                `manual_transfer.${route.params?.selectedPayment.code.toLowerCase()}.${i}.title`,
              )}
            </Text>
            <Image
              source={ic_arrow_right}
              style={iconCustomSize(10)}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        ))}

      <Button
        _theme="navy"
        onPress={() => {
          navigation.navigate('UploadBankTransfer', route.params);
        }}
        title={t('bank_transfer.upload_proof_payment')}
        styleWrapper={{
          marginTop: 26,
        }}
      />
    </View>
  );
};

export default hoc(BankTransferScreen);

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
