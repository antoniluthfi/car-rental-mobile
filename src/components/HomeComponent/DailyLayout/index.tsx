import {useNavigation} from '@react-navigation/native';
import Button from 'components/Button';
import DatePickerComponent from 'components/DatePicker/DatePicker';
import DropdownLocation from 'components/DropdownLocation/DropdwonLocation';
import moment from 'moment';
import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ReactNativeModernDatepicker from 'react-native-modern-datepicker';
import {getAllCities} from 'redux/features/appData/appDataAPI';
import {appDataState} from 'redux/features/appData/appDataSlice';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {ICities} from 'types/global.types';
import {rowCenter, WINDOW_HEIGHT, WINDOW_WIDTH} from 'utils/mixins';
import {h1} from 'utils/styles';

interface IForm {
  location: ICities;
  tanggal_sewa: string;
  tanggal_pengembalian: string;
  jam_sewa: string;
  jam_pengembalian: string;
}

const DailyLayout: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const cities = useAppSelector(appDataState)?.cities || [];
  const [form, setForm] = useState<IForm>({
    location: {id: 0, name: ''},
    tanggal_sewa: '',
    tanggal_pengembalian: '',
    jam_sewa: '',
    jam_pengembalian: '',
  });

  useEffect(() => {
    dispatch(getAllCities());
  }, []);

  return (
    <View style={{flex: 1, margin: 16}}>
      <DropdownLocation
        data={cities}
        onSelect={(v: ICities) => {
          setForm({...form, location: v});
        }}
        label={''}
        selected={form.location}
      />
      <View
        style={[rowCenter, {justifyContent: 'space-between', marginTop: 30}]}>
        <DatePickerComponent
          mode="date"
          placeholder="Pilih Tanggal"
          title="Tanggal Mulai Sewa"
          containerStyle={{
            width: '45%',
          }}
          value={
            !form.tanggal_sewa
              ? ''
              : moment(form.tanggal_sewa).format('DD MMMM YYYY')
          }
          content={
            <View>
              <Text style={[h1, {marginLeft: 16}]}>Tanggal Mulai Sewa</Text>
              <ReactNativeModernDatepicker
                style={{
                  width: WINDOW_WIDTH,
                  height: WINDOW_HEIGHT,
                }}
                onDateChange={v => setForm({...form, tanggal_sewa: v})}
                mode={'calendar'}
              />
            </View>
          }
        />
        <DatePickerComponent
          mode="clock"
          placeholder="Pilih Jam"
          title="Jam Sewa"
          containerStyle={{
            width: '45%',
          }}
          value={form?.jam_sewa}
          onChangeTime={(v: string) => setForm({...form, jam_sewa: v})}
        />
      </View>

      <View
        style={[rowCenter, {justifyContent: 'space-between', marginTop: 30}]}>
        <DatePickerComponent
          mode="date"
          placeholder="Pilih Tanggal"
          title="Tanggal Pengembalian"
          containerStyle={{
            width: '45%',
          }}
          value={
            !form.tanggal_pengembalian
              ? ''
              : moment(form.tanggal_pengembalian).format('DD MMMM YYYY')
          }
          content={
            <View>
              <Text style={[h1, {marginLeft: 16}]}>Tanggal Pengembalian</Text>
              <ReactNativeModernDatepicker
                style={{
                  width: WINDOW_WIDTH,
                  height: WINDOW_HEIGHT,
                }}
                onDateChange={v => setForm({...form, tanggal_pengembalian: v})}
                mode={'calendar'}
              />
            </View>
          }
        />
        <DatePickerComponent
          mode="clock"
          placeholder="Pilih Jam"
          title="Jam Sewa"
          containerStyle={{
            width: '45%',
          }}
          value={form.jam_pengembalian}
          onChangeTime={(v: string) => setForm({...form, jam_pengembalian: v})}
        />
      </View>

      <Button
        _theme="navy"
        title="Cari Mobil"
        onPress={() => navigation.navigate('ListCar')}
        styleWrapper={{
          marginTop: 20,
        }}
      />
    </View>
  );
};

export default DailyLayout;

const styles = StyleSheet.create({});
