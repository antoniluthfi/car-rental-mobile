import React, {FC, useCallback, useState, useEffect} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  getOrders,
  getVehicleOrder,
} from 'redux/features/myBooking/myBookingAPI';
import {setPage} from 'redux/features/myBooking/myBookingSlice';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import DailyLayoutCard from './DailyLayoutCard';

const DailyLayout: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const myBooking = useAppSelector(state => state.myBooking);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [vehicleIds, setVehicleIds] = useState<any[]>([]);

  const handleRefresh = () => {
    setRefresh(true);
    dispatch(setPage(1));
    setRefresh(false);
  };

  const handleMore = () => {
    if (myBooking.page < myBooking.data.pagination.total_page) {
      setRefresh(true);
      dispatch(setPage(myBooking.data.pagination.next_page));
      setRefresh(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(getOrders());
    }, [myBooking.page, navigation]),
  );

  const renderItem = ({item}: any) => {
    return <DailyLayoutCard item={item} />;
  };

  useEffect(() => {
    if (myBooking.data.data.length == 0) return;
    const store: any[] = [];

    myBooking.data.data.map(booking => {
      const isFound = store.find(id => id == booking.order_detail.vehicle_id);

      if (isFound) return;
      store.push(booking.order_detail.vehicle_id);
    });

    setVehicleIds(store);
  }, [myBooking.data]);

  useEffect(() => {
    if (vehicleIds.length == 0) return;
    vehicleIds.forEach(id => {
      if (myBooking.vehicleData.find(vehicle => vehicle.id == id)) return;

      dispatch(getVehicleOrder({id}));
    });
  }, [vehicleIds]);

  return (
    <View style={styles.container}>
      <FlatList
        data={myBooking.data.data}
        contentContainerStyle={styles.list}
        renderItem={renderItem}
        keyExtractor={(item, i) => {
          return i.toString();
        }}
        refreshing={refresh}
        onRefresh={() => {
          return handleRefresh();
        }}
        onEndReached={() => {
          return handleMore();
        }}
        initialNumToRender={10}
        windowSize={5}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={30}
        // ListEmptyComponent={DataNotFound}
      />
    </View>
  );
};

export default DailyLayout;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F5F5'},
  list: {
    paddingHorizontal: '5%',
    paddingTop: 10,
  },
});
