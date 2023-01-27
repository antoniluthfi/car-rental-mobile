import Button from 'components/Button';
import DatePickerComponent from 'components/DatePicker/DatePicker';
import DropdownLocation from 'components/DropdownLocation/DropdwonLocation';
import moment from 'moment';
import ReactNativeModernDatepicker from 'react-native-modern-datepicker';
import useLangSelector from 'utils/useLangSelector';
import {appDataState, saveFormDaily} from 'redux/features/appData/appDataSlice';
import {getAllCities} from 'redux/features/appData/appDataAPI';
import {h1, h5} from 'utils/styles';
import {ICities} from 'types/global.types';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {theme} from 'utils';
import {toggleBSheet} from 'redux/features/utils/utilsSlice';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from 'utils/mixins';

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
  const cities = useAppSelector(appDataState)?.cities || [];
  const lang = useLangSelector();

  const [form, setForm] = useState<IForm>({
    location: {id: 0, name: ''},
    tanggal_sewa: '',
    tanggal_pengembalian: '',
    jam_sewa: '',
    jam_pengembalian: '',
  });
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
          start_booking_date: `${moment(form?.tanggal_sewa)
            .format('YYYY-MM-DD')
            .toString()}`,
          end_booking_date: `${moment(form?.tanggal_pengembalian)
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
        const tglSewa = moment(form.tanggal_sewa.split('/'));
        const tglPengembalian = moment(form.tanggal_pengembalian.split('/'));
        const res = tglPengembalian.diff(tglSewa, 'days');

        return `${res} ${res > 1 ? lang.Home.daily.days : lang.Home.daily.day}`;
      }

      return '';
    },
  };

  return (
    <View>
      <DropdownLocation
        data={cities}
        onSelect={(v: ICities) => {
          setForm({...form, location: v});
          setFormError({...formError, error_location: ''});
        }}
        label={''}
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
          content={
            <View>
              <Text style={[h1, {marginLeft: 16}]}>
                {lang.Home.daily.rent_start_date}
              </Text>
              <ReactNativeModernDatepicker
                style={{
                  width: WINDOW_WIDTH,
                  height: WINDOW_HEIGHT,
                }}
                minimumDate={moment(new Date()).format('YYYY-MM-DD')}
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
          content={
            <View>
              <Text style={[h1, {marginLeft: 16}]}>
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
        <DatePickerComponent
          mode="clock"
          placeholder={lang.Home.daily.rent_start_time}
          title={lang.Home.daily.rent_start_time}
          containerStyle={{
            width: '49%',
          }}
          value={form?.jam_sewa}
          onChangeTime={(v: string) => {
            setForm({...form, jam_sewa: v});
            setFormError({...formError, error_jam_sewa: ''});
          }}
          errorMessage={formError.error_jam_sewa}
        />
        <DatePickerComponent
          mode="clock"
          placeholder={lang.Home.daily.rent_end_time}
          title={lang.Home.daily.rent_end_time}
          containerStyle={{
            width: '49%',
          }}
          value={form.jam_sewa}
          disableTime
          errorMessage={formError.error_jam_sewa}
        />
      </View>

      <Button
        _theme="navy"
        title={lang.Home.daily.btn_search}
        onPress={methods.handleSearch}
        styleWrapper={{
          marginTop: 40,
        }}
      />
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
});