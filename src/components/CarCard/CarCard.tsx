import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {URL_IMAGE} from '@env';
import {ic_seat, ic_koper, ic_transisi} from 'assets/icons';
import {lang} from 'moment';
import {theme} from 'utils';
import {currencyFormat} from 'utils/currencyFormat';
import {rowCenter, iconSize} from 'utils/mixins';
import {h4, h1, h2} from 'utils/styles';
import {IVehicles} from 'types/vehicles';
import useLangSelector from 'utils/useLangSelector';

interface ICardCar {
  item: IVehicles;
  onPress: () => void;
}
const CarCard = ({item, onPress}: ICardCar) => {
  const lang = useLangSelector().list_car;
  return (
    <TouchableOpacity style={[rowCenter, styles.cardWrapper]} onPress={onPress}>
      <View>
        <View>
          <Image
            // source={{uri: URL_IMAGE + item?.photo?.[0]?.name}}
            source={{uri: URL_IMAGE + item?.photo?.[0]?.name}}
            style={{
              height: 86,
              width: 120,
            }}
          />
        </View>
        <View
          style={{
            backgroundColor:
              item.status === 'available'
                ? theme.colors.low_green
                : theme.colors.low_red,
            padding: 5,
            borderRadius: 20,
            width: '50%',
            marginTop: 10,
          }}>
          <Text
            style={[
              h4,
              {
                color:
                  item.status === 'available'
                    ? theme.colors.green
                    : theme.colors.red,
                fontSize: 10,
                alignSelf: 'center',
              },
            ]}>
            {item.status}
          </Text>
        </View>
      </View>
      <View style={{width: '60%'}}>
        <View style={[rowCenter, {justifyContent: 'space-between'}]}>
          <Text style={[h1]}>{item?.name}</Text>
        </View>

        <View
          style={[rowCenter, {justifyContent: 'space-between', marginTop: 10}]}>
          <View style={[rowCenter]}>
            <View style={[rowCenter]}>
              <Image source={ic_seat} style={iconSize} />
              <Text style={[h2, {marginLeft: 5}]}>{item?.max_passanger}</Text>
            </View>
          </View>

          <View style={[rowCenter, styles.wrapperLineVertical]}>
            <Image source={ic_koper} style={iconSize} />
            <Text style={[h2, {marginLeft: 5}]}>{item?.max_suitcase}</Text>
          </View>

          <View style={[rowCenter, {width: '40%'}]}>
            <Image source={ic_transisi} style={iconSize} />
            <Text style={[h2, {marginLeft: 5}]}>Manual</Text>
          </View>
        </View>

        <View style={{marginTop: 10}}>
          <Text style={[h4, {fontSize: 12}]}>{lang.rent_price}</Text>
          <Text style={[h1, {color: theme.colors.navy, marginTop: 5}]}>
            {currencyFormat(item.price)} <Text style={[h4]}>/ {lang.day}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CarCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F6FA',
    paddingHorizontal: '5%',
    paddingVertical: 20,
  },
  title: {marginBottom: 10, fontSize: 18},
  boxWrapper: {
    marginRight: 12,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
  },
  cardWrapper: {
    padding: 10,
    backgroundColor: theme.colors.white,
    marginBottom: 10,
    borderRadius: 8,
    justifyContent: 'space-between',
    width: '100%',
  },
  machineWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: theme.colors.grey6,
    borderRadius: 10,
  },
  wrapperLineVertical: {
    marginLeft: 5,
    paddingRight: 10,
  },
});
