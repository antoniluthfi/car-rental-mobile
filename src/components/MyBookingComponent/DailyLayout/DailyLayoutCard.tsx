import Button from 'components/Button';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Image, Linking, StyleSheet, Text, View} from 'react-native';
import {img_car_2} from 'assets/images';
import {isFuture} from 'date-fns';
import {rowCenter} from 'utils/mixins';
import {slugify} from 'utils/functions';
import {useAppSelector} from 'redux/hooks';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

interface IProps {
  item: any;
}

export const paymentPendingStatus = ['PENDING', 'CHECKOUT', 'RECONFIRMATION'];
export const paymentFailedStatus = ['EXPIRED', 'FAILED', 'CANCELLED'];
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
  'cancelled',
  'completed',
  'finished',
];

export const paymentStatusStyle = (paymentStatus: string) => {
  if (paymentSuccessStatus.includes(paymentStatus)) return {color: '#089827'};
  if (paymentPendingStatus.includes(paymentStatus)) return {color: 'gray'};
  if (paymentFailedStatus.includes(paymentStatus)) return {color: '#CF0303'};
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
  const {t} = useTranslation();

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
      if (disbursement?.payment?.method === 'Virtual Account') {
        navigation.navigate('VirtualAccount', {
          selectedPayment: disbursement?.payment,
          transaction_key,
        });
      }
      if (disbursement?.payment?.method === 'E-money') {
        navigation.navigate('InstantPayment', {
          selectedPayment: disbursement?.payment,
          transaction_key,
        });
      }
      if (disbursement?.payment?.method === 'Credit Card') {
        Linking.openURL(disbursement?.redirect_url);
      }
      // if (disbursement?.payment?.method === 'Manual Transfer') {
      //   router.push(
      //     `/payment?method=manual-transfer&type=${disbursement.payment.code}&key=${transaction_key}`
      //   );
      // }
    }
  };

  useEffect(() => {
    setOrderState(order_status);

    if (
      (order_status.toLowerCase() == 'pending' &&
        !isFuture(new Date(expired_time))) ||
      (order_status.toLowerCase() == 'reconfirmation' &&
        !isFuture(new Date(expired_time)))
    ) {
      setOrderState('FAILED');
    }
  }, [order_status, expired_time]);

  return (
    <View style={styles.card}>
      <View style={styles.detailContainer}>
        <View style={styles.roundedImage}>
          <Image source={img_car_2} style={styles.imgCar} resizeMode="cover" />
        </View>

        <View style={{flexBasis: '75%'}}>
          <View style={styles.title}>
            <Text style={styles.daily}>{t('Home.daily.title')}</Text>
            <Text style={[styles.status, paymentStatusStyle(orderState)]}>
              {orderState}
            </Text>
          </View>

          <Text>
            {myBooking.vehicleData?.find(
              (v: any) => v?.id === order_detail?.vehicle_id,
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
              ? t('myBooking.pickupLocation')
              : t('myBooking.returnLocation')}{' '}
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
            title={t('global.button.orderDetail')}
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
                  : t('global.button.payNow')
                : t('global.button.choosePayment')
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
              title={t('global.button.verification')}
              onPress={() => handlePay()}
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
  detailContainer: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
  },
  roundedImage: {
    borderRadius: 100,
    width: 48,
    height: 48,
    backgroundColor: 'red',
    overflow: 'hidden',
    marginRight: 30,
    flexBasis: '15%',
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
    // width: '68%',
  },
  status: {
    fontSize: 14,
  },
  pickupLocation: {
    color: '#000000',
    fontWeight: 'bold',
  },
});
