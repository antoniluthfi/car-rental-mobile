import React from 'react';
import RentBicycleNavigation from '../RentBicycleNavigation/RentBicycleNavigation';
import RentCarNavigation from '../RentCarNavigation/RentCarNavigation';
import RentMotorCycleNavigation from '../RentMotorCycleNavigation/RentMotorCycleNavigation';
import {FC} from 'react';
import {View} from 'react-native';

type HeroState = 'Sewa Mobil' | 'Sewa Motor' | 'Sewa Sepeda';
type HomeTopNavigationProps = {
  state: HeroState;
};

const HomeTopNavigation: FC<HomeTopNavigationProps> = ({state}) => {
  return (
    <View style={{flex: 1}}>
      {state === 'Sewa Mobil' ? (
        <RentCarNavigation />
      ) : state === 'Sewa Motor' ? (
        <RentMotorCycleNavigation />
      ) : (
        <RentBicycleNavigation />
      )}
    </View>
  );
};

export default HomeTopNavigation;
