import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import hoc from 'components/hoc';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import appBar from 'components/AppBar/AppBar';
import {iconCustomSize, rowCenter} from 'utils/mixins';
import {
  ic_arrow_left_white,
  ic_arrow_right,
  ic_bca,
  ic_copy,
} from 'assets/icons';
import {h1, h4, h5} from 'utils/styles';
import {theme} from 'utils';
import Button from 'components/Button';
import {showBSheet} from 'utils/BSheet';
import {RootStackParamList} from 'types/navigator';
import {currencyFormat} from 'utils/currencyFormat';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {vehiclesState} from 'redux/features/vehicles/vehiclesSlice';
import {getOrderById} from 'redux/features/myBooking/myBookingAPI';
import {bookingState} from 'redux/features/myBooking/myBookingSlice';
import {getVehiclesById} from 'redux/features/vehicles/vehiclesAPI';
import OrderDetailModalContent from 'components/OrderDetailModalContent/OrderDetailModalContent';
import moment from 'moment';
import Clipboard from '@react-native-clipboard/clipboard';
import { showToast } from 'utils/Toast';

const TIMER = 299;
const FAQ = [
  'Masukan No. kartu, Masa berlaku dan juga kode CVV  anda di form yang telah disediakan, pastikan nomor yang diinput valid dan tidak salah dalam penulisan',
  'Lalu verifikasi Debit Card anda dengan menekan button “Verifikasi”. Setelah Debit Card terverifikasi maka anda bisa melanjutkan pembayaran.',
  'Setelah pembayaran berhasil dan terverifikasi maka status pesanan anda akan success serta transaksi anda akan nyaman dan aman.',
];

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'VirtualAccount'>;

const VirtualAccountScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const bookingDetail = useAppSelector(bookingState).selected;
  const route = useRoute<ProfileScreenRouteProp>();
  const vehicle = useAppSelector(vehiclesState).vehicleById;
  const [seconds, setSeconds] = useState(TIMER);

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
    secondsToHms: (d: any) => {
      d = Number(d);
      const m = Math.floor((d % 3600) / 60);
      const s = Math.floor((d % 3600) % 60);

      const mDisplay = m > 0 ? m : '0';
      const sDisplay = s > 0 ? s : '0';
      return '0' + mDisplay + ':' + (sDisplay > 9 ? sDisplay : '0' + sDisplay);
    },
    handleOrderDetail: () => {
      showBSheet({
        content: <OrderDetailModalContent />,
      });
    },
    copyText: () => {
      Clipboard.setString(bookingDetail?.disbursement?.va_number as any);
      showToast({
        title: 'Berhasil',
        type: 'success',
        message: 'berhasil menyalin teks',
      });
    },
  };

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds(0);
    }
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
              {route.params?.selectedPayment.code} Virtual Account
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  useEffect(() => {
    if (route.params.transaction_key) {
      dispatch(getOrderById(route.params.transaction_key));
    }
  }, [route.params.transaction_key]);

  useEffect(() => {
    if (bookingDetail?.order_detail?.vehicle_id) {
      dispatch(getVehiclesById(bookingDetail?.order_detail?.vehicle_id as any));
    }
  }, [bookingDetail?.order_detail?.vehicle_id]);

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
            {moment(bookingDetail?.expired_time).format('ddd, DD MMMM YYYY')}
          </Text>
        </View>
        <Text style={[h1, {color: theme.colors.blue}]}>
          {methods.secondsToHms(seconds)}
        </Text>
      </View>

      <View
        style={{
          margin: 16,
        }}>
        <TouchableOpacity
          onPress={methods.handleOrderDetail}
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
            <Text style={[h5, {fontSize: 12}]}>
              {`${vehicle.brand_name} ${vehicle.name}`}
            </Text>
            <Text style={[h5, {fontSize: 12}]}>
              {moment(bookingDetail?.order_detail?.start_booking_date).format(
                'DD MMMM',
              )}{' '}
              -{' '}
              {moment(bookingDetail?.order_detail?.end_booking_date).format(
                'DD MMMM',
              )}{' '}
              {bookingDetail?.order_detail?.start_booking_time}
            </Text>
          </View>
          <Image
            source={ic_arrow_right}
            style={iconCustomSize(10)}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <View style={styles.lineHorizontal} />

        <Text style={[h1, {marginTop: 20}]}>Lakukan Pembayaran</Text>

        <View>
          <View style={[rowCenter, {marginTop: 10}]}>
            <Image source={ic_bca} style={iconCustomSize(30)} />
            <Text style={[h5, {fontSize: 12, marginLeft: 10}]}>
              {bookingDetail?.disbursement?.payment?.code} Virtual Account
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
            <Text style={[h1]}>{bookingDetail?.disbursement?.va_number}</Text>
            <TouchableOpacity onPress={methods.copyText}>
              <Image
                source={ic_copy}
                style={iconCustomSize(40)}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
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
          <Text>{currencyFormat(bookingDetail?.total_payment)}</Text>
        </View>

        <View style={styles.lineHorizontal} />

        <Text style={[h1, {marginTop: 20}]}>FAQ</Text>

        <TouchableOpacity
          style={[
            styles.HowToWrapper,
            rowCenter,
            {justifyContent: 'space-between'},
          ]}
          onPress={methods.handleFAQ}>
          <Text style={h4}>Transfer melalui Mobile Banking</Text>
          <Image
            source={ic_arrow_right}
            style={iconCustomSize(10)}
            resizeMode={'contain'}
          />
        </TouchableOpacity>

        <Button
          _theme="navy"
          onPress={() => navigation.navigate('MainTab', {screen: 'Booking'})}
          title={'Ke Halaman My Bookings'}
          styleWrapper={{
            marginTop: 26,
          }}
        />
      </View>
    </View>
  );
};

export default hoc(VirtualAccountScreen);

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
