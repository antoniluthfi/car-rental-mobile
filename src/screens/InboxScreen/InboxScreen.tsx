import appBar from 'components/AppBar/AppBar';
import DataNotFound from 'components/DataNotFound/DataNotFound';
import hoc from 'components/hoc';
import MyInboxCard from 'components/MyInboxComponent/MyInboxCard/MyInboxCard';
import React, {useEffect, useState} from 'react';
import {getInboxes} from 'redux/features/inbox/myInboxAPI';
import {h1} from 'utils/styles';
import {ic_arrow_left_white} from 'assets/icons';
import {rowCenter} from 'utils/mixins';
import {setPage} from 'redux/features/inbox/myInboxSlice';
import {useAppDispatch} from 'redux/hooks';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
} from 'react-native';

const NOTIFICATION_LIST = [
  {
    id: 1,
    message:
      'Pembayaran airport transfer anda berhasil, cek untuk jadwal keberangkatan dan pastikan tepat waktu ya.',
    title: 'Pembayaran Berhasil',
    timestamp: '01 July, 2022, 09:00',
    type: 'payment-success',
    subtitle: 'Airport Transfer',
    seen: true,
  },
  {
    id: 2,
    message:
      'Ada promo akhir tahun untuk kalian yang sering menggunakan rent.com log, yuk cek untuk detailnya',
    title: 'Promo Akhir Tahun',
    timestamp: '01 July, 2022, 09:00',
    type: 'promo-special',
    subtitle: 'Promo Special',
    seen: false,
  },
  {
    id: 3,
    message: 'Pembayaran gagal karena melewati waktu yang telah ditetapkan',
    title: 'Pembayaran Gagal',
    timestamp: '30 June, 2022, 09:00',
    type: 'payment-expired',
    subtitle: 'Airport Transfer',
    seen: false,
  },
];

const MyBooking: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [refresh, setRefresh] = useState<boolean>(false);

  const handleRefresh = () => {
    setRefresh(true);
    dispatch(setPage(1));
    setRefresh(false);
  };

  const handleMore = () => {
    // if (myBooking.page < myBooking.data.pagination.total_page) {
    //   setRefresh(true);
    //   dispatch(setPage(myBooking.data.pagination.next_page));
    // setRefresh(false);
    // }
  };

  const renderItem = ({item}: any) => {
    return <MyInboxCard item={item} />;
  };

  useEffect(() => {
    dispatch(getInboxes());
  }, []);

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
              {t('myInbox.tabBarLabel')}
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={NOTIFICATION_LIST}
        // data={inbox.data?.inboxes || []}
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
        ListEmptyComponent={
          <DataNotFound
            title={t('notification.not_found_title') as any}
            description={t('notification.not_found_description') as any}
          />
        }
      />
    </View>
  );
};

export default hoc(MyBooking);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: '5%',
    justifyContent: 'space-between',
  },
  list: {
    paddingHorizontal: '5%',
    paddingTop: 10,
  },
});
