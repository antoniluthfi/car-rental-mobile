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
import {useEffect} from 'react';
import {getVehicles} from 'redux/features/vehicles/vehiclesAPI';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {vehiclesState} from 'redux/features/vehicles/vehiclesSlice';
import {URL_IMAGE} from '@env';
import CarCard from 'components/CarCard/CarCard';

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
  const dispatch = useAppDispatch();
  const vehicles = useAppSelector(vehiclesState).vehicles;

  useEffect(() => {
    dispatch(getVehicles(''));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[h1, styles.title]}>{t.carFavTitle}</Text>
      {[...vehicles].splice(0, 4).map((item, i) => (
        <CarCard
          item={item}
          onPress={() =>
            navigation.navigate('DetailCar', {vehicle_id: item.id})
          }
        />
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
