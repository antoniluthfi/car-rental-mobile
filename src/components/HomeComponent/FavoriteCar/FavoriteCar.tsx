import CarCard from 'components/CarCard/CarCard';
import {StyleSheet, Text, View} from 'react-native';
import {getVehicles} from 'redux/features/vehicles/vehiclesAPI';
import {h1} from 'utils/styles';
import {IVehicles} from 'types/vehicles';
import {theme} from 'utils';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {vehiclesState} from 'redux/features/vehicles/vehiclesSlice';
import CustomCarousel from 'components/CustomCarousel/CustomCarousel';
import {WINDOW_WIDTH} from 'utils/mixins';

const FavoriteCar: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const vehicles = useAppSelector(vehiclesState).vehicles;

  const renderItem = ({item}: {item: IVehicles}) => {
    return (
      <CarCard
        item={item}
        onPress={() => navigation.navigate('DetailCar', {vehicle_id: item.id})}
      />
    );
  };

  useEffect(() => {
    dispatch(getVehicles(''));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[h1, styles.title]}>{t('Home.carFavTitle')}</Text>
      <CustomCarousel
        carouselWidth={WINDOW_WIDTH * (92 / 100)}
        data={[...vehicles].splice(0, 4)}
        renderItem={renderItem}
        showButtonNavigator={false}
        scrollAnimationDuration={2000}
        height={130}
        paginationSize={7}
        paginationColor="#F1A33A"
        paginationPosition={5}
        progressValueSpace={30}
        showScrollDot={false}
        loop={false}
      />
    </View>
  );
};

export default FavoriteCar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F6FA',
    width: '100%',
    paddingVertical: 20,
  },
  title: {marginBottom: 10, fontSize: 18, paddingLeft: '5%'},
});
