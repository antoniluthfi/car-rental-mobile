import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import hoc from 'components/hoc';
import {useNavigation} from '@react-navigation/native';
import appBar from 'components/AppBar/AppBar';
import {
  ic_arrow_down,
  ic_arrow_left_white,
  ic_blue_check,
  ic_glasses,
  ic_pen,
  ic_pinpoin,
  ic_pinpoin2,
  ic_uncheck,
} from 'assets/icons';
import {
  boxShadow,
  iconCustomSize,
  iconSize,
  rowCenter,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from 'utils/mixins';
import {h1, h2, h3, h4, h5} from 'utils/styles';
import DropdownFilter from 'components/DropdownFilter/DropdownFilter';
import {img_car_2} from 'assets/images';
import {theme} from 'utils';
import {FONT_SIZE_10, FONT_SIZE_12} from 'utils/typography';
import Carousel from 'react-native-reanimated-carousel';
import Button from 'components/Button';
import {showBSheet} from 'utils/BSheet';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {createOrder, getSummaryOrder} from 'redux/features/order/orderAPI';
import {appDataState} from 'redux/features/appData/appDataSlice';
import {IFormDaily, IGarages} from 'types/global.types';
import moment from 'moment';
import {IOrderSummary, IPayloadSummary} from 'types/order';
import {vehiclesState} from 'redux/features/vehicles/vehiclesSlice';
import {currencyFormat} from 'utils/currencyFormat';
import {orderState} from 'redux/features/order/orderSlice';
import DropdownLocation from 'components/DropdownLocation/DropdwonLocation';
import {getGarages, getPayments} from 'redux/features/appData/appDataAPI';

const OrderDetailScreen: FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(appDataState).userProfile;

  const formDaily = useAppSelector(appDataState).formDaily;
  const vehicles = useAppSelector(vehiclesState);
  const summaryOrder = useAppSelector(orderState).summaryOrder;
  const garages = useAppSelector(appDataState).garages;

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
              Detail Pesanan
            </Text>
          </TouchableOpacity>
        ),
      }),
    );

    dispatch(getGarages());
    dispatch(getPayments());
  }, [navigation]);

  useEffect(() => {
    const payload: IPayloadSummary = {
      order_type_id: 1,
      end_booking_date: moment(formDaily.end_trip).format('YYYY-MM-DD'),
      end_booking_time: formDaily.end_booking_time,
      start_booking_date: moment(formDaily.start_trip).format('YYYY-MM-DD'),
      start_booking_time: formDaily.start_booking_time,
      vehicle_id: formDaily.vehicle_id,
    };
    console.log(payload);
    let params: string = '?';

    Object.keys(payload).map(x => {
      params += `${x}=${payload[x as keyof IPayloadSummary]}&`;
    });
    console.log(params);
    dispatch(getSummaryOrder(params));
  }, []);

  const methods = {
    handleOrder: async () => {
      let res = await dispatch(createOrder({
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
          special_request: form.special_request
        },
        order_type_id: 1,
        phone_number: user.phone,
        rental_delivery_fee: summaryOrder.rental_delivery_fee,
        service_fee: summaryOrder.service_fee,
        total_payment: summaryOrder.total_payment,
        user_name: user.name,
        wa_number: user.wa_number
      }));
      console.log('respon order = ', res);
      if(res.type.includes('rejected')) {
        return; 
      }
      navigation.navigate('PaymentMethod');
      
    },
    handlePengantaran: () => {
      showBSheet({
        content: (
          <View style={{flex: 1, alignItems: 'flex-start', width: '95%'}}>
            <Text style={[h1]}>Lokasi Pengantaran</Text>
            <View style={[rowCenter, styles.searchWrapper]}>
              <TextInput
                style={{width: '95%'}}
                placeholder="Cari berdasarkan Alamat"
              />
              <Image source={ic_glasses} style={iconSize} />
            </View>
            <Text style={[h1, {marginTop: 20}]}>Rekomendasi Tempat</Text>
            <View style={{width: '100%', flex: 1}}>
              <BottomSheetScrollView>
                {garages?.map((x, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[rowCenter, styles.borderBottom]}
                    onPress={() => {
                      setForm({...form, taking_location: x});
                      methods.handlePengantaran();
                    }}>
                    <Image source={ic_pinpoin} style={iconSize} />
                    <View>
                      <Text style={[h1, {marginLeft: 5}]}>{x.name}</Text>
                      <Text style={[h5, {marginLeft: 5}]}>
                        {x.address_details}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </BottomSheetScrollView>
            </View>
          </View>
        ),
      });
    },
    handlePengembalian: () => {
      showBSheet({
        content: (
          <View style={{flex: 1, alignItems: 'flex-start', width: '95%'}}>
            <Text style={[h1]}>Lokasi Pengembalian</Text>
            <View style={[rowCenter, styles.searchWrapper]}>
              <TextInput
                style={{width: '95%'}}
                placeholder="Cari berdasarkan Alamat"
              />
              <Image source={ic_glasses} style={iconSize} />
            </View>
            <View style={[rowCenter, {marginTop: 20}]}>
              <Image source={ic_pinpoin2} style={iconSize} />
              <Text style={[h4]}> Kembalikan ditempat yang sama</Text>
            </View>
            <Text style={[h1, {marginTop: 20}]}>Rekomendasi Tempat</Text>
            <View style={{width: '100%', flex: 1}}>
              <BottomSheetScrollView>
                {garages?.map((x, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[rowCenter, styles.borderBottom]}
                    onPress={() => {
                      setForm({...form, return_location: x});
                      methods.handlePengantaran();
                    }}>
                    <Image source={ic_pinpoin} style={iconSize} />
                    <View>
                      <Text style={[h1, {marginLeft: 5}]}>{x.name}</Text>
                      <Text style={[h5, {marginLeft: 5}]}>
                        {x.address_details}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </BottomSheetScrollView>
            </View>
          </View>
        ),
      });
    },
    handleDetailPayment: () => {
      showBSheet({
        content: (
          <View style={{flex: 1, alignItems: 'flex-start', width: '95%'}}>
            <Text style={[h1, {fontSize: 20}]}>Detail Pembayaran</Text>

            <View
              style={[
                rowCenter,
                {justifyContent: 'space-between', width: '100%', marginTop: 20},
              ]}>
              <Text style={h1}>
                {
                  vehicles.vehicles?.find(x => x.id === formDaily.vehicle_id)
                    ?.name
                }
              </Text>
              <Text style={h4}>{formDaily.passanger} Penumpang</Text>
            </View>

            <View
              style={[
                rowCenter,
                {justifyContent: 'space-between', width: '100%', marginTop: 15},
              ]}>
              <Text style={h4}>Tanggal Mulai Sewa</Text>
              <Text style={h4}>
                {moment(formDaily.start_booking_date).format('DD MMMM YYYY')}
              </Text>
            </View>

            <View
              style={[
                rowCenter,
                {justifyContent: 'space-between', width: '100%', marginTop: 15},
              ]}>
              <Text style={h4}>Jam Mulai</Text>
              <Text style={h4}>{formDaily.start_booking_time}</Text>
            </View>

            <View
              style={[
                rowCenter,
                {justifyContent: 'space-between', width: '100%', marginTop: 20},
              ]}>
              <Text style={h4}>Tanggal Selesai</Text>
              <Text style={h4}>
                {moment(formDaily.end_booking_date).format('DD MMMM YYYY')}
              </Text>
            </View>

            <View
              style={[
                rowCenter,
                {justifyContent: 'space-between', width: '100%', marginTop: 15},
              ]}>
              <Text style={h4}>Jam Selesai</Text>
              <Text style={h4}>{formDaily.end_booking_time}</Text>
            </View>
            <View style={[styles.lineHorizontal, {width: '100%'}]} />

            <Text style={[h1, {marginTop: 20}]}>Biaya Sewa</Text>
            <View
              style={[
                rowCenter,
                {justifyContent: 'space-between', width: '100%', marginTop: 15},
              ]}>
              <Text style={h4}>Harga</Text>
              <Text style={h4}>
                IDR {currencyFormat(summaryOrder.rental_delivery_fee)} / 3 Hari
              </Text>
            </View>
            <View style={[styles.lineHorizontal, {width: '100%'}]} />

            <Text style={[h1, {marginTop: 20}]}>Biaya Lainnya</Text>
            <View
              style={[
                rowCenter,
                {justifyContent: 'space-between', width: '100%', marginTop: 15},
              ]}>
              <Text style={h4}>Biaya Layanan</Text>
              <Text style={h4}>{currencyFormat(summaryOrder.service_fee)}</Text>
            </View>
            <View
              style={[
                rowCenter,
                {justifyContent: 'space-between', width: '100%', marginTop: 15},
              ]}>
              <Text style={h4}>Biaya Asuransi</Text>
              <Text style={h4}>
                {currencyFormat(summaryOrder.insurance_fee)}
              </Text>
            </View>
            <View style={[styles.lineHorizontal, {width: '100%'}]} />

            <View
              style={[
                rowCenter,
                {justifyContent: 'space-between', width: '100%', marginTop: 15},
              ]}>
              <Text style={[h1, {color: theme.colors.navy}]}>
                Total Pembayaran
              </Text>
              <Text style={h1}>
                {currencyFormat(summaryOrder.total_payment)}
              </Text>
            </View>
          </View>
        ),
      });
    },
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          margin: 16,
        }}>
        <ScrollView>
          <View style={{marginTop: 20}}>
            <Text style={[h1]}>Ketentuan Mobil</Text>
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
              <Text style={h1}>Detail Perjalanan</Text>
              <TouchableOpacity
                style={[rowCenter, {marginTop: 20, marginBottom: 20}]}
                onPress={() => setCheckInfo(prev => !prev)}>
                <Image
                  source={checkInfo ? ic_blue_check : ic_uncheck}
                  style={iconSize}
                />
                <Text style={[h5, {fontSize: 12}]}>
                  {' '}
                  Mengambil Ke Tempat Sewa
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={[h4, {marginTop: 10}]}>Lokasi Pengantaran</Text>
            <TouchableOpacity
              style={[rowCenter, styles.borderBottom]}
              onPress={methods.handlePengantaran}>
              <Image source={ic_pinpoin} style={iconSize} />
              <Text style={[h5, {marginLeft: 5}]}>
                {form.taking_location?.name || 'Pilih Lokasi Anda'}
              </Text>
            </TouchableOpacity>

            <Text style={[h4, {marginTop: 20}]}>Lokasi Pengembalian</Text>
            <TouchableOpacity
              style={[rowCenter, styles.borderBottom]}
              onPress={methods.handlePengembalian}>
              <Image source={ic_pinpoin} style={iconSize} />
              <Text style={[h5, {marginLeft: 5}]}>
                {form.return_location?.name || 'Pilih Lokasi Anda'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{marginVertical: 20}}>
            <Text style={h1}>Form Permintaan Khusus</Text>
            <View style={styles.formWrapper}>
              <TextInput
                multiline={true}
                placeholder="Tulis yang kamu butuhkan untuk kebutuhan perjalanan mu, contoh (Kursi Bayi, Kursi Roda, etc.)"
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
      </View>
      <View
        style={[
          boxShadow('#000', {height: 1, width: 1}, 3.27, 0.24),
          styles.bottomView,
        ]}>
        <TouchableOpacity onPress={methods.handleDetailPayment}>
          <Text style={h1}>Total Pembayaran</Text>
          <View style={rowCenter}>
            <Text
              style={[
                h1,
                {color: theme.colors.navy, marginRight: 10, marginBottom: 12},
              ]}>
              {currencyFormat(summaryOrder.total_payment)}
            </Text>
            <Image
              source={ic_arrow_down}
              style={[iconCustomSize(10), {marginBottom: 12}]}
            />
          </View>
        </TouchableOpacity>
        <Button
          _theme="navy"
          title="Lanjutkan Pembayaran"
          onPress={methods.handleOrder}
        />
      </View>
    </>
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
  searchWrapper: {
    width: '100%',
    backgroundColor: theme.colors.grey7,
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
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
    bottom: -40,
    width: '100%',
    padding: 16,
    paddingBottom: 25,
  },
});
