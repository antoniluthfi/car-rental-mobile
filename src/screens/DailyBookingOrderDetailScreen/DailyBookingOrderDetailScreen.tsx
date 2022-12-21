import React, {useEffect, useState} from 'react';
import hoc from 'components/hoc';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import appBar from 'components/AppBar/AppBar';
import {iconCustomSize, iconSize, rowCenter, WINDOW_WIDTH} from 'utils/mixins';
import {
  ic_arrow_left_white,
  ic_confirmation,
  ic_download,
  ic_pinpoin,
} from 'assets/icons';
import {h1, h4, h5} from 'utils/styles';
import CustomCarousel from 'components/CustomCarousel/CustomCarousel';
import {img_car_2} from 'assets/images';
import {RootStackParamList} from 'types/navigator';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {getOrderById} from 'redux/features/myBooking/myBookingAPI';
import {URL_IMAGE} from '@env';
import {idrFormatter} from 'utils/functions';
import moment from 'moment';
import Button from 'components/Button';
import {theme} from 'utils';
import {showBSheet} from 'utils/BSheet';
import CustomTextInput from 'components/TextInput';
import DropdownBank from 'components/UploadBankTransferComponent/DropdownBank/DropdwonBank';
import {IPayments} from 'types/global.types';

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

  const [images, setImages] = useState<any[]>([]);
  const [orderState, setOrderState] = useState<string>('');
  const [formCancel, setFormCancel] = useState({

  });

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

      return selected?.disbursement?.payment?.code;
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
              Detail Pesanan
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
    setOrderState(selected?.order_status);

    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    const future = moment(selected?.expired_time).format('YYYY-MM-DD HH:mm:ss');

    if (
      selected?.order_status?.toLowerCase() == 'pending' &&
      moment(now).isAfter(future)
    ) {
      setOrderState('FAILED');
    }
  }, [selected?.order_status, selected?.expired_time]);

  const methods = {
    handleConfirmation: (
      status: 'enxtend_order' | 'cancel_order' | 'close',
    ) => {
      showBSheet({
        content: (
          <View style={styles.bsheetWrapper}>
            <Image
              source={ic_confirmation}
              style={iconCustomSize(200)}
              resizeMode={'contain'}
            />
            <Text>
              Apakah anda yakin melanjutkan{' '}
              {status === 'enxtend_order'
                ? 'Pembayaran ini?'
                : 'membatalkan pesanan ini?'}
            </Text>
            <View style={{width: '95%', margin: 16}}>
              <Button
                _theme="navy"
                title="Iya, Lanjutkan"
                onPress={() => {
                  methods.handleConfirmation('close');
                  if (status === 'enxtend_order') {
                    methods.handleExtendOrder();
                    return;
                  }
                  methods.handleCancelOrder();
                }}
                styleWrapper={{marginBottom: 20}}
              />
              <Button
                _theme="white"
                title="Kembali"
                onPress={() => methods.handleConfirmation('close')}
              />
            </View>
          </View>
        ),
      });
    },
    handleExtendOrder: () => {
      showBSheet({
        content: <View style={styles.bsheetWrapper}></View>,
      });
    },
    handleCancelOrder: () => {
      showBSheet({
        content: (
          <View
            style={[
              styles.bsheetWrapper,
              {alignItems: 'flex-start', paddingLeft: 16, width: '100%'},
            ]}>
            <Text style={h1}>Pembatalan Pesanan</Text>
            <View style={{marginTop: 20}} />
            <CustomTextInput
              title="Nama"
              placeholder="Masukkan Nama Anda"
              errorMessage=""
              onChangeText={() => {}}
              value={''}
              styleTitle={{
                fontSize: 12,
              }}
            />
            <View style={{marginTop: 15}} />
            <DropdownBank
              styleDropdown={{
                width: '95%',
                marginTop: 10,
              }}
              onSelect={(v: IPayments) => {
                // setForm({...form, sender_bank_name: v.code});
                // setFormError({...formError, sender_bank_name: ''});
              }}
              // selected={form.sender_bank_name}
              // errorMessage={formError.sender_bank_name}
            />
            <View style={{marginTop: 15}} />
            <CustomTextInput
              title="Nomor Rekening"
              placeholder="Masukan Nomor Rekening"
              errorMessage=""
              onChangeText={() => {}}
              value={''}
              styleTitle={{
                fontSize: 12,
              }}
            />
            {/* <View style={{marginTop: 20}} /> */}
            <View style={{marginVertical: 20, width: '95%'}}>
              <Text style={h4}>Tulis alasan pembatalan</Text>
              <View style={styles.formWrapper}>
                <TextInput
                  multiline={true}
                  placeholder="Tulis Keterangan"
                  style={{
                    height: 100,
                    paddingRight: 15,
                  }}
                  maxLength={150}
                  // value={form.special_request}
                  // onChangeText={v => setForm({...form, special_request: v})}
                />
              </View>
            </View>

            <View
              style={[
                {
                  position: 'absolute',
                  bottom: 0,
                  left: 16,
                  right: 0,
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                },
                // rowCenter,
              ]}
              >
              <Button _theme="white" title="Kembali" onPress={() => {}} styleWrapper={{width: '48%'}} />

              <Button _theme="navy" title="Iya, Lanjutkan" onPress={() => {}} styleWrapper={{width: '48%'}} />
            </View>
          </View>
        ),
      });
    },
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomCarousel
        data={images}
        carouselTitle={
          vehicle?.brand_name
            ? `${vehicle?.brand_name}${
                vehicle?.name ? ` ${vehicle?.name}` : ''
              }`
            : undefined
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
          <Text style={styles.text}>No. Order</Text>
          <Text style={styles.boldText}>{selected?.id}</Text>
        </View>

        <View style={{flexBasis: '50%'}}>
          <Text style={styles.text}>Metode Pembayaran</Text>
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
            <Text style={styles.text}>Mobil</Text>
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
          <Text style={styles.text}>Jumlah Penumpang</Text>
          <Text style={styles.boldText}>{vehicle?.max_passanger || '-'}</Text>
        </View>
      </View>
      <View style={styles.dashedLine} />

      <View style={styles.descriptionContainer}>
        <View style={{flexBasis: '50%'}}>
          <Text style={styles.text}>Total Pembayaran</Text>
          <Text style={styles.boldText}>
            {idrFormatter(selected?.total_payment)}
          </Text>
        </View>

        <View style={{flexBasis: '50%'}}>
          <Text style={styles.text}>Status Pembayaran</Text>
          <Text style={styles.boldText}>{orderState}</Text>
        </View>
      </View>
      <View style={styles.solidLine} />

      <View style={{padding: '5%'}}>
        <Text style={styles.text}>
          {selected?.order_detail?.is_take_from_rental_office
            ? 'Lokasi Pickup'
            : 'Lokasi Pengantaran'}
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
        <Text style={styles.text}>Lokasi Pengembalian</Text>
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
      <View style={styles.solidLine} />
      <View style={{marginHorizontal: 16}}>
        <Button
          _theme="white"
          title="Batalkan Pesanan"
          onPress={() => {
            methods.handleConfirmation('cancel_order');
          }}
          styleWrapper={{
            marginBottom: 10,
          }}
          lineColor={theme.colors.navy}
        />
        <Button
          _theme="navy"
          title="Perpanjang Pesanan"
          onPress={() => methods.handleConfirmation('enxtend_order')}
        />
      </View>
    </ScrollView>
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
  bsheetWrapper: {
    width: WINDOW_WIDTH,
    flex: 1,
    alignItems: 'center',
    margin: 16,
  },
  formWrapper: {
    borderWidth: 1,
    borderColor: theme.colors.grey6,
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
});
