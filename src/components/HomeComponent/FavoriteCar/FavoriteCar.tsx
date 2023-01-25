import useLangSelector from 'utils/useLangSelector';
import {iconSize, rowCenter} from 'utils/mixins';
import {h1, h2, h3, h4, h5} from 'utils/styles';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {img_car_2} from 'assets/images';
import {useNavigation} from '@react-navigation/native';
import {theme} from 'utils';
import {FONT_SIZE_12} from 'utils/typography';
import {
  ic_disable,
  ic_dog,
  ic_koper,
  ic_nosmoke,
  ic_seat,
  ic_transisi,
} from 'assets/icons';
import {currencyFormat} from 'utils/currencyFormat';

const favoriteCarsDummy = [
  {
    id: 1,
    name: 'Suzuki Ertiga Gx',
    max_passanger: 7,
    smoke_allowed: false,
    pet_allowed: false,
    max_suitcase: 4,
    disablility_allowed: true,
    price: 275000,
    img: img_car_2,
  },
  {
    id: 2,
    name: 'Toyota Veloz',
    max_passanger: 12,
    smoke_allowed: true,
    pet_allowed: true,
    max_suitcase: 8,
    disablility_allowed: true,
    price: 300000,
    img: img_car_2,
  },
  {
    id: 3,
    name: 'Toyota Veloz',
    max_passanger: 5,
    smoke_allowed: false,
    pet_allowed: true,
    max_suitcase: 8,
    disablility_allowed: false,
    price: 350000,
    img: img_car_2,
  },
  {
    id: 4,
    name: 'Toyota Veloz',
    max_passanger: 4,
    smoke_allowed: false,
    pet_allowed: true,
    max_suitcase: 5,
    disablility_allowed: false,
    price: 400000,
    img: img_car_2,
  },
];

const FavoriteCar: React.FC = () => {
  const t = useLangSelector().Home;
  const navigation = useNavigation();
  const lang = useLangSelector().list_car;

  return (
    <View style={styles.container}>
      <Text style={[h1, styles.title]}>{t.carFavTitle}</Text>
      {favoriteCarsDummy.map((item, i) => (
        <TouchableOpacity
          key={i}
          style={[rowCenter, styles.cardWrapper]}
          onPress={() => {
            // navigation.navigate('DetailCar', {vehicle_id: item.id});
            // dispatch(saveFormDaily({...formDaily, vehicle_id: item.id}));
          }}>
          <Image
            // source={{uri: URL_IMAGE + item?.photo?.[0]?.name}}
            source={item.img}
            style={{
              height: 86,
              width: 120,
            }}
          />
          <View style={{width: '60%'}}>
            <View style={[rowCenter, {justifyContent: 'space-between'}]}>
              <Text style={[h1]}>{item.name}</Text>
            </View>

            <View
              style={[
                rowCenter,
                {justifyContent: 'space-between', marginTop: 10},
              ]}>
              <View style={[rowCenter]}>
                <View style={[rowCenter]}>
                  <Image source={ic_seat} style={iconSize} />
                  <Text style={[h2, {marginLeft: 5}]}>
                    {item.max_passanger}
                  </Text>
                </View>
              </View>

              <View style={[rowCenter, styles.wrapperLineVertical]}>
                <Image source={ic_koper} style={iconSize} />
                <Text style={[h2, {marginLeft: 5}]}>{item.max_suitcase}</Text>
              </View>

              <View style={[rowCenter, {width: '40%'}]}>
                <Image source={ic_transisi} style={iconSize} />
                <Text style={[h2, {marginLeft: 5}]}>Manual</Text>
              </View>
            </View>

            <View style={{marginTop: 10}}>
              <Text style={[h4, {fontSize: 12}]}>{lang.rent_price}</Text>
              <Text style={[h1, {color: theme.colors.navy, marginTop: 5}]}>
                {currencyFormat(item.price)}{' '}
                <Text style={[h4]}>/ {lang.day}</Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FavoriteCar;

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
