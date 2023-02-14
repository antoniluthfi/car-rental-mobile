import appBar from 'components/AppBar/AppBar';
import Button from 'components/Button';
import DeliveryLocationModalContent from 'components/OrderDetail/DeliveryLocationModalContent/DeliveryLocationModalContent';
import hoc from 'components/hoc';
import moment from 'moment';
import PaymentDetailModalContent from 'components/OrderDetail/PaymentDetailModalContent/PaymentDetailModalContent';
import React, {FC, useEffect, useState} from 'react';
import ReturnLocationModalContent from 'components/OrderDetail/ReturnLocationModalContent/ReturnLocationModalContent';
import TakingLocationModalContent from 'components/OrderDetail/TakingLocationModalContent/TakingLocationModalContent';
import {appDataState} from 'redux/features/appData/appDataSlice';
import {createOrder, getSummaryOrder} from 'redux/features/order/orderAPI';
import {currencyFormat} from 'utils/currencyFormat';
import {h1, h3, h4, h5} from 'utils/styles';
import {IGarages} from 'types/global.types';
import {IPayloadSummary} from 'types/order';
import {orderState} from 'redux/features/order/orderSlice';
import {showBSheet} from 'utils/BSheet';
import {theme} from 'utils';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ic_arrow_down,
  ic_arrow_left_white,
  ic_blue_check,
  ic_pen,
  ic_pinpoin,
  ic_uncheck,
} from 'assets/icons';
import {
  boxShadow,
  colorSelecting,
  iconCustomSize,
  iconSize,
  rowCenter,
} from 'utils/mixins';
import {
  getGarages,
  getPayments,
  getUser,
} from 'redux/features/appData/appDataAPI';

const OrderDetailScreen: FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(appDataState).userProfile;

  const formDaily = useAppSelector(appDataState).formDaily;
  const summaryOrder = useAppSelector(orderState).summaryOrder;
  const {t} = useTranslation();

  const [form, setForm] = useState<{
    taking_location: IGarages | null;
    return_location: IGarages | null;
    special_request?: string;
  }>({
    taking_location: null,
    return_location: null,
    special_request: '',
  });

  const [checkInfo, setCheckInfo] = useState(false);

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
              {t('detail_order.title')}
            </Text>
          </TouchableOpacity>
        ),
      }),
    );

    dispatch(getUser());
    dispatch(getGarages());
    dispatch(getPayments());
  }, [navigation, t]);

  useEffect(() => {
    const payload: IPayloadSummary = {
      order_type_id: 1,
      end_booking_date: moment(formDaily.end_trip).format('YYYY-MM-DD'),
      end_booking_time: formDaily.end_booking_time,
      start_booking_date: moment(formDaily.start_trip).format('YYYY-MM-DD'),
      start_booking_time: formDaily.start_booking_time,
      vehicle_id: formDaily.vehicle_id,
    };
    let params: string = '?';

    Object.keys(payload).map(x => {
      params += `${x}=${payload[x as keyof IPayloadSummary]}&`;
    });
    dispatch(getSummaryOrder(params));
  }, []);

  const methods = {
    handleOrder: async () => {
      const res = await dispatch(
        createOrder({
          booking_price: summaryOrder.booking_price,
          email: user.email,
          insurance_fee: summaryOrder.insurance_fee,
          order_detail: {
            end_booking_date: summaryOrder.end_booking_date,
            end_booking_time: summaryOrder.end_booking_time,
            is_take_from_rental_office: checkInfo,
            passenger_number: formDaily.passanger,
            rental_delivery_location: form.taking_location?.name!,
            rental_return_office_id: form.return_location?.id!,
            start_booking_date: summaryOrder.start_booking_date,
            start_booking_time: summaryOrder.start_booking_time,
            vehicle_id: summaryOrder.vehicle_id,
            special_request: form.special_request,
          },
          order_type_id: 1,
          phone_number: user.phone,
          rental_delivery_fee: summaryOrder.rental_delivery_fee,
          service_fee: summaryOrder.service_fee,
          total_payment: summaryOrder.total_payment,
          user_name: user.name,
          wa_number: user.wa_number,
        }),
      );

      if (res.type.includes('rejected')) {
        return;
      }

      navigation.navigate('PaymentMethod', {
        transaction_key: res.payload.data.order.transaction_key,
      });
    },
    handlePengantaran: () => {
      showBSheet({
        content: (
          <DeliveryLocationModalContent
            onPress={val => {
              setForm({...form, taking_location: val as any});
              methods.handlePengantaran();
            }}
          />
        ),
      });
    },
    handlePengambilan: () => {
      showBSheet({
        content: (
          <TakingLocationModalContent
            onPress={val => {
              setForm({...form, taking_location: val});
              methods.handlePengantaran();
            }}
          />
        ),
      });
    },
    handlePengembalian: () => {
      showBSheet({
        content: (
          <ReturnLocationModalContent
            onPress={val => {
              setForm({...form, return_location: val});
              methods.handlePengantaran();
            }}
          />
        ),
      });
    },
    handleDetailPayment: () => {
      showBSheet({
        content: <PaymentDetailModalContent />,
      });
    },
  };

  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingHorizontal: '5%'}}>
        <View style={{marginTop: 20}}>
          <Text style={[h1]}>{t('detail_order.formDetail.title')}</Text>
          <View style={styles.infoUserWrapper}>
            <Text style={[h1, {fontSize: 12}]}>{user.name}</Text>
            <Text style={[h3, {fontSize: 12, marginVertical: 5}]}>
              {user.phone}
            </Text>
            <Text style={[h3, {fontSize: 12}]}>{user.email}</Text>
          </View>
          <View style={styles.lineHorizontal} />
        </View>

        <View>
          <View style={[rowCenter, {justifyContent: 'space-between'}]}>
            <Text style={h1}>{t('detail_order.tripDetail.title')}</Text>
            <TouchableOpacity
              style={[rowCenter, {marginTop: 20, marginBottom: 20}]}
              onPress={() => setCheckInfo(prev => !prev)}>
              <Image
                source={checkInfo ? ic_blue_check : ic_uncheck}
                style={iconSize}
              />
              <Text style={[h5, {fontSize: 12}]}>
                {' '}
                {t('detail_order.tripDetail.pickAtGarage')}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={[h4, {marginTop: 10}]}>
            {checkInfo
              ? t('detail_order.tripDetail.deliveryLocationTaking')
              : t('detail_order.tripDetail.deliveryLocation')}
          </Text>
          <View style={[rowCenter, styles.borderBottom]}>
            <Image source={ic_pinpoin} style={iconSize} />
            <TouchableOpacity
              onPress={() => {
                if (checkInfo) {
                  methods.handlePengambilan();
                } else {
                  methods.handlePengantaran();
                }
              }}>
              <Text
                style={[
                  h5,
                  colorSelecting(form.taking_location?.name),
                  {marginLeft: 5},
                ]}>
                {form.taking_location?.name ||
                  (checkInfo
                    ? t(
                        'detail_order.tripDetail.deliveryLocationTakingPlaceholder',
                      )
                    : t('detail_order.tripDetail.deliveryLocationPlaceholder'))}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={[h4, {marginTop: 20}]}>
            {t('detail_order.tripDetail.returnLocation')}
          </Text>
          <TouchableOpacity
            style={[rowCenter, styles.borderBottom]}
            onPress={methods.handlePengembalian}>
            <Image source={ic_pinpoin} style={iconSize} />
            <Text
              style={[
                h5,
                colorSelecting(form.return_location?.name),
                {marginLeft: 5},
              ]}>
              {form.return_location?.name ||
                t('detail_order.tripDetail.returnLocationPlaceHolder')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{marginVertical: 20}}>
          <Text style={h1}>{t('detail_order.specialReq.title')}</Text>
          <View style={styles.formWrapper}>
            <TextInput
              multiline={true}
              placeholder={t('detail_order.specialReq.placeholder') as any}
              style={{
                height: 100,
                paddingRight: 15,
              }}
              maxLength={150}
              value={form.special_request}
              onChangeText={v => setForm({...form, special_request: v})}
            />
            <Image
              source={ic_pen}
              style={[
                iconCustomSize(15),
                {position: 'absolute', top: 10, right: 10},
              ]}
            />
          </View>
        </View>
        <View style={styles.lineHorizontal} />
      </ScrollView>

      <View
        style={[
          boxShadow('#000', {height: 1, width: 1}, 3.27, 0.24),
          styles.bottomView,
        ]}>
        <TouchableOpacity onPress={methods.handleDetailPayment}>
          <Text style={h1}>{t('detail_order.summary.totalPayment')}</Text>
          <View style={rowCenter}>
            <Text
              style={[
                h1,
                {color: theme.colors.navy, marginRight: 10, marginBottom: 12},
              ]}>
              {currencyFormat(
                summaryOrder.total_payment - (summaryOrder.discount_price || 0),
              )}
            </Text>
            <Image
              source={ic_arrow_down}
              style={[iconCustomSize(10), {marginBottom: 12}]}
            />
          </View>
          {summaryOrder.discount_price > 0 && (
            <Text style={[h5, styles.hargaCoret]}>
              {currencyFormat(summaryOrder.total_payment)}
            </Text>
          )}
        </TouchableOpacity>
        <Button
          _theme="navy"
          title={t('global.button.nextPayment')}
          onPress={methods.handleOrder}
        />
      </View>
    </View>
  );
};

export default hoc(OrderDetailScreen);

const styles = StyleSheet.create({
  infoUserWrapper: {
    backgroundColor: theme.colors.grey7,
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  lineHorizontal: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey6,
    marginTop: 10,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey5,
    paddingVertical: 10,
  },
  formWrapper: {
    borderWidth: 1,
    borderColor: theme.colors.grey6,
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  bottomView: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: -10,
    width: '100%',
    left: -16,
    padding: 16,
    marginHorizontal: '5%',
  },
  hargaCoret: {
    textDecorationLine: 'line-through',
    textDecorationColor: 'orange',
    color: theme.colors.grey4,
    marginTop: 6,
  },
});
