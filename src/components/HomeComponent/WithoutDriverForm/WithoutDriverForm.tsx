import Button from 'components/Button';
import DatePickerComponent from 'components/DatePicker/DatePicker';
import DropdownLocation from 'components/DropdownLocation/DropdwonLocation';
import moment from 'moment';
import useLangSelector from 'utils/useLangSelector';
import {appDataState, saveFormDaily} from 'redux/features/appData/appDataSlice';
import {getAllCities} from 'redux/features/appData/appDataAPI';
import {h1, h2, h4, h5} from 'utils/styles';
import {ICities, IPayments} from 'types/global.types';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {theme} from 'utils';
import {toggleBSheet} from 'redux/features/utils/utilsSlice';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import ReactNativeModernDatepicker, {
  getToday,
} from 'react-native-modern-datepicker';
import {iconSize, rowCenter, WINDOW_HEIGHT, WINDOW_WIDTH} from 'utils/mixins';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetScrollView,
  SCREEN_HEIGHT,
} from '@gorhom/bottom-sheet';
import CustomTextInput from 'components/TextInput';
import DropdownBank from 'components/UploadBankTransferComponent/DropdownBank/DropdwonBank';
import {cancelOrder} from 'redux/features/order/orderAPI';
import {showToast} from 'utils/Toast';
import {ic_calendar, ic_clock} from 'assets/icons';
// import ScrollPicker from 'react-native-wheel-scrollview-picker';
// import ScrollPicker from 'react-native-wheel-scroll-picker';
import TimeWheel from '../TimeWheel/TimeWheel';
// import ScrollWheel from 'components/ScrollWheel/ScrollSheel';

type IForm = {
  location: ICities;
  tanggal_sewa: string;
  tanggal_pengembalian: string;
  jam_sewa: string;
  jam_pengembalian: string;
};

type IFormError = {
  error_location: string;
  error_tanggal_sewa: string;
  error_tanggal_pengembalian: string;
  error_jam_sewa: string;
  error_jam_pengembalian: string;
};

const WithoutDriverForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const appData = useAppSelector(appDataState);
  const lang = useLangSelector();

  const [form, setForm] = useState<IForm>({
    location: {id: 0, name: ''},
    tanggal_sewa: '',
    tanggal_pengembalian: '',
    jam_sewa: '',
    jam_pengembalian: '',
  });
  const [jamSewa, setJamSewa] = useState([]);
  const [showWheel, setShowWheel] = useState(false);
  const [marginBottom, setMarginBottom] = useState(0);
  const [marginBottom2, setMarginBottom2] = useState(0);

  const [formError, setFormError] = useState<IFormError>({
    error_location: '',
    error_tanggal_sewa: '',
    error_tanggal_pengembalian: '',
    error_jam_sewa: '',
    error_jam_pengembalian: '',
  });

  useEffect(() => {
    dispatch(getAllCities());
  }, []);

  const sheetRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['70%', '70%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const methods = {
    handleSearch: () => {
      const _errorMessage: any = {};
      let status = true;
      if (!form.location.name) {
        _errorMessage['error_location'] = lang.Home.daily.error_location;
        status = false;
      }
      if (!form.tanggal_sewa) {
        _errorMessage['error_tanggal_sewa'] = lang.Home.daily.error_rent_date;
        status = false;
      }
      if (!form.tanggal_pengembalian) {
        _errorMessage['error_tanggal_pengembalian'] =
          lang.Home.daily.error_rent_date;
        status = false;
      }
      if (!form.jam_sewa) {
        _errorMessage['error_jam_sewa'] = lang.Home.daily.error_rent_time;
        status = false;
      }
      setFormError({..._errorMessage});

      if (parseInt(form.jam_sewa.slice(0, form.jam_sewa.length / 2)) < 7) {
        return;
      }

      if (!status) return;

      dispatch(
        saveFormDaily({
          limit: 10,
          location: form?.location?.name,
          start_booking_date: `${moment(form?.tanggal_sewa, 'YYYY/MM/DD')
            .format('YYYY-MM-DD')
            .toString()}`,
          end_booking_date: `${moment(form?.tanggal_pengembalian, 'YYYY/MM/DD')
            .format('YYYY-MM-DD')
            .toString()}`,
          start_trip: `${form?.tanggal_sewa?.replace(/\//g, '-')} ${
            form.jam_sewa.slice(0, form.jam_sewa.length / 2) +
            ':' +
            form.jam_sewa.slice(-form.jam_sewa.length / 2)
          }`,
          end_trip: `${form?.tanggal_pengembalian?.replace(/\//g, '-')} ${
            form.jam_sewa.slice(0, form.jam_sewa.length / 2) +
            ':' +
            form.jam_sewa.slice(-form.jam_sewa.length / 2)
          }`,
          passanger: 4,
          price_sort: 'asc',
          page: 1,
          start_booking_time: `${
            form.jam_sewa.slice(0, form.jam_sewa.length / 2) +
            ':' +
            form.jam_sewa.slice(-form.jam_sewa.length / 2)
          }`,
          end_booking_time: `${
            form.jam_sewa.slice(0, form.jam_sewa.length / 2) +
            ':' +
            form.jam_sewa.slice(-form.jam_sewa.length / 2)
          }`,
        }),
      );
      navigation.navigate('ListCar');
    },
    calculateDateDifference: () => {
      if (form.tanggal_sewa && form.tanggal_pengembalian) {
        const tglSewa = moment(form.tanggal_sewa.replace(/\//g, '-'));
        const tglPengembalian = moment(
          form.tanggal_pengembalian.replace(/\//g, '-'),
        );
        const res = tglPengembalian.diff(tglSewa, 'days');

        return `${res} ${res > 1 ? lang.Home.daily.days : lang.Home.daily.day}`;
      }

      return '';
    },
  };

  return (
    <View>
      <DropdownLocation
        searchHistory={appData?.searchHistory || undefined}
        data={appData?.cities || []}
        onSelect={(v: ICities) => {
          setForm({...form, location: v});
          setFormError({...formError, error_location: ''});
        }}
        selected={form.location}
        errorMessage={formError.error_location}
      />
      <View
        style={[
          {
            justifyContent: 'space-between',
            marginTop: 30,
            flexDirection: 'row',
          },
        ]}>
        <DatePickerComponent
          mode="date"
          placeholder={lang.Home.daily.select_date}
          title={lang.Home.daily.rent_start_date}
          containerStyle={{
            width: '49%',
          }}
          value={form.tanggal_sewa ?? ''}
          snapPoint={['75%', '75%']}
          content={
            <View>
              <Text style={[h1, {marginLeft: 16, fontSize: 18}]}>
                {lang.Home.daily.rent_start_date}
              </Text>
              <ReactNativeModernDatepicker
                style={{
                  width: WINDOW_WIDTH,
                  height: WINDOW_HEIGHT,
                }}
                minimumDate={getToday()}
                onDateChange={v => {
                  setTimeout(() => {
                    dispatch(
                      toggleBSheet({
                        content: <View />,
                        show: false,
                      }),
                    );
                  }, 200);
                  setForm({...form, tanggal_sewa: v});
                  setFormError({...formError, error_tanggal_sewa: ''});
                }}
                mode={'calendar'}
              />
            </View>
          }
          errorMessage={formError.error_tanggal_sewa}
        />

        <DatePickerComponent
          mode="date"
          placeholder={lang.Home.daily.select_date}
          title={lang.Home.daily.rent_end_date}
          containerStyle={{
            width: '49%',
          }}
          value={form.tanggal_pengembalian ?? ''}
          snapPoint={['75%', '75%']}
          content={
            <View>
              <Text style={[h1, {marginLeft: 16, fontSize: 18}]}>
                {lang.Home.daily.rent_end_date}
              </Text>
              <ReactNativeModernDatepicker
                style={{
                  width: WINDOW_WIDTH,
                  height: WINDOW_HEIGHT,
                }}
                minimumDate={
                  Platform.OS === 'android'
                    ? form.tanggal_sewa
                    : moment(form.tanggal_sewa).format('YYYY-MM-DD')
                }
                onDateChange={v => {
                  setTimeout(() => {
                    dispatch(
                      toggleBSheet({
                        show: false,
                      }),
                    );
                  }, 200);
                  setForm({...form, tanggal_pengembalian: v});
                  setFormError({...formError, error_tanggal_pengembalian: ''});
                }}
                mode={'calendar'}
              />
            </View>
          }
          errorMessage={formError.error_tanggal_pengembalian}
        />

        {/* Date Diff */}
        {form.tanggal_sewa && form.tanggal_pengembalian && (
          <View style={styles.dateDiffContainer}>
            <Text style={[h5, styles.dateDiff]}>
              {methods.calculateDateDifference()}
            </Text>
          </View>
        )}
      </View>

      <View
        style={[
          {
            justifyContent: 'space-between',
            marginTop: 30,
            flexDirection: 'row',
          },
        ]}>
        <View style={{width: '48%'}}>
          <Text style={h1}>{lang.Home.daily.rent_start_time}</Text>

          <TouchableOpacity
            onPress={() => {
              setShowWheel(true);
            }}
            style={[rowCenter, styles.wrapper]}>
            <Image source={ic_clock} style={iconSize} />

            <View>
              <Text style={[h2, {marginLeft: 10}]}>
                {`${
                  form.jam_sewa.slice(0, form.jam_sewa.length / 2) +
                  ':' +
                  form.jam_sewa.slice(-form.jam_sewa.length / 2)
                }` || 'Pilih Jam'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{width: '48%'}}>
          <Text style={h1}>{lang.Home.daily.rent_end_time}</Text>

          <View
            style={[rowCenter, styles.wrapper]}>
            <Image source={ic_clock} style={iconSize} />

            <View>
              <Text style={[h2, {marginLeft: 10}]}>
                {`${
                  form.jam_sewa.slice(0, form.jam_sewa.length / 2) +
                  ':' +
                  form.jam_sewa.slice(-form.jam_sewa.length / 2)
                }` || 'Pilih Jam'}
              </Text>
            </View>
          </View>
        </View>

        {/* <DatePickerComponent
          mode="clock"
          placeholder={lang.Home.daily.rent_end_time}
          title={lang.Home.daily.rent_end_time}
          containerStyle={{
            width: '49%',
          }}
          value={form.jam_sewa}
          disableTime
          errorMessage={formError.error_jam_sewa}
        /> */}
      </View>

      <Button
        _theme="navy"
        title={lang.Home.daily.btn_search}
        onPress={methods.handleSearch}
        styleWrapper={{
          marginTop: 40,
        }}
      />
      <TimeWheel
        form={form}
        setForm={setForm}
        showWheel={showWheel}
        setShowWheel={setShowWheel}
      />

      {/* <BottomSheetModal
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        backgroundStyle={{backgroundColor: theme.colors.white}}
        handleStyle={{marginBottom: 8, marginTop: 4}}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.75,
          shadowRadius: 24,

          elevation: 24,
        }}>
        <View style={{flex: 1, backgroundColor: '#fff', padding: 16}}>
          <Text style={[h1, {fontSize: 20}]}>Jam Mulai Sewa</Text>
          <View
            style={{
              borderBottomColor: theme.colors.grey5,
              borderBottomWidth: 1,
              marginVertical: 30,
            }}
          />

          <Text style={[h4, {textAlign: 'center'}]}>
            Waktu yang dipilih sesaui dengan waktu tempat sewa Mobil (WITA)
          </Text>
          <View
            style={[
              rowCenter,
              {alignItems: 'center', justifyContent: 'center'},
            ]}>
            <View style={{height: 200}}>
              <ScrollPicker
                dataSource={[
                  '7',
                  '8',
                  '9',
                  '10',
                  '11',
                  '12',
                  '13',
                  '14',
                  '15',
                  '16',
                  '17',
                  '18',
                  '19',
                  '20',
                  '21',
                  '22',
                  '23',
                  '24',
                ]}
                selectedIndex={0}
                scrollViewComponent={BottomSheetScrollView}
                renderItem={(data: any) => (
                  <View
                    style={{
                      // height: 50,
                      width: 100,
                      alignSelf: 'center',
                      // backgroundColor: 'red',
                      // marginBottom: 10,
                    }}>
                    <Text>{data}</Text>
                  </View>
                )}
                onValueChange={(data, selectedIndex) => {
                  console.log(data, selectedIndex);
                  if(selectedIndex === 17) {
                    setMarginBottom(50);
                  } else {
                    setMarginBottom(0);
                  }
                  //
                }}
                wrapperHeight={180}
                // wrapperWidth={350}
                wrapperColor="#FFFFFF"
                itemHeight={60}
                highlightColor="#d8d8d8"
                // activeItemColor={'red'}
                highlightBorderWidth={2}
                activeItemTextStyle={{
                  fontSize: 23,
                  lineHeight: 26,
                  marginLeft: 20,
                  paddingBottom: marginBottom,
                  color: theme.colors.navy,
                }}
                itemTextStyle={{
                  fontSize: 20,
                  marginLeft: 20,
                  lineHeight: 26,
                  paddingBottom: marginBottom,
                  textAlign: 'center',
                  color: '#B4B4B4',
                }}
                // style={{height: 200}}
              />
            </View>

            <Text
              style={[
                h1,
                {
                  position: 'absolute',
                  alignSelf: 'center',
                  // left: '36%',
                  bottom: SCREEN_HEIGHT / 8.4,
                },
              ]}>
              {' '}
              :{' '}
            </Text>

            <View style={{}}>
              <ScrollPicker
                dataSource={['00', '30']}
                selectedIndex={0}
                scrollViewComponent={BottomSheetScrollView}
                renderItem={(data, index) => (
                  <View
                    style={{
                      // alignSelf: 'center',
                      marginLeft: 50,
                      backgroundColor: 'red',
                    }}>
                    <Text style={{backgroundColor: 'red'}}>{data}</Text>
                  </View>
                )}
                onValueChange={(data, selectedIndex) => {
                  console.log(data, selectedIndex);
                  setJamSewa([...jamSewa, data]);
                  if(selectedIndex === 1) {
                    setMarginBottom2(50);
                  } else {
                    setMarginBottom2(0);
                  }
                  //
                }}
                // wrapperHeight={180}
                // wrapperWidth={350}
                wrapperColor="#FFFFFF"
                itemHeight={60}
                highlightColor="#d8d8d8"
                activeItemColor={'red'}
                highlightBorderWidth={2}
                activeItemTextStyle={{
                  fontSize: 23,
                  lineHeight: 26,
                  marginRight: 20,
                  paddingBottom: marginBottom2,
                  color: theme.colors.navy,
                }}
                itemTextStyle={{
                  fontSize: 20,
                  marginRight: 20,
                  lineHeight: 26,
                  paddingBottom: marginBottom2,
                  textAlign: 'center',
                  color: '#B4B4B4',
                }}

                // style={{height: 300, marginLeft: 20}}
              />
            </View>

            
          </View>


          <Text style={[h4, {textAlign: 'center'}]}>
            Waktu pilih jam sewa akan sama dengan jam Pengembalian
          </Text>

          <Button
            title="Selesai"
            _theme="navy"
            styleWrapper={{marginTop: 20}}
          />
        </View>
      </BottomSheetModal> */}
    </View>
  );
};

export default WithoutDriverForm;

const styles = StyleSheet.create({
  dateDiffContainer: {
    position: 'absolute',
    width: 72,
    height: 17,
    backgroundColor: '#F1A33A',
    borderRadius: 16,
    top: 53,
    left: '40%',
  },
  dateDiff: {textAlign: 'center', fontSize: 12, color: theme.colors.white},
  wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey5,
    width: '100%',
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
});
