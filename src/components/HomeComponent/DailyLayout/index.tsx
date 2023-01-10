import {useNavigation} from '@react-navigation/native';
import {ic_info} from 'assets/icons';
import Button from 'components/Button';
import DatePickerComponent from 'components/DatePicker/DatePicker';
import DropdownLocation from 'components/DropdownLocation/DropdwonLocation';
import moment from 'moment';
import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Platform, Image} from 'react-native';
import ReactNativeModernDatepicker from 'react-native-modern-datepicker';
import {getAllCities} from 'redux/features/appData/appDataAPI';
import {appDataState, saveFormDaily} from 'redux/features/appData/appDataSlice';
import {toggleBSheet} from 'redux/features/utils/utilsSlice';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {ICities} from 'types/global.types';
import useLangSelector from 'utils/useLangSelector';
import {theme} from 'utils';
import {iconCustomSize, WINDOW_HEIGHT, WINDOW_WIDTH} from 'utils/mixins';
import {h1, h2} from 'utils/styles';

interface IForm {
  location: ICities;
  tanggal_sewa: string;
  tanggal_pengembalian: string;
  jam_sewa: string;
  jam_pengembalian: string;
}
interface IFormError {
  error_location: string;
  error_tanggal_sewa: string;
  error_tanggal_pengembalian: string;
  error_jam_sewa: string;
  error_jam_pengembalian: string;
}

const DailyLayout: FC = () => {
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

      if(parseInt(form.jam_sewa.slice(0, form.jam_sewa.length / 2)) < 7) {
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
  };

  return (
    <View style={{flex: 1, margin: 16}}>
      <View style={styles.withoutDriver}>
        <Image source={ic_info} style={iconCustomSize(13)} />
        <Text style={[h2, styles.withoutDriverLabel]}>Tanpa Supir</Text>
      </View>

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
          placeholder={lang.Home.daily.rent_start_date}
          title={lang.Home.daily.rent_start_date}
          containerStyle={{
            width: '45%',
          }}
          inputContainerStyle={{
            marginTop: 6,
          }}
          value={form.tanggal_sewa ?? ''}
          content={
            <View>
              <Text style={[h1, {marginLeft: 16}]}>{lang.Home.daily.rent_start_date}</Text>
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
          mode="clock"
          placeholder={lang.Home.daily.rent_start_time}
          title={lang.Home.daily.rent_start_time}
          containerStyle={{
            width: '45%',
          }}
          value={form?.jam_sewa}
          onChangeTime={(v: string) => {
            setForm({...form, jam_sewa: v});
            setFormError({...formError, error_jam_sewa: ''});
          }}
          errorMessage={formError.error_jam_sewa}
        />
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
          mode="date"
          placeholder={lang.Home.daily.rent_end_date}
          title={lang.Home.daily.rent_end_date}
          containerStyle={{
            width: '45%',
          }}
          value={form.tanggal_pengembalian ?? ''}
          content={
            <View>
              <Text style={[h1, {marginLeft: 16}]}>{lang.Home.daily.rent_end_date}</Text>
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
                // maximumDate={moment(new Date()).format('YYYY-MM-DD')}
                onDateChange={v => {
                  setTimeout(() => {
                    dispatch(
                      toggleBSheet({
                        // content: <View />,
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
        <DatePickerComponent
          mode="clock"
          placeholder={lang.Home.daily.rent_end_time}
          title={lang.Home.daily.rent_end_time}
          containerStyle={{
            width: '45%',
          }}
          value={form.jam_sewa}
          // onChangeTime={(v: string) => setForm({...form, jam_pengembalian: v})}
          disableTime={true}
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

export default DailyLayout;

const styles = StyleSheet.create({
  withoutDriver: {
    backgroundColor: theme.colors.navy,
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
  },
  withoutDriverLabel: {color: theme.colors.white, marginLeft: 5, fontSize: 10},
});
