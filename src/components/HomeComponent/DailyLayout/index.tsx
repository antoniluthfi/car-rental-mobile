import DriverSelection from '../DriverSelection/DriverSelection';
import React, {FC, useState} from 'react';
import {View} from 'react-native';
import WithoutDriverForm from '../WithoutDriverForm/WithoutDriverForm';
import WithDriver from '../WithDriver/WithDriver';

const DailyLayout: FC = () => {
  const [withDriverState, setWithDriverState] = useState<boolean>(true);

  return (
    <View style={{flex: 1, marginHorizontal: 16, marginTop: 16}}>
      <DriverSelection
        onChange={({withDriver}) => {
          setWithDriverState(withDriver);
        }}
      />

      {withDriverState ? <WithDriver /> : <WithoutDriverForm />}
    </View>
  );
};

export default DailyLayout;
