import {Text, View} from 'react-native';
import React from 'react';
import hoc from 'components/hoc';

const MyBooking: React.FC = () => {
  // const navigation = useNavigation();

  return (
    <View>
      <Text>MyBooking</Text>
    </View>
  );
};

export default hoc(MyBooking);
