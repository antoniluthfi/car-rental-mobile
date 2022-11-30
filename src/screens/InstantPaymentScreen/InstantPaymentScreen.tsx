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
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import appBar from 'components/AppBar/AppBar';
import {iconCustomSize, iconSize, rowCenter} from 'utils/mixins';
import {
  ic_american_express,
  ic_arrow_left_white,
  ic_arrow_right,
  ic_bca,
  ic_copy,
  ic_gopay,
  ic_jcb,
  ic_master_card,
  ic_qr,
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
import {RootStackParamList} from 'types/navigator';
import {currencyFormat} from 'utils/currencyFormat';

const FAQ = [
  'Masukan No. kartu, Masa berlaku dan juga kode CVV  anda di form yang telah disediakan, pastikan nomor yang diinput valid dan tidak salah dalam penulisan',
  'Lalu verifikasi Debit Card anda dengan menekan button “Verifikasi”. Setelah Debit Card terverifikasi maka anda bisa melanjutkan pembayaran.',
  'Setelah pembayaran berhasil dan terverifikasi maka status pesanan anda akan success serta transaksi anda akan nyaman dan aman.',
];
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'VirtualAccount'>;
const InstantPaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ProfileScreenRouteProp>();

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
              {route.params?.selectedPayment.code}
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
              Cara Pembayaran
            </Text>
            {FAQ.map((x, i) => (
              <View key={i} style={[{margin: 16, flexDirection: 'row'}]}>
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
      }}>
      <View
        style={{
          padding: 16,
          backgroundColor: theme.colors.cloud,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={[h1]}>Selesaikan Sebelum</Text>
          <Text style={[h4, {marginTop: 10, fontSize: 12}]}>
            Sab, 30 April 2022, 22:44 WIB
          </Text>
        </View>
        <Text style={[h1, {color: theme.colors.blue}]}>00:49:15</Text>
      </View>

      <View
        style={{
          margin: 16,
        }}>
        <View
          style={[
            rowCenter,
            {
              justifyContent: 'space-between',
              backgroundColor: theme.colors.cloud,
              padding: 16,
            },
          ]}>
          <View>
            <Text style={[h1, {color: theme.colors.navy, fontSize: 12}]}>
              Daily
            </Text>
            <Text style={[h5, {fontSize: 12}]}>Suzuki Ertiga</Text>
            <Text style={[h5, {fontSize: 12}]}>
              1 Juli - 3 Juli 2022 10:00 PM
            </Text>
          </View>
          <Image
            source={ic_arrow_right}
            style={iconCustomSize(10)}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles.lineHorizontal} />

        <Text style={[h1, {marginTop: 20, marginBottom: 10}]}>
          Total Pembayaran
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

        <Text style={[h1, {marginTop: 20}]}>Lakukan Pembayaran</Text>

        <View style={[rowCenter, {marginTop: 10}]}>
          <Image source={ic_gopay} style={iconCustomSize(30)} />
          <Text style={[h5, {fontSize: 12, marginLeft: 10}]}>Gopay</Text>
        </View>

        <View
          style={[
            rowCenter,
            {
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.colors.cloud,
              padding: 10,
            },
          ]}>
          <Image
            source={ic_qr}
            style={iconCustomSize(140)}
            resizeMode={'contain'}
          />
        </View>

        <Button
          _theme="navy"
          onPress={() => {}}
          title={'Lanjutkan ke Aplikasi'}
          styleWrapper={{
            marginTop: 26,
          }}
        />

        <Button
          _theme="white"
          onPress={() => {}}
          title={'Ke Halaman My Bookings'}
          styleWrapper={{
            marginTop: 26,
          }}
        />
      </View>
    </View>
  );
};

export default hoc(InstantPaymentScreen);

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
