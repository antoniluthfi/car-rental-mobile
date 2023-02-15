import React from 'react';
import RentBicycleNavigation from '../RentBicycleNavigation/RentBicycleNavigation';
import RentCarNavigation from '../RentCarNavigation/RentCarNavigation';
import RentMotorCycleNavigation from '../RentMotorCycleNavigation/RentMotorCycleNavigation';
import {FC} from 'react';
import {View} from 'react-native';

type HeroState = 'sewa_mobil' | 'sewa_motor' | 'sewa_sepeda';
type HomeTopNavigationProps = {
  state: HeroState;
};

const HomeTopNavigation: FC<HomeTopNavigationProps> = ({state}) => {
  return (
    <View style={{flex: 1}}>
      {state === 'sewa_mobil' ? (
        <RentCarNavigation />
      ) : state === 'sewa_motor' ? (
        <RentMotorCycleNavigation />
      ) : (
        <RentBicycleNavigation />
      )}
    </View>
  );
};

export default HomeTopNavigation;
