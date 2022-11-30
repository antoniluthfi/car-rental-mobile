import { URL_IMAGE } from '@env';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  ic_arrow_left_white,
  ic_blue_check,
  ic_care,
  ic_disable,
  ic_dog,
  ic_driver,
  ic_gas,
  ic_info_blue,
  ic_insurance,
  ic_koper,
  ic_nosmoke,
  ic_park,
  ic_seat,
  ic_snack,
  ic_time,
  ic_toll,
  ic_transisi,
  ic_uncheck,
} from 'assets/icons';
import {img_car_2} from 'assets/images';
import appBar from 'components/AppBar/AppBar';
import Button from 'components/Button';
import CustomCarousel from 'components/CustomCarousel/CustomCarousel';
import hoc from 'components/hoc';
import React, {FC, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getVehiclesById } from 'redux/features/vehicles/vehiclesAPI';
import { vehiclesState } from 'redux/features/vehicles/vehiclesSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { RootStackParamList } from 'types/navigator';
import {theme} from 'utils';
import {iconSize, rowCenter, WINDOW_WIDTH} from 'utils/mixins';
import {h1, h3, h4, h5} from 'utils/styles';

const DATA_INCLUDE_PRICES = [
  {
    desc: 'Pengemudi',
    icon: ic_driver,
  },
  {
    desc: 'Kebutuhan Tambahan',
    icon: ic_care,
  },
  {
    desc: 'Parkir',
    icon: ic_park,
  },
  {
    desc: 'BBM',
    icon: ic_gas,
  },
  {
    desc: 'Snacks',
    icon: ic_snack,
  },
  {
    desc: 'Toll',
    icon: ic_toll,
  },
];
const INFO_BEFORE_PICKUP = [
  'Penyewa harus membagikan kepada penyedia foto KTP/paspor mereka.',
  'Penyewa harus membagikan kepada penyedia foto SIM A mereka.',
  'Penyewa harus membagikan kepada penyedia foto kartu kredit mereka.',
  'Penyewa harus membagikan kepada penyedia salinan bukti pekerjaan mereka, seperti NPWP, kartu identitas perusahaan, surat keterangan kerja, Surat Izin Usaha Perdagangan, Akta Pendirian, atau Tanda Daftar Perusahaan.',
  'Penyewa yang tidak memiliki bukti pekerjaan dapat menggunakan bukti pekerjaan milik anggota keluarga selama penyewa bisa menunjukkan ikatan keluarganya dalam bentuk kartu keluarga atau surat nikah.',
];
const INFO_RENT = [
  'KTP/paspor',
  'Kartu Keluarga',
  'Survei Rumah, Kantor, atau Hotel',
  'Deposit senilai 500K',
  'SIM A/SIM Internasional',
  'Lainnya (jika penyedia membutuhkan verifikasi tambahan)',
];
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'DetailCar'>;
const DetailCarScreen: FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ProfileScreenRouteProp>();
  const dispatch = useAppDispatch();
  const vehicle = useAppSelector(vehiclesState).vehicleById;
  
  const [checkInfo, setCheckInfo] = useState(false);
  

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
              Detail Mobil
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  useEffect(() => {
    dispatch(getVehiclesById(route.params.vehicle_id));
  }, []);
  

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ScrollView>
        <CustomCarousel
          data={vehicle.photo}
          carouselTitle={vehicle.name}
          renderItem={({item, index}) => (
            <View
              style={{
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Image
                source={{uri: URL_IMAGE + item?.name}}
                style={{height: 250, width: WINDOW_WIDTH}}
              />
            </View>
          )}
        />

        <View style={[rowCenter, styles.info1Wrapper]}>
          <View style={{alignItems: 'center'}}>
            <Image source={ic_seat} style={iconSize} />
            <Text style={[h1, {paddingVertical: 5}]}>Jumlah Kursi</Text>
            <Text style={h3}>{vehicle.max_passanger} Kursi</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image source={ic_koper} style={iconSize} />
            <Text style={[h1, {paddingVertical: 5}]}>Detail Koper</Text>
            <Text style={h3}>{vehicle.max_suitcase} Koper</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image source={ic_transisi} style={iconSize} />
            <Text style={[h1, {paddingVertical: 5}]}>Transmisi</Text>
            <Text style={h3}>Manual</Text>
          </View>
        </View>

        <View style={{marginTop: 20, margin: 16}}>
          <Text style={[h1]}>Ketentuan Mobil</Text>
          <View
            style={[
              rowCenter,
              {flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 5},
            ]}>
            {vehicle.smoke_allowed && <View style={[rowCenter, {marginBottom: 17}]}>
              <Image source={ic_nosmoke} style={iconSize} />
              <Text style={[h4, {marginLeft: 10}]}>Dilarang Merokok</Text>
            </View>}

            {vehicle.disablility_allowed && <View style={[rowCenter, {marginBottom: 17}]}>
              <Image source={ic_disable} style={iconSize} />
              <Text style={[h4, {marginLeft: 10}]}>Disabilitas Support</Text>
            </View>}

            {vehicle.pet_allowed && <View style={[rowCenter, {marginBottom: 17}]}>
              <Image source={ic_dog} style={iconSize} />
              <Text style={[h4, {marginLeft: 10}]}>
                Peliharaan Diperbolehkan
              </Text>
            </View>}
          </View>
          <View style={styles.lineHorizontal} />
        </View>

        <View style={{marginTop: 20, margin: 16}}>
          <Text style={[h1]}>Harga Termasuk</Text>
          <View
            style={[
              rowCenter,
              {flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 5},
            ]}>
            {DATA_INCLUDE_PRICES.map((x, i) => (
              <View
                style={[rowCenter, {marginBottom: 17, width: '50%'}]}
                key={i}>
                <Image source={x.icon} style={iconSize} />
                <Text style={[h4, {marginLeft: 10}]}>{x.desc}</Text>
              </View>
            ))}
          </View>
          <View style={styles.lineHorizontal} />
        </View>

        <View style={{marginTop: 20, margin: 16}}>
          <View style={rowCenter}>
            <Image source={ic_info_blue} style={iconSize} />
            <Text style={[h1, {color: theme.colors.blue}]}>Penting</Text>
          </View>
          <Text style={[h1, {marginTop: 10}]}>Sebelum Pengambilan</Text>
          <View style={{marginLeft: 20, marginTop: 10}}>
            {INFO_BEFORE_PICKUP.map((x, i) => (
              <View key={i} style={{flexDirection: 'row', marginBottom: 5}}>
                <Text>• </Text>
                <Text style={[h4, {lineHeight: 24}]}>{x}</Text>
              </View>
            ))}
          </View>
          <View style={styles.lineHorizontal} />
        </View>

        <View style={{marginTop: 20, margin: 16}}>
          <Text style={[h1, {marginTop: 10}]}>
            Syarat Kelengkapan Penyewaan
          </Text>
          <View style={{marginLeft: 20, marginTop: 10}}>
            {INFO_RENT.map((x, i) => (
              <View key={i} style={{flexDirection: 'row', marginBottom: 5}}>
                <Text>• </Text>
                <Text style={[h4, {lineHeight: 24}]}>{x}</Text>
              </View>
            ))}
          </View>
          <View style={styles.lineHorizontal} />
        </View>

        <View style={{marginTop: 20, margin: 16}}>
          <Text style={[h1]}>Info Lainnya</Text>
          <View
            style={[
              // rowCenter,
              {marginTop: 17},
            ]}>
            <View style={[rowCenter, {marginBottom: 17}]}>
              <Image source={ic_gas} style={iconSize} />
              <Text style={[h1, {marginLeft: 10}]}>
                Kembalikan bahan bakar seperti semula
              </Text>
            </View>

            <View style={[rowCenter, {marginBottom: 17}]}>
              <Image source={ic_time} style={iconSize} />
              <Text style={[h1, {marginLeft: 10}]}>
                Penggunaan hingga 24 jam per hari rental
              </Text>
            </View>

            <View style={[rowCenter, {marginBottom: 17}]}>
              <Image source={ic_insurance} style={iconSize} />
              <Text style={[h1, {marginLeft: 10}]}>Asuransi Mobil</Text>
            </View>
          </View>
          <View style={styles.lineHorizontal} />
        </View>
        <TouchableOpacity
          style={[rowCenter, {marginTop: 20, marginBottom: 20, margin: 16}]}
          onPress={() => setCheckInfo(prev => !prev)}>
          <Image
            source={checkInfo ? ic_blue_check : ic_uncheck}
            style={iconSize}
          />
          <Text style={h5}> Saya menyetujui ketentuan yang berlaku</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomWrapper}>
        <View>
          <Text style={[h4]}>Harga Tarif Mobil</Text>
          <Text style={[h1, {color: theme.colors.navy, fontSize: 15}]}>
            IDR {(vehicle.price)} <Text style={[h3, {fontSize: 12}]}>/ 1 hari</Text>
          </Text>
        </View>
        <View style={{flexBasis: '50%', alignSelf: 'flex-end'}}>
          <Button
            title="Lanjutkan"
            onPress={() => navigation.navigate('OrderDetail')}
            _theme="navy"
          />
        </View>
      </View>
    </View>
  );
};

export default hoc(DetailCarScreen);

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
  info1Wrapper: {
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: theme.colors.grey5,
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    margin: 16,
  },
  lineHorizontal: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey6,
    marginTop: 10,
  },
  bottomWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    justifyContent: 'space-between',
    padding: 16,
  },
});
