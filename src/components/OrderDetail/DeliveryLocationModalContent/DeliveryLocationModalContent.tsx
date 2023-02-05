import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {h1, h5} from 'utils/styles';
import {ic_glasses, ic_pinpoin} from 'assets/icons';
import {iconSize, rowCenter} from 'utils/mixins';
import {theme} from 'utils';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type DataRender = {
  id: number;
  name: string;
  address: string;
  additional_cost?: string;
};

type Props = {
  onPress: (val: DataRender) => void;
};

const data: DataRender[] = [
  {
    id: 1,
    name: 'Pantai Pandawa',
    address: 'Jl. Pandawa 10, Denpasar, Bali',
    additional_cost: 'Rp 10.000',
  },
  {
    id: 2,
    name: 'Cafe Bali',
    address: 'Jl. Pahlawan 30, Denpasar, Bali',
    additional_cost: '',
  },
];

const DeliveryLocationModalContent: React.FC<Props> = ({onPress}) => {
  const renderItem = ({item}: {item: DataRender}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          onPress(item);
        }}>
        <Image source={ic_pinpoin} style={iconSize} />
        <View style={{flexBasis: '75%'}}>
          <Text style={[h1, {marginLeft: 5}]}>{item.name}</Text>
          <Text style={[h5, {marginLeft: 5}]}>{item.address}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={[h5, {marginLeft: 5}]}>Biaya Tambahan : </Text>
            {item.additional_cost ? (
              <View style={styles.additionalCost}>
                <Text style={[h5, {color: '#299B0A', fontSize: 12}]}>
                  {item.additional_cost}
                </Text>
              </View>
            ) : (
              <Text>'-'</Text>
            )}
          </View>
        </View>
        <View style={{flexBasis: '25%'}}>
          <Text style={[h1, {color: theme.colors.navy}]}>Lihat Peta</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[h1, {fontSize: 18}]}>Lokasi Pengantaran</Text>
      <View style={[rowCenter, styles.searchWrapper]}>
        <TextInput style={styles.searchInput} placeholder="Cari" />
        <Image source={ic_glasses} style={iconSize} />
      </View>
      <View style={styles.listContainer}>
        <BottomSheetFlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default DeliveryLocationModalContent;

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
