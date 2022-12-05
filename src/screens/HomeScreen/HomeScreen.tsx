import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import hoc from 'components/hoc';
import {useNavigation} from '@react-navigation/native';
import {
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from 'utils/mixins';
import {Image} from 'react-native';
import {img_car} from 'assets/images';
import HomeTopNavigation from 'components/HomeComponent/HomeTopNavigation';
import { useAppDispatch } from 'redux/hooks';
import { getUser } from 'redux/features/appData/appDataAPI';

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
        <HomeTopNavigation/>
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
});
