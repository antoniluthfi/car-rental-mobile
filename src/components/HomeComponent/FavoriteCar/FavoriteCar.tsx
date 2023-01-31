import useLangSelector from 'utils/useLangSelector';
import {h1} from 'utils/styles';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {theme} from 'utils';
import {useEffect} from 'react';
import {getVehicles} from 'redux/features/vehicles/vehiclesAPI';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {vehiclesState} from 'redux/features/vehicles/vehiclesSlice';
import CarCard from 'components/CarCard/CarCard';

const FavoriteCar: React.FC = () => {
  const t = useLangSelector().Home;
  const navigation = useNavigation();
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
          key={`${item.name}-${i}`}
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
