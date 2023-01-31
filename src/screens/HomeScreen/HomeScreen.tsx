import Article from 'components/HomeComponent/Article/Article';
import FAQ from 'components/HomeComponent/FAQ/FAQ';
import FavoriteCar from 'components/HomeComponent/FavoriteCar/FavoriteCar';
import GetRideDescription from 'components/HomeComponent/GetRideDescription/GetRideDescription';
import hoc from 'components/hoc';
import HomeHero from 'components/HomeComponent/HomeHero/HomeHero';
import HomeTopNavigation from 'components/HomeComponent/HomeTopNavigation';
import React, {useCallback, useEffect, useState} from 'react';
import useLangSelector from 'utils/useLangSelector';
import WhyChooseUs from 'components/HomeComponent/WhyChooseUs/WhyChooseUs';
import {getUser} from 'redux/features/appData/appDataAPI';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useAppDispatch} from 'redux/hooks';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from 'utils/mixins';

type HeroState = 'Sewa Mobil' | 'Sewa Motor' | 'Sewa Sepeda';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const t1 = useLangSelector();
  const [update, setUpdate] = useState(false);
  const [heroState, setHeroState] = useState<HeroState>('Sewa Mobil');

  useEffect(() => {
    dispatch(getUser());
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      setUpdate(prev => !prev);
    }, [t1]),
  );

  return (
    <View style={[styles.wrapper]}>
      {/* <Text>{update}</Text> */}
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
