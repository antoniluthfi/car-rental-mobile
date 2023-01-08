import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import hoc from 'components/hoc';
import {useNavigation} from '@react-navigation/native';
import {
  boxShadow,
  iconCustomSize,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from 'utils/mixins';
import {Image} from 'react-native';
import {img_beach, img_car, img_mall} from 'assets/images';
import HomeTopNavigation from 'components/HomeComponent/HomeTopNavigation';
import {useAppDispatch} from 'redux/hooks';
import {getUser} from 'redux/features/appData/appDataAPI';
import {h1, h5} from 'utils/styles';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [navigation]);

  return (
    <View style={[styles.wrapper]}>
      <ScrollView>
        <Image source={img_car} style={styles.imgCar} resizeMode="cover" />
        <HomeTopNavigation />
        <View style={{paddingLeft: 16, marginTop: 20}}>

        <Text style={[h1]}>Wisata Favorit</Text>
          <ScrollView horizontal style={{marginTop: 12}}>
            {[...Array(10).fill(10)].map((x, i) => (
              <View
                key={i}
                style={[
                  boxShadow('#000', {height: 1, width: 2}, 3.27, 0.24),
                  ,
                  styles.boxWrapper,
                ]}>
                <Image source={img_beach} style={[iconCustomSize(150), {borderTopLeftRadius: 10, borderTopRightRadius: 10}]} />
                <View style={{padding: 10}}>
                  <Text style={[h1]}>Pantai Kuta</Text>
                  <Text style={[h5, {fontSize: 12, marginTop: 5}]}>Denpasar, Bali</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          <Text style={[h1, {marginTop: 30}]}>Destinasi Belanja</Text>
          <ScrollView horizontal style={{marginTop: 12}}>
            {[...Array(10).fill(10)].map((x, i) => (
              <View
                key={i}
                style={[
                  boxShadow('#000', {height: 1, width: 2}, 3.27, 0.24),
                  ,
                  styles.boxWrapper,
                ]}>
                <Image source={img_mall} style={[iconCustomSize(150), {borderTopLeftRadius: 10, borderTopRightRadius: 10}]} />
                <View style={{padding: 10}}>
                  <Text style={[h1]}>Mall Bali</Text>
                  <Text style={[h5, {fontSize: 12, marginTop: 5}]}>Denpasar, Bali</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default hoc(HomeScreen);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  imgCar: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT / 3,
  },
  boxWrapper: {
    marginRight: 12,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
  },
});
