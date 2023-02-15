import {appDataState} from 'redux/features/appData/appDataSlice';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {h1, h4, h5} from 'utils/styles';
import {ic_glasses, ic_pinpoin, ic_pinpoin2} from 'assets/icons';
import {iconSize, rowCenter} from 'utils/mixins';
import {IGarages} from 'types/global.types';
import {theme} from 'utils';
import {useAppSelector} from 'redux/hooks';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';

type Props = {
  onPress: (val: IGarages) => void;
};

const ReturnLocationModalContent: React.FC<Props> = ({onPress}) => {
  const {t} = useTranslation();
  const garages = useAppSelector(appDataState).garages;

  const renderItem = ({item}: {item: IGarages}) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => onPress(item)}>
        <Image source={ic_pinpoin} style={iconSize} />
        <View>
          <Text style={[h1, {marginLeft: 5}]}>{item.name}</Text>
          <Text style={[h5, {marginLeft: 5}]}>{item.address_details}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[h1, {fontSize: 18}]}>{t('detail_order.tripDetail.returnLocation')}</Text>
      <View style={[rowCenter, styles.searchWrapper]}>
        <TextInput
          style={{width: '95%', padding: 0, margin: 0}}
          placeholder="Cari berdasarkan Alamat"
        />
        <Image source={ic_glasses} style={iconSize} />
      </View>
      <View style={[rowCenter, {marginTop: 20}]}>
        <Image source={ic_pinpoin2} style={iconSize} />
        <Text style={[h4]}> Kembalikan ditempat yang sama</Text>
      </View>
      <Text style={[h1, {marginTop: 20}]}>Rekomendasi Tempat</Text>
      <View style={{width: '100%', flex: 1}}>
        <View style={styles.listContainer}>
          <BottomSheetFlatList
            data={garages}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  );
};

export default ReturnLocationModalContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    width: '95%',
  },
  searchInput: {width: '95%', padding: 0, margin: 0},
  searchWrapper: {
    width: '100%',
    backgroundColor: theme.colors.grey7,
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  listContainer: {width: '100%', flex: 1},
  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey5,
    paddingVertical: 10,
  },
  additionalCost: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#DBFFDE',
    borderRadius: 50,
  },
});
