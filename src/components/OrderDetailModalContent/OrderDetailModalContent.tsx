import React, {useEffect, useState} from 'react';
import {colors} from 'utils/styles';
import {ic_pinpoin} from 'assets/icons';
import {iconSize} from 'utils/mixins';
import {idrFormatter} from 'utils/functions';
import {Image, StyleSheet, Text, View} from 'react-native';
import {img_car_2} from 'assets/images';
import {isFuture} from 'date-fns';
import {useAppSelector} from 'redux/hooks';
import {useTranslation} from 'react-i18next';

const OrderDetailModalContent: React.FC = () => {
  const {t} = useTranslation();
  const bookingDetail = useAppSelector(state => state.myBooking);
  const garages = useAppSelector(state => state.garages.data);
  const vehicle = useAppSelector(state => state.vehicles).vehicleById;

  const {selected} = bookingDetail;

  const [orderState, setOrderState] = useState<string>('');

  const getPaymentLabel = () => {
    if (selected?.disbursement) {
      if (selected?.disbursement?.payment?.method === 'Virtual Account') {
        if (selected?.disbursement?.bill_key) {
          return selected?.disbursement?.bill_key;
        }

        if (selected?.disbursement?.permata_va_number) {
          return selected?.disbursement?.permata_va_number;
        }

        return selected?.disbursement?.va_number;
      }

      return (
        selected?.disbursement?.payment?.code ||
        selected?.disbursement?.payment?.method
      );
    }

    return 'Belum memilih metode pembayaran';
  };

  useEffect(() => {
    setOrderState(selected?.order_status as any);

    if (
      (selected?.order_status?.toLowerCase() == 'pending' &&
        !isFuture(new Date(selected?.expired_time))) ||
      (selected?.order_status?.toLowerCase() == 'reconfirmation' &&
        !isFuture(new Date(selected?.expired_time)))
    ) {
      setOrderState('FAILED');
    }
  }, [selected?.order_status, selected?.expired_time]);

  return (
    <View style={{paddingHorizontal: '5%'}}>
      <View style={styles.descriptionContainer}>
        <View style={{flexBasis: '50%'}}>
          <Text style={styles.text}>{t('detail_order.order_no')}</Text>
          <Text style={styles.boldText}>{selected?.id}</Text>
        </View>

        <View style={{flexBasis: '50%'}}>
          <Text style={styles.text}>{t('myBooking.paymentMethod')}</Text>
          <Text style={styles.boldText}>{getPaymentLabel()}</Text>
        </View>
      </View>
      <View style={styles.dashedLine} />

      <View style={styles.descriptionContainer}>
        <View style={{flexBasis: '60%', flexDirection: 'row'}}>
          <View style={styles.roundedImage}>
            <Image
              source={img_car_2}
              style={styles.imgCar}
              resizeMode="cover"
            />
          </View>

          <View>
            <Text style={styles.text}>{t('myBooking.car')}</Text>
            <Text style={styles.boldText}>
              {vehicle?.brand_name
                ? `${vehicle?.brand_name}${
                    vehicle?.name ? ` ${vehicle?.name}` : ''
                  }`
                : '-'}
            </Text>
          </View>
        </View>

        <View style={{flexBasis: '50%'}}>
          <Text style={styles.text}>{t('myBooking.totalPassenger')}</Text>
          <Text style={styles.boldText}>{vehicle?.max_passanger || '-'}</Text>
        </View>
      </View>
      <View style={styles.dashedLine} />

      <View style={styles.descriptionContainer}>
        <View style={{flexBasis: '50%'}}>
          <Text style={styles.text}>{t('myBooking.totalPrice')}</Text>
          <Text style={styles.boldText}>
            {idrFormatter(selected?.total_payment)}
          </Text>
        </View>

        <View style={{flexBasis: '50%'}}>
          <Text style={styles.text}>{t('myBooking.paymentStatus')}</Text>
          <Text style={styles.boldText}>{orderState}</Text>
        </View>
      </View>
      <View style={styles.solidLine} />

      <View style={{padding: '5%'}}>
        <Text style={styles.text}>
          {selected?.order_detail?.is_take_from_rental_office
            ? t('myBooking.pickupLocation')
            : t('myBooking.returnLocation')}
        </Text>
        <View
          style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
          <Image source={ic_pinpoin} style={[iconSize, {marginRight: 10}]} />
          <Text style={styles.text}>
            {selected?.order_detail?.rental_delivery_location}
          </Text>
        </View>
      </View>
      <View style={styles.solidLine} />

      <View style={{padding: '5%'}}>
        <Text style={styles.text}>{t('myBooking.returnLocation')}</Text>
        <View
          style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
          <Image source={ic_pinpoin} style={[iconSize, {marginRight: 10}]} />
          <Text style={styles.text}>
            {
              garages?.find(
                data =>
                  data?.id === selected?.order_detail?.rental_return_office_id,
              )?.name
            }
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OrderDetailModalContent;

const styles = StyleSheet.create({
  descriptionContainer: {
    padding: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 12,
    color: '#000000',
  },
  boldText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  dashedLine: {
    borderColor: colors.gray700,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  solidLine: {
    borderColor: colors.gray700,
    borderWidth: 0.5,
  },
  roundedImage: {
    borderRadius: 100,
    width: 48,
    height: 48,
    backgroundColor: 'red',
    overflow: 'hidden',
    marginRight: 10,
  },
  imgCar: {
    width: 48,
    height: 48,
  },
});
