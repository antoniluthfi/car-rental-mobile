import appBar from 'components/AppBar/AppBar';
import {colors, h1, h5} from 'utils/styles';
import {getInboxDetail} from 'redux/features/inbox/myInboxAPI';
import {ic_arrow_left_white} from 'assets/icons';
import {inboxState} from 'redux/features/inbox/myInboxSlice';
import {notifIcon} from 'components/MyInboxComponent/MyInboxCard/MyInboxCard';
import {RootStackParamList} from 'types/navigator';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {rowCenter} from 'utils/mixins';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type InboxDetailRouteProp = RouteProp<RootStackParamList, 'InboxDetail'>;
const InboxDetailScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const route = useRoute<InboxDetailRouteProp>();
  const dispatch = useAppDispatch();
  const inbox = useAppSelector(inboxState).detail;

  useEffect(() => {
    dispatch(getInboxDetail(route.params.id));
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.detailContainer}>
        {/* {notifIcon(inbox?.type)} */}
        {notifIcon('promo-special')}
        <View style={{width: '90%'}}>
          <View style={styles.titleContainer}>
            {/* <Text
              style={[
                h1,
                {
                  color:
                    inbox?.type === 'promo-special' ? '#0085FF' : colors.black,
                },
              ]}>
              {inbox?.title}
            </Text> */}
            <Text
              style={[
                h1,
                {
                  color:
                    inbox?.type === 'promo-special' ? '#0085FF' : colors.black,
                },
              ]}>
              Promo Akhir Tahun
            </Text>
            {/* <Text style={[h5, {fontSize: 12, lineHeight: 12}]}>
              {inbox?.timestamp}
            </Text> */}
            <Text style={[h5, {fontSize: 12, lineHeight: 12}]}>
              01 July, 2022, 10:00
            </Text>
          </View>

          {/* <Text style={[h5, styles.subtitle]}>{inbox?.subtitle}</Text> */}
          <Text style={[h5, styles.subtitle]}>Promo Special</Text>
          {/* <Text style={[h5, styles.message]}>{inbox?.message}</Text> */}
          <Text style={[h5, styles.message]}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default InboxDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: '5%',
    flexGrow: 1,
  },
  detailContainer: {
    flexDirection: 'row',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 15,
    color: colors.gray400,
    marginBottom: 8,
  },
  message: {fontSize: 12, lineHeight: 18, marginBottom: 15},
});
