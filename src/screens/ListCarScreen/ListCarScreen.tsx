import appBar from 'components/AppBar/AppBar';
import DropdownFilter from 'components/DropdownFilter/DropdownFilter';
import hoc from 'components/hoc';
import React, {FC, useEffect, useState} from 'react';
import useLangSelector from 'utils/useLangSelector';
import {appDataState, saveFormDaily} from 'redux/features/appData/appDataSlice';
import {currencyFormat} from 'utils/currencyFormat';
import {FONT_SIZE_12} from 'utils/typography';
import {getBrands, getVehicles} from 'redux/features/vehicles/vehiclesAPI';
import {h1, h2, h3, h4, h5} from 'utils/styles';
import {iconSize, rowCenter} from 'utils/mixins';
import {IFormDaily} from 'types/global.types';
import {IVehicles} from 'types/vehicles';
import {theme} from 'utils';
import {URL_IMAGE} from '@env';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {useNavigation} from '@react-navigation/native';
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
import {
  ic_arrow_left_white,
  ic_disable,
  ic_dog,
  ic_koper,
  ic_nosmoke,
  ic_seat,
} from 'assets/icons';

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
  const lang = useLangSelector().list_car;

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
              {lang.header}
            </Text>
          </TouchableOpacity>
        ),
        trailing: (
          <Text
            style={[h5, {color: 'white', marginRight: 16}]}
            onPress={() => navigation.goBack()}>
            {lang.change_search}
          </Text>
        ),
      }),
    );
  }, [navigation, lang]);

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
    <TouchableOpacity
      style={[rowCenter, styles.cardWrapper]}
      onPress={() => {
        navigation.navigate('DetailCar', {vehicle_id: item.id});
        dispatch(saveFormDaily({...formDaily, vehicle_id: item.id}));
      }}>
      <Image
        source={{uri: URL_IMAGE + item?.photo?.[0]?.name}}
        style={{
          height: 86,
          width: 120,
        }}
      />
      <View style={{width: '60%'}}>
        <View style={[rowCenter, {justifyContent: 'space-between'}]}>
          <Text style={[h1]}>{item.name}</Text>
          <View style={styles.machineWrapper}>
            <Text
              style={[h3, {color: theme.colors.navy, fontSize: FONT_SIZE_12}]}>
              Manual
            </Text>
          </View>
        </View>

        <View
          style={[rowCenter, {justifyContent: 'space-between', marginTop: 10}]}>
          <View style={[rowCenter, {}]}>
            <View style={[rowCenter]}>
              <View style={[rowCenter]}>
                <Image source={ic_seat} style={iconSize} />
                <Text style={[h2, {marginLeft: 5}]}>{item.max_passanger}</Text>
              </View>
            </View>
            <View style={[rowCenter, styles.wrapperLineVertical]}>
              <Image source={ic_koper} style={iconSize} />
              <Text style={[h2, {marginLeft: 5}]}>{item.max_suitcase}</Text>
            </View>
          </View>

          <View style={[rowCenter, {width: '40%'}]}>
            {item.smoke_allowed && (
              <Image source={ic_nosmoke} style={iconSize} />
            )}
            {item.pet_allowed && (
              <Image source={ic_dog} style={[iconSize, {marginRight: 10}]} />
            )}
            {item.disablility_allowed && (
              <Image source={ic_disable} style={iconSize} />
            )}
          </View>
        </View>

        <View style={{marginTop: 10}}>
          <Text style={[h4, {fontSize: 12}]}>{lang.rent_price}</Text>
          <Text style={[h1, {color: theme.colors.blue, marginTop: 5}]}>
            {currencyFormat(item.price)} <Text style={[h4]}>/ {lang.day}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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
          label={lang.car_type}
          onSelect={v => setForm({...form, brands: v.name})}
          selected={form.brands}
        />
        <DropdownFilter
          data={[{name: '4'}, {name: '5'}, {name: '6'}]}
          label={lang.seat}
          onSelect={v => setForm({...form, filter_seat: parseInt(v.name)})}
          selected={form.filter_seat}
        />
        {/* <DropdownFilter
          data={[{name: '1'}, {name: '2'}, {name: '3'}]}
          label={lang.bag}
          onSelect={v => setForm({...form, filter_koper: v.name})}
          selected={form.filter_koper}
        /> */}
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
