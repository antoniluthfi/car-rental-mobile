import appBar from 'components/AppBar/AppBar';
import CancelOrderButtonAction from 'components/MyBookingOrderDetailComponents/CancelOrderButtonAction/CancelOrderButtonAction';
import CustomCarousel from 'components/CustomCarousel/CustomCarousel';
import ExtendOrderButtonAction from 'components/MyBookingOrderDetailComponents/ExtendOrderButtonAction/ExtendOrderButtonAction';
import hoc from 'components/hoc';
import React, {useEffect, useState} from 'react';
import {getOrderById} from 'redux/features/myBooking/myBookingAPI';
import {h1, h5} from 'utils/styles';
import {ic_arrow_left_white, ic_download, ic_pinpoin} from 'assets/icons';
import {iconSize, rowCenter, WINDOW_WIDTH} from 'utils/mixins';
import {idrFormatter, slugify} from 'utils/functions';
import {img_car_2} from 'assets/images';
import {isFuture} from 'date-fns';
import {RootStackParamList} from 'types/navigator';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {URL_IMAGE} from '@env';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {useTranslation} from 'react-i18next';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type DailyBookingOrderDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'DailyBookingOrderDetailScreen'
>;

const DailyBookingOrderDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<DailyBookingOrderDetailScreenRouteProp>();
  const dispatch = useAppDispatch();
  const bookingDetail = useAppSelector(state => state.myBooking);
  const garages = useAppSelector(state => state.garages.data);
  const {t} = useTranslation();

  const [images, setImages] = useState<any[]>([]);
  const [orderState, setOrderState] = useState<string>('');

  const {selected, vehicleData} = bookingDetail;
  const vehicle = vehicleData?.find(
    v => v?.id === selected?.order_detail?.vehicle_id,
  );

  const getPaymentLabel = () => {
    if (selected?.disbursement) {
      if (selected?.disbursement?.payment?.method === 'Virtual Account') {
        if (selected?.disbursement.bill_key) {
          return selected?.disbursement?.bill_key;
        }

        if (selected.disbursement.permata_va_number) {
          return selected.disbursement?.permata_va_number;
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
              {t('global.button.orderDetail')}
            </Text>
          </TouchableOpacity>
        ),
        trailing: (
          <TouchableOpacity style={[rowCenter]}>
            <Image
              source={ic_download}
              style={{
                height: 20,
                width: 20,
                marginRight: 2,
              }}
            />
            <Text style={[h5, {color: 'white', marginRight: 16}]}>
              Download e-Ticket
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
    if (vehicle?.photo?.length) {
      const photos = vehicle?.photo?.map((vPhoto: any) => ({
        url: URL_IMAGE + vPhoto?.name,
      }));

      setImages(photos);
    }
  }, [vehicle]);

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
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <CustomCarousel
          data={images}
          progressValueSpace={30}
          renderCarouselTitle={
            vehicle?.brand_name ? (
              <View style={styles.carouselTitleContainer}>
                <Text style={{fontWeight: 'bold'}}>{`${vehicle?.brand_name}${
                  vehicle?.name ? ` ${vehicle?.name}` : ''
                }`}</Text>
              </View>
            ) : undefined
          }
          renderItem={({item, index}) => (
            <View
              style={{
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Image
                source={{uri: item?.url}}
                style={{height: 250, width: WINDOW_WIDTH}}
              />
            </View>
          )}
        />

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
                    data?.id ===
                    selected?.order_detail?.rental_return_office_id,
                )?.name
              }
            </Text>
          </View>
        </View>
        <View style={styles.solidLine} />
        <View style={styles.buttonContainer}>
          {isFuture(
            new Date(selected?.order_detail?.start_booking_date as any),
          ) &&
            slugify(orderState) !== 'failed' &&
            slugify(orderState) !== 'cancelled' && (
              <CancelOrderButtonAction
                transactionKey={route.params.transaction_key}
              />
            )}

          {slugify(orderState) == 'completed' && <ExtendOrderButtonAction />}
        </View>
      </ScrollView>
    </View>
  );
};

export default hoc(DailyBookingOrderDetailScreen);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
  },
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
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  solidLine: {
    borderColor: '#D3D3D3',
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
  carouselTitleContainer: {
    padding: 10,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 20,
    top: 20,
  },
  buttonContainer: {marginHorizontal: 16, marginVertical: 20},
});
