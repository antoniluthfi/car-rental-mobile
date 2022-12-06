import {useNavigation} from '@react-navigation/native';
import {img_car_2} from 'assets/images';
import Button from 'components/Button';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useAppSelector} from 'redux/hooks';
import {slugify} from 'utils/functions';
import {rowCenter} from 'utils/mixins';

interface IProps {
  item: any;
}

export const paymentPendingStatus = ['PENDING', 'CHECKOUT', 'RECONFIRMATION'];
export const paymentFailedStatus = ['EXPIRED', 'FAILED'];
export const paymentSuccessStatus = [
  'SUCCESS',
  'PAID',
  'COMPLETED',
  'FINISHED',
];

const showPaymentButtonCode = [
  'checkout',
  'paid',
  'success',
  'failed',
  'completed',
  'finished',
];

export const paymentStatusStyle = (paymentStatus: string) => {
  if (paymentSuccessStatus.includes(paymentStatus)) return {color: '#089827'};
  if (paymentPendingStatus.includes(paymentStatus)) return {color: 'gray'};
  if (paymentFailedStatus.includes(paymentStatus)) return {color: '#6F6F6F'};
  return null;
};

const DailyLayoutCard: React.FC<IProps> = ({item}) => {
  const {
    order_status,
    expired_time,
    order_detail,
    disbursement,
    transaction_key,
  } = item;

  const navigation = useNavigation();
  const myBooking = useAppSelector(state => state.myBooking);

  const [orderState, setOrderState] = useState<string>('');

  const getButtonWidth = () => {
    if (!showPaymentButtonCode.includes(slugify(orderState))) {
      return {flexBasis: '49%'};
    }

    if (
      slugify(orderState) === 'checkout' &&
      disbursement?.payment?.method === 'Credit Card'
    ) {
      return {flexBasis: '49%'};
    }

    return {};
  };

  const handlePay = () => {
    if (!disbursement) {
      navigation.navigate('PaymentMethod', {transaction_key});
    } else {
      // if (disbursement?.payment?.method === 'Virtual Account') {
      //   router.push(
      //     `/payment?method=Virtual+Account&type=${slugify(
      //       disbursement?.payment?.code
      //     )}&key=${transaction_key}`
      //   );
      // }
      // if (disbursement?.payment?.method === 'E-money') {
      //   router.push(
      //     `/payment?method=E-money&type=Gopay&key=${transaction_key}`
      //   );
      // }
      // if (disbursement?.payment?.method === 'Credit Card') {
      //   window.open(disbursement?.redirect_url, '_blank');
      // }
      // if (disbursement?.payment?.method === 'Manual Transfer') {
      //   router.push(
      //     `/payment?method=manual-transfer&type=${disbursement.payment.code}&key=${transaction_key}`
      //   );
      // }
    }
  };

  useEffect(() => {
    setOrderState(order_status);

    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    const future = moment(expired_time).format('YYYY-MM-DD HH:mm:ss');

    if (
      order_status?.toLowerCase() == 'pending' &&
      moment(now).isAfter(future)
    ) {
      setOrderState('FAILED');
    }
  }, [order_status, expired_time]);

  return (
    <View style={styles.card}>
      <View style={[rowCenter]}>
        <View style={styles.roundedImage}>
          <Image source={img_car_2} style={styles.imgCar} resizeMode="cover" />
        </View>

        <View>
          <View style={styles.title}>
            <Text style={styles.daily}>Daily</Text>
            <Text style={[styles.status, paymentStatusStyle(orderState)]}>
              {orderState}
            </Text>
          </View>

          <Text>
            {myBooking.vehicleData?.find(
              v => v?.id === order_detail?.vehicle_id,
            )?.name || '-'}
          </Text>
          <Text>
            {moment(order_detail?.start_booking_date).format('D MMMM')} -{' '}
            {moment(order_detail?.end_booking_date).format('D MMMM')}{' '}
            {moment(
              moment
                .utc(
                  `${order_detail?.start_booking_date} ${order_detail?.end_booking_time}`,
                )
                .toDate(),
            ).format('hh:mm A')}
          </Text>
          <Text>
            {order_detail?.is_take_from_rental_office
              ? 'Lokasi Pickup'
              : 'Lokasi Pengantaran'}{' '}
            :{' '}
            <Text style={styles.pickupLocation}>
              {order_detail?.rental_delivery_location}
            </Text>
          </Text>
        </View>
      </View>

      <View style={{flexDirection: 'row'}}>
        {orderState !== 'expired' && (
          <Button
            _theme="navy"
            title="Detail Pesanan"
            onPress={() =>
              navigation.navigate('DailyBookingOrderDetailScreen', {
                transaction_key,
              })
            }
            styleWrapper={{
              marginTop: 21,
              marginRight: 5,
              ...getButtonWidth(),
            }}
          />
        )}

        {!showPaymentButtonCode.includes(slugify(orderState)) && (
          <Button
            _theme="navy"
            title={
              disbursement
                ? orderState == 'RECONFIRMATION'
                  ? 'Reupload'
                  : 'Bayar Sekarang'
                : 'Pilih Pembayaran'
            }
            onPress={handlePay}
            styleWrapper={{
              marginTop: 21,
              ...getButtonWidth(),
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: 'navy',
            }}
            styleText={{color: 'navy'}}
          />
        )}

        {slugify(orderState) === 'checkout' &&
          disbursement?.payment?.method === 'Credit Card' && (
            <Button
              _theme="navy"
              title="Verifikasi"
              onPress={() => {}}
              styleWrapper={{
                marginTop: 21,
                ...getButtonWidth(),
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: 'navy',
              }}
              styleText={{color: 'navy'}}
            />
          )}
      </View>
    </View>
  );
};

export default DailyLayoutCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    elevation: 3,
    marginBottom: 10,
    paddingHorizontal: '5%',
    paddingVertical: 20,
    shadowColor: '#E8E8E8',
    width: '100%',
  },
  roundedImage: {
    borderRadius: 100,
    width: 48,
    height: 48,
    backgroundColor: 'red',
    overflow: 'hidden',
    marginRight: 30,
  },
  imgCar: {
    width: 48,
    height: 48,
  },
  daily: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#344F67',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '69%',
  },
  status: {
    fontSize: 14,
  },
  pickupLocation: {
    color: '#000000',
    fontWeight: 'bold',
  },
});
