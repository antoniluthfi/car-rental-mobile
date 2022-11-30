import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import hoc from 'components/hoc';
import Button from 'components/Button';
import CustomTextInput from 'components/TextInput';
import {h1, h2, h5} from 'utils/styles';
import {useNavigation} from '@react-navigation/native';
import appBar from 'components/AppBar/AppBar';
import {
  container,
  iconSize,
  margin,
  rowCenter,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from 'utils/mixins';
import {FONT_SIZE_12} from 'utils/typography';
import {Image} from 'react-native';
import {img_car} from 'assets/images';
import {theme} from 'utils';
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
