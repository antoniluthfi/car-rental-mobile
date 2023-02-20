import appBar from 'components/AppBar/AppBar';
import BookingTopNavigation from 'components/MyBookingComponent/BookingTopNavigation';
import hoc from 'components/hoc';
import React, {useEffect} from 'react';
import {getAllGarages} from 'redux/features/garages/garagesAPI';
import {h1} from 'utils/styles';
import {ic_arrow_left_white} from 'assets/icons';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {resetDisbursementStatus} from 'redux/features/order/orderSlice';
import {rowCenter} from 'utils/mixins';
import {useAppDispatch} from 'redux/hooks';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const MyBooking: React.FC = () => {
  const {t} = useTranslation();
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
              {t('myBooking.tabBarLabel')}
            </Text>
          </TouchableOpacity>
        ),
      }),
    );

    dispatch(resetDisbursementStatus());
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
  },
});
