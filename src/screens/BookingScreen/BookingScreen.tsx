import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect } from 'react';
import hoc from 'components/hoc';
import BookingTopNavigation from 'components/MyBookingComponent/BookingTopNavigation';
import appBar from 'components/AppBar/AppBar';
import { useNavigation } from '@react-navigation/native';
import { rowCenter } from 'utils/mixins';
import { ic_arrow_left_white } from 'assets/icons';
import { h1 } from 'utils/styles';
import { useAppDispatch } from 'redux/hooks';
import { getAllGarages } from 'redux/features/garages/garagesAPI';

const MyBooking: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    navigation.setOptions(
      appBar({
        leading: (
          <TouchableOpacity
            style={rowCenter}
            onPress={() => navigation.goBack()}>
            <Image
              source={ic_arrow_left_white}
              style={{
                height: 20,
                width: 20,
                marginLeft: 16,
              }}
            />
            <Text style={[h1, {color: 'white', marginLeft: 10}]}>
              My Booking
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  useEffect(() => {
    dispatch(getAllGarages());
  }, []);

  return (
    <View style={styles.container}>
      <BookingTopNavigation />
    </View>
  );
};

export default hoc(MyBooking);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})