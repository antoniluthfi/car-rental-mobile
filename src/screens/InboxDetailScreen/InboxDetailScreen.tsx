import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {ic_arrow_left_white} from 'assets/icons';
import appBar from 'components/AppBar/AppBar';
import {notifIcon} from 'components/MyInboxComponent/MyInboxCard/MyInboxCard';
import {useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getInboxDetail } from 'redux/features/inbox/myInboxAPI';
import {inboxState} from 'redux/features/inbox/myInboxSlice';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import { RootStackParamList } from 'types/navigator';
import {rowCenter} from 'utils/mixins';
import {colors, h1, h5} from 'utils/styles';

type InboxDetailRouteProp = RouteProp<RootStackParamList, 'InboxDetail'>;
const InboxDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<InboxDetailRouteProp>();
  const dispatch = useAppDispatch();
  const inbox = useAppSelector(inboxState).detail;

  useEffect(() => {
    dispatch(getInboxDetail(route.params.id))
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
            <Text style={[h1, {color: 'white', marginLeft: 10}]}>My Inbox</Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.detailContainer}>
        {notifIcon(inbox?.type)}
        <View style={{width: '90%'}}>
          <View style={styles.titleContainer}>
            <Text
              style={[
                h1,
                {
                  color:
                    inbox?.type === 'promo-special' ? '#0085FF' : colors.black,
                },
              ]}>
              {inbox?.title}
            </Text>
            <Text style={[h5, {fontSize: 12, lineHeight: 12}]}>
              {inbox?.timestamp}
            </Text>
          </View>

          <Text style={[h5, styles.subtitle]}>{inbox?.subtitle}</Text>
          <Text style={[h5, styles.message]}>{inbox?.message}</Text>
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
