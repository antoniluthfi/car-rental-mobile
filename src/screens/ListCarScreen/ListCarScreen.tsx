import appBar from 'components/AppBar/AppBar';
import CarCard from 'components/CarCard/CarCard';
import DropdownFilter from 'components/DropdownFilter/DropdownFilter';
import hoc from 'components/hoc';
import React, {FC, useEffect, useState} from 'react';
import {appDataState, saveFormDaily} from 'redux/features/appData/appDataSlice';
import {getBrands, getVehicles} from 'redux/features/vehicles/vehiclesAPI';
import {h1, h5} from 'utils/styles';
import {rowCenter} from 'utils/mixins';
import {IFormDaily} from 'types/global.types';
import {IVehicles} from 'types/vehicles';
import {theme} from 'utils';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {vehiclesState} from 'redux/features/vehicles/vehiclesSlice';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ic_arrow_left_white} from 'assets/icons';

const ListCarScreen: FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const formDaily = useAppSelector(appDataState).formDaily;
  const vehicles = useAppSelector(vehiclesState).vehicles;
  const brands = useAppSelector(vehiclesState).brands;
  const [form, setForm] = useState({
    filter_car_type: '',
    filter_seat: 4,
    filter_koper: '',
    brands: '',
  });
  const {t} = useTranslation();

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
              {t('list_car.header')}
            </Text>
          </TouchableOpacity>
        ),
        trailing: (
          <Text
            style={[h5, {color: 'white', marginRight: 16}]}
            onPress={() => navigation.goBack()}>
            {t('list_car.change_search')}
          </Text>
        ),
      }),
    );
  }, [navigation]);

  useEffect(() => {
    let params: string = '?';
    const _formdaily: IFormDaily = {...formDaily, passanger: form.filter_seat};

    if (form.brands) {
      _formdaily['brand'] = brands.find(x => x.name === form.brands)?.id!;
    }
    Object.keys(_formdaily).map(x => {
      params += `${x}=${_formdaily[x as keyof IFormDaily]}&`;
    });
    dispatch(getVehicles(params));
    dispatch(getBrands());
  }, [navigation, form.brands, form.filter_seat]);

  const renderItem = ({item, index}: {item: IVehicles; index: number}) => (
    <CarCard
      item={item}
      onPress={() => {
        navigation.navigate('DetailCar', {vehicle_id: item.id});
        dispatch(saveFormDaily({...formDaily, vehicle_id: item.id}));
      }}
    />
  );
  return (
    <View
      style={{
        flex: 1,
        margin: 16,
      }}>
      <ScrollView horizontal style={{maxHeight: 50}}>
        <DropdownFilter
          data={brands}
          label={t('list_car.car_type')}
          onSelect={v => setForm({...form, brands: v.name})}
          selected={form.brands}
        />
        <DropdownFilter
          data={[{name: '4'}, {name: '5'}, {name: '6'}]}
          label={t('list_car.seat')}
          onSelect={v => setForm({...form, filter_seat: parseInt(v.name)})}
          selected={form.filter_seat}
        />
      </ScrollView>
      <View style={{marginTop: 20}} />
      <FlatList data={vehicles} renderItem={renderItem} />
    </View>
  );
};

export default hoc(ListCarScreen);

const styles = StyleSheet.create({
  cardWrapper: {
    padding: 10,
    borderWidth: 1,
    borderColor: theme.colors.grey4,
    marginBottom: 20,
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  machineWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: theme.colors.grey6,
    borderRadius: 10,
  },
  wrapperLineVertical: {
    marginLeft: 5,
    borderRightColor: theme.colors.grey5,
    borderRightWidth: 1,
    paddingRight: 10,
  },
});
