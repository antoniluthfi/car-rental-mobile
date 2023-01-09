import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import hoc from 'components/hoc';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  boxShadow,
  iconCustomSize,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from 'utils/mixins';
import {Image} from 'react-native';
import {img_beach, img_car, img_car_2, img_mall} from 'assets/images';
import HomeTopNavigation from 'components/HomeComponent/HomeTopNavigation';
import {useAppDispatch} from 'redux/hooks';
import {getUser} from 'redux/features/appData/appDataAPI';
import {h1, h5} from 'utils/styles';
import useLangSelector from 'utils/useLangSelector';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const t = useLangSelector().Home;
  const t1 = useLangSelector();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    dispatch(getUser());
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      setUpdate(prev=> !prev)
    }, [t, t1]),
  );

  return (
    <View style={[styles.wrapper]}>
      {/* <Text>{update}</Text> */}
      <ScrollView>
        <Image source={img_car} style={styles.imgCar} resizeMode="cover" />
        <HomeTopNavigation />
        <View style={{paddingLeft: 16, marginTop: 20}}>

        <Text style={[h1]}>{t.carFavTitle}</Text>
          <ScrollView horizontal style={{marginTop: 12}}>
            {t.carFavList.map((x, i) => (
              <View
                key={i}
                style={[
                  boxShadow('#000', {height: 1, width: 2}, 3.27, 0.24),
                  ,
                  styles.boxWrapper,
                  {width: 300}
                ]}>
                <Image source={img_car_2} style={[, {borderTopLeftRadius: 10, borderTopRightRadius: 10, width: 300, height: 200}]} />
                <View style={{padding: 10}}>
                  <Text style={[h1]}>{x.title}</Text>
                  <Text style={[h5, {fontSize: 12, marginTop: 5}]}>{x.description}</Text>
                </View>
              </View>
            ))}
          </ScrollView>


        <Text style={[h1, {marginTop: 20}]}>{t.destinationFavTitle}</Text>
          <ScrollView horizontal style={{marginTop: 12}}>
            {t.destinationFavList.map((x, i) => (
              <View
                key={i}
                style={[
                  boxShadow('#000', {height: 1, width: 2}, 3.27, 0.24),
                  ,
                  styles.boxWrapper,
                  {width: 300}
                ]}>
                <Image source={img_beach} style={[, {borderTopLeftRadius: 10, borderTopRightRadius: 10, width: 300, height: 200}]} />
                <View style={{padding: 10}}>
                  <Text style={[h1]}>{x.name}</Text>
                  <Text style={[h5, {fontSize: 12, marginTop: 5}]}>{x.description}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          <Text style={[h1, {marginTop: 20}]}>{t.articleTitle}</Text>
          <ScrollView horizontal style={{marginTop: 12}}>
            {t.articleList.map((x, i) => (
              <View
                key={i}
                style={[
                  boxShadow('#000', {height: 1, width: 2}, 3.27, 0.24),
                  ,
                  styles.boxWrapper,
                  {width: 300}
                ]}>
                <Image source={img_beach} style={[, {borderTopLeftRadius: 10, borderTopRightRadius: 10, width: 300, height: 200}]} />
                <View style={{padding: 10}}>
                  <Text style={[h1]}>{x.title}</Text>
                  <Text style={[h5, {fontSize: 12, marginTop: 5}]}>{x.description}</Text>
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
