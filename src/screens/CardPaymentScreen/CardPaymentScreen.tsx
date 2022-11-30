import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import hoc from 'components/hoc';
import {useNavigation} from '@react-navigation/native';
import appBar from 'components/AppBar/AppBar';
import {iconCustomSize, iconSize, rowCenter} from 'utils/mixins';
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

const FAQ = [
  'Masukan No. kartu, Masa berlaku dan juga kode CVV  anda di form yang telah disediakan, pastikan nomor yang diinput valid dan tidak salah dalam penulisan',
  'Lalu verifikasi Debit Card anda dengan menekan button “Verifikasi”. Setelah Debit Card terverifikasi maka anda bisa melanjutkan pembayaran.',
  'Setelah pembayaran berhasil dan terverifikasi maka status pesanan anda akan success serta transaksi anda akan nyaman dan aman.',
];
const CardPaymentScreen = () => {
  const navigation = useNavigation();

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
                Card Payment
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
            <Text style={[h1, {margin: 16, fontSize: 18}]}>Cara Pembayaran</Text>
            {FAQ.map((x, i) => (
              <View key={i} style={[ {margin: 16, flexDirection: 'row'}]}>
                <Text>{i + 1}. </Text>
                <Text>{x}</Text>
              </View>
            ))}
          </View>
        ),
      });
    },
  };

  return (
    <View
      style={{
        flex: 1,
        margin: 16,
      }}>
      <Text style={[h1]}>Masukkan Info Kartu</Text>
      <TextInputCredit />
      <View
        style={[
          rowCenter,
          {width: '100%', justifyContent: 'space-between', marginTop: 10},
        ]}>
        <TextInputTimeExpired />
        <View style={{marginHorizontal: 5}} />
        <TextInputCVV />
      </View>

      <View style={[rowCenter, styles.guardWrapper]}>
        <Image
          source={ic_shield}
          style={iconCustomSize(25)}
          resizeMode={'contain'}
        />
        <Text style={h3}> Data anda akan terlindungi</Text>
      </View>
      <Button
        _theme="navy"
        onPress={() => {}}
        title={'Lanjutkan Pembayaran'}
        styleWrapper={{
          marginTop: 26,
        }}
      />
      <View style={styles.lineHorizontal} />

      <Text style={[h1, {marginTop: 20}]}>FAQ</Text>

      <TouchableOpacity
        style={[
          styles.HowToWrapper,
          rowCenter,
          {justifyContent: 'space-between'},
        ]}
        onPress={methods.handleFAQ}
        >
        <Text style={h4}>Cara Pembayaran</Text>
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
