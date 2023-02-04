import Article from 'components/HomeComponent/Article/Article';
import FAQ from 'components/HomeComponent/FAQ/FAQ';
import FavoriteCar from 'components/HomeComponent/FavoriteCar/FavoriteCar';
import GetRideDescription from 'components/HomeComponent/GetRideDescription/GetRideDescription';
import hoc from 'components/hoc';
import HomeHero from 'components/HomeComponent/HomeHero/HomeHero';
import HomeTopNavigation from 'components/HomeComponent/HomeTopNavigation';
import React, {useEffect, useState} from 'react';
import SwitchLanguage from 'components/HomeComponent/SwitchLanguage/SwitchLanguage';
import WhyChooseUs from 'components/HomeComponent/WhyChooseUs/WhyChooseUs';
import {getUser} from 'redux/features/appData/appDataAPI';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useAppDispatch} from 'redux/hooks';
import {useNavigation} from '@react-navigation/native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from 'utils/mixins';

type HeroState = 'Sewa Mobil' | 'Sewa Motor' | 'Sewa Sepeda';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [heroState, setHeroState] = useState<HeroState>('Sewa Mobil');

  useEffect(() => {
    dispatch(getUser());
  }, [navigation]);

  return (
    <View style={[styles.wrapper]}>
      {/* <Text>{update}</Text> */}

      <SwitchLanguage />

      <ScrollView>
        <HomeHero onSelectionChange={setHeroState as any} />
        <HomeTopNavigation state={heroState} />
        <FavoriteCar />
        <GetRideDescription />
        <WhyChooseUs />
        <FAQ />
        <Article />
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
