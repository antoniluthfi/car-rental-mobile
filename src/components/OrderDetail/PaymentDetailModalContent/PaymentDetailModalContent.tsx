import moment from 'moment';
import useLangSelector from 'utils/useLangSelector';
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

const PaymentDetailModalContent: React.FC = () => {
  const t = useLangSelector().detail_order;

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

  return (
    <View style={styles.container}>
      <Text style={[h1, {fontSize: 20}]}>{t.summary.title}</Text>

      <View
        style={[
          rowCenter,
          {justifyContent: 'space-between', width: '100%', marginTop: 20},
        ]}>
        <Text style={h1}>
          {vehicles.vehicles?.find(x => x.id === formDaily.vehicle_id)?.name}
        </Text>
        <Text style={h4}>
          {formDaily.passanger} {t.summary.passanger}
        </Text>
      </View>

      <View
        style={[
          rowCenter,
          {justifyContent: 'space-between', width: '100%', marginTop: 15},
        ]}>
        <Text style={h4}>{t.summary.startDate}</Text>
        <Text style={h4}>
          {moment(formDaily.start_booking_date).format('DD MMMM YYYY')}
        </Text>
      </View>

      <View
        style={[
          rowCenter,
          {justifyContent: 'space-between', width: '100%', marginTop: 15},
        ]}>
        <Text style={h4}>{t.summary.startTime}</Text>
        <Text style={h4}>{formDaily.start_booking_time}</Text>
      </View>

      <View
        style={[
          rowCenter,
          {justifyContent: 'space-between', width: '100%', marginTop: 20},
        ]}>
        <Text style={h4}>{t.summary.endDate}</Text>
        <Text style={h4}>
          {moment(formDaily.end_booking_date).format('DD MMMM YYYY')}
        </Text>
      </View>

      <View
        style={[
          rowCenter,
          {justifyContent: 'space-between', width: '100%', marginTop: 15},
        ]}>
        <Text style={h4}>{t.summary.endTime}</Text>
        <Text style={h4}>{formDaily.end_booking_time}</Text>
      </View>
      <View style={[styles.lineHorizontal, {width: '100%'}]} />

      <Text style={[h1, {marginTop: 20}]}>{t.summary.rentalFee}</Text>
      <View
        style={[
          rowCenter,
          {justifyContent: 'space-between', width: '100%', marginTop: 15},
        ]}>
        <Text style={h4}>{t.summary.price}</Text>
        <Text style={h4}>
          {currencyFormat(summaryOrder.booking_price)} / {dayDifference}{' '}
          {t.summary.day}
        </Text>
      </View>
      <View style={[styles.lineHorizontal, {width: '100%'}]} />

      <Text style={[h1, {marginTop: 20}]}>{t.summary.otherFee}</Text>
      <View
        style={[
          rowCenter,
          {justifyContent: 'space-between', width: '100%', marginTop: 15},
        ]}>
        <Text style={h4}>{t.summary.serviceFee}</Text>
        <Text style={h4}>{currencyFormat(summaryOrder.service_fee)}</Text>
      </View>
      <View
        style={[
          rowCenter,
          {justifyContent: 'space-between', width: '100%', marginTop: 15},
        ]}>
        <Text style={h4}>{t.summary.insuranceFee}</Text>
        <Text style={h4}>{currencyFormat(summaryOrder.insurance_fee)}</Text>
      </View>
      <View style={[styles.lineHorizontal, {width: '100%'}]} />

      <View
        style={[
          rowCenter,
          {justifyContent: 'space-between', width: '100%', marginTop: 15},
        ]}>
        <Text style={[h1, {color: theme.colors.navy}]}>
          {t.summary.totalPayment}
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
