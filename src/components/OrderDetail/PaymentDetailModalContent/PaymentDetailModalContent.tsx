import moment from 'moment';
import {appDataState} from 'redux/features/appData/appDataSlice';
import {currencyFormat} from 'utils/currencyFormat';
import {differenceInCalendarDays, parse} from 'date-fns';
import {h1, h4} from 'utils/styles';
import {orderState} from 'redux/features/order/orderSlice';
import {rowCenter} from 'utils/mixins';
import {StyleSheet, Text, View} from 'react-native';
import {theme} from 'utils';
import {useAppSelector} from 'redux/hooks';
import {vehiclesState} from 'redux/features/vehicles/vehiclesSlice';
import {useTranslation} from 'react-i18next';

const PaymentDetailModalContent: React.FC = () => {
  const {t} = useTranslation();

  const formDaily = useAppSelector(appDataState).formDaily;
  const vehicles = useAppSelector(vehiclesState);
  const summaryOrder = useAppSelector(orderState).summaryOrder;

  const parsedStartDate = parse(
    formDaily?.start_booking_date,
    'yyyy-MM-dd',
    new Date(),
  );
  const parsedEndDate = parse(
    formDaily?.end_booking_date,
    'yyyy-MM-dd',
    new Date(),
  );

  const dayDifference = differenceInCalendarDays(
    parsedEndDate,
    parsedStartDate,
  );
  console.log('formDaily = ', formDaily);

  return (
    <View style={styles.container}>
      <Text style={[h1, {fontSize: 20}]}>
        {t('detail_order.summary.title')}
      </Text>

      <View
        style={[
          rowCenter,
          {justifyContent: 'space-between', width: '100%', marginTop: 20},
        ]}>
        <Text style={h1}>
          {vehicles.vehicles?.find(x => x.id === formDaily.vehicle_id)?.name}
        </Text>
        <Text style={h4}>
          {formDaily.passanger} {t('detail_order.summary.passanger')}
        </Text>
      </View>

      <View
        style={[
          rowCenter,
          {justifyContent: 'space-between', width: '100%', marginTop: 15},
        ]}>
        <Text style={h4}>{t('detail_order.summary.startDate')}</Text>
        <Text style={h4}>
          {moment(formDaily.start_booking_date).format('DD MMMM YYYY')}
        </Text>
      </View>

      <View
        style={[
          rowCenter,
          {justifyContent: 'space-between', width: '100%', marginTop: 15},
        ]}>
        <Text style={h4}>{t('detail_order.summary.startTime')}</Text>
        <Text style={h4}>{formDaily.start_booking_time}</Text>
      </View>

      <View
        style={[
          rowCenter,
          {justifyContent: 'space-between', width: '100%', marginTop: 20},
        ]}>
        <Text style={h4}>{t('detail_order.summary.endDate')}</Text>
        <Text style={h4}>
          {moment(formDaily.end_booking_date).format('DD MMMM YYYY')}
        </Text>
      </View>

      <View
        style={[
          rowCenter,
          {justifyContent: 'space-between', width: '100%', marginTop: 15},
        ]}>
        <Text style={h4}>{t('detail_order.summary.endTime')}</Text>
        <Text style={h4}>{formDaily.end_booking_time}</Text>
      </View>
      <View style={[styles.lineHorizontal, {width: '100%'}]} />

      <Text style={[h1, {marginTop: 20}]}>
        {t('detail_order.summary.rentalFee')}
      </Text>
      <View
        style={[
          rowCenter,
          {justifyContent: 'space-between', width: '100%', marginTop: 15},
        ]}>
        <Text style={h4}>{t('detail_order.summary.price')}</Text>
        <Text style={h4}>
          {currencyFormat(summaryOrder.booking_price)} / {dayDifference}{' '}
          {t('detail_order.summary.day')}
        </Text>
      </View>
      <View style={[styles.lineHorizontal, {width: '100%'}]} />

      <Text style={[h1, {marginTop: 20}]}>
        {t('detail_order.summary.otherFee')}
      </Text>
      <View
        style={[
          rowCenter,
          {justifyContent: 'space-between', width: '100%', marginTop: 15},
        ]}>
        <Text style={h4}>{t('detail_order.summary.serviceFee')}</Text>
        <Text style={h4}>{currencyFormat(summaryOrder.service_fee)}</Text>
      </View>
      <View
        style={[
          rowCenter,
          {justifyContent: 'space-between', width: '100%', marginTop: 15},
        ]}>
        <Text style={h4}>{t('detail_order.summary.insuranceFee')}</Text>
        <Text style={h4}>{currencyFormat(summaryOrder.insurance_fee)}</Text>
      </View>
      <View style={[styles.lineHorizontal, {width: '100%'}]} />

      <View
        style={[
          rowCenter,
          {justifyContent: 'space-between', width: '100%', marginTop: 15},
        ]}>
        <Text style={[h1, {color: theme.colors.navy}]}>
          {t('detail_order.summary.totalPayment')}
        </Text>
        <Text style={h1}>{currencyFormat(summaryOrder.total_payment)}</Text>
      </View>
    </View>
  );
};

export default PaymentDetailModalContent;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'flex-start', width: '95%'},
  lineHorizontal: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey6,
    marginTop: 10,
  },
});
