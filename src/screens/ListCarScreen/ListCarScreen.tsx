import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import hoc from 'components/hoc';
import {useNavigation} from '@react-navigation/native';
import appBar from 'components/AppBar/AppBar';
import {
  ic_arrow_left,
  ic_arrow_left_white,
  ic_disable,
  ic_dog,
  ic_koper,
  ic_nosmoke,
  ic_seat,
} from 'assets/icons';
import {iconSize, rowCenter} from 'utils/mixins';
import {h1, h2, h3, h4, h5} from 'utils/styles';
import DropdownFilter from 'components/DropdownFilter/DropdownFilter';
import {img_car_2} from 'assets/images';
import {theme} from 'utils';
import {FONT_SIZE_10, FONT_SIZE_12} from 'utils/typography';

const ListCarScreen: FC = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    filter_car_type: '',
    filter_shit: '',
    filter_koper: '',
  });

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
              Pilih Mobil Anda
            </Text>
          </TouchableOpacity>
        ),
        trailing: (
          <Text style={[h5, {color: 'white', marginRight: 16}]}>
            Ubah Pencarian
          </Text>
        ),
      }),
    );
  }, [navigation]);

  const renderItem = ({item, index}: any) => (
    <TouchableOpacity style={[rowCenter, styles.cardWrapper]} onPress={()=> navigation.navigate('DetailCar', {carId: 1})}>
      <Image
        source={img_car_2}
        style={{
          height: 86,
          width: 120,
        }}
      />
      <View style={{width: '60%'}}>
        <View style={[rowCenter, {justifyContent: 'space-between'}]}>
          <Text style={[h1]}>Suzuki Ertiga</Text>
          <View style={styles.machineWrapper}>
            <Text
              style={[h3, {color: theme.colors.navy, fontSize: FONT_SIZE_12}]}>
              Manual
            </Text>
          </View>
        </View>

        <View style={[rowCenter, {justifyContent: 'space-between', marginTop: 10}]}>
          <View style={[rowCenter, {}]}>
            <View style={[rowCenter]}>
              <View style={[rowCenter]}>
                <Image source={ic_seat} style={iconSize} />
                <Text style={[h2, {marginLeft: 5}]}>4</Text>
              </View>
            </View>
            <View style={[rowCenter, styles.wrapperLineVertical]}>
              <Image source={ic_koper} style={iconSize} />
              <Text style={[h2, {marginLeft: 5}]}>4</Text>
            </View>
          </View>

          <View style={[rowCenter, {width: '40%', justifyContent: 'space-between'}]}>
            <Image source={ic_nosmoke} style={iconSize} />
            <Image source={ic_dog} style={iconSize} />
            <Image source={ic_disable} style={iconSize} />
          </View>
        </View>

        <View style={{marginTop: 10}}>
          <Text style={[h4, {fontSize: 12}]}>Harga Tarif Mobil</Text>
          <Text style={[h1, {color: theme.colors.blue, marginTop: 5}]}>IDR 600.000 <Text style={[h4]}>/ 1 Hari</Text></Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View
      style={{
        flex: 1,
        margin: 16,
      }}>
      <ScrollView horizontal style={{maxHeight: 50}}>
        <DropdownFilter
          data={[
            {name: 'Daihatsu'},
            {name: 'Honda'},
            {name: 'Suzuki'},
            {name: 'Daihatsu'},
            {name: 'Honda'},
            {name: 'Suzuki'},
            {name: 'Daihatsu'},
            {name: 'Honda'},
            {name: 'Suzuki'},
          ]}
          label={'Merek Mobil'}
          onSelect={v => setForm({...form, filter_car_type: v.name})}
          selected={form.filter_car_type}
        />
        <DropdownFilter
          data={[{name: '4'}, {name: '5'}, {name: '6'}]}
          label={'Kursi'}
          onSelect={v => setForm({...form, filter_shit: v.name})}
          selected={form.filter_shit}
        />
        <DropdownFilter
          data={[{name: '1'}, {name: '2'}, {name: '3'}]}
          label={'Koper'}
          onSelect={v => setForm({...form, filter_koper: v.name})}
          selected={form.filter_koper}
        />
      </ScrollView>
      <FlatList data={[1, 2]} renderItem={renderItem} />
    </View>
  );
};

export default hoc(ListCarScreen);

const styles = StyleSheet.create({
  cardWrapper: {
    padding: 10,
    borderWidth: 1,
    borderColor: theme.colors.grey4,
    marginBottom: 20,
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  machineWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: theme.colors.grey6,
    borderRadius: 10,
  },
  wrapperLineVertical: {
    marginLeft: 5,
    borderRightColor: theme.colors.grey5,
    borderRightWidth: 1,
    paddingRight: 10,
  },
});
