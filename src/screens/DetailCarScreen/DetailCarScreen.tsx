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
  ic_blue_check,
  ic_care,
  ic_check,
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
import {iconSize, rowCenter, WINDOW_HEIGHT, WINDOW_WIDTH} from 'utils/mixins';
import {h1, h2, h3, h4, h5} from 'utils/styles';
import DropdownFilter from 'components/DropdownFilter/DropdownFilter';
import {img_car_2} from 'assets/images';
import {theme} from 'utils';
import {FONT_SIZE_10, FONT_SIZE_12} from 'utils/typography';
import Carousel from 'react-native-reanimated-carousel';
import Button from 'components/Button';

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
const DetailCarScreen: FC = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    filter_car_type: '',
    filter_shit: '',
    filter_koper: '',
  });
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

  return (
    <View
      style={{
        flex: 1,
        margin: 16,
      }}>
      <ScrollView>
        <Carousel
          // loop
          width={WINDOW_WIDTH}
          height={WINDOW_HEIGHT / 4}
          // autoPlay={true}
          data={[...new Array(6).keys()]}
          scrollAnimationDuration={1000}
          onSnapToItem={index => console.log('current index:', index)}
          renderItem={({index}) => (
            <View
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Image source={img_car_2} style={{height: 199, width: 278}} />
            </View>
          )}
        />

        <View style={[rowCenter, styles.info1Wrapper]}>
          <View style={{alignItems: 'center'}}>
            <Image source={ic_seat} style={iconSize} />
            <Text style={[h1, {paddingVertical: 5}]}>Jumlah Kursi</Text>
            <Text style={h3}>4 Kursi</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image source={ic_koper} style={iconSize} />
            <Text style={[h1, {paddingVertical: 5}]}>Detail Koper</Text>
            <Text style={h3}>4 Koper</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image source={ic_transisi} style={iconSize} />
            <Text style={[h1, {paddingVertical: 5}]}>Transmisi</Text>
            <Text style={h3}>Manual</Text>
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <Text style={[h1]}>Ketentuan Mobil</Text>
          <View
            style={[
              rowCenter,
              {flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 5},
            ]}>
            <View style={[rowCenter, {marginBottom: 17}]}>
              <Image source={ic_nosmoke} style={iconSize} />
              <Text style={[h4, {marginLeft: 10}]}>Dilarang Merokok</Text>
            </View>

            <View style={[rowCenter, {marginBottom: 17}]}>
              <Image source={ic_disable} style={iconSize} />
              <Text style={[h4, {marginLeft: 10}]}>Disabilitas Support</Text>
            </View>

            <View style={[rowCenter, {marginBottom: 17}]}>
              <Image source={ic_dog} style={iconSize} />
              <Text style={[h4, {marginLeft: 10}]}>
                Peliharaan Diperbolehkan
              </Text>
            </View>
          </View>
          <View style={styles.lineHorizontal} />
        </View>

        <View style={{marginTop: 20}}>
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

        <View style={{marginTop: 20}}>
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

        <View style={{marginTop: 20}}>
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

        <View style={{marginTop: 20}}>
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
          style={[rowCenter, {marginTop: 20, marginBottom: 20}]}
          onPress={() => setCheckInfo(prev => !prev)}>
          <Image
            source={checkInfo ? ic_blue_check : ic_uncheck}
            style={iconSize}
          />
          <Text style={h5}> Saya menyetujui ketentuan yang berlaku</Text>
        </TouchableOpacity>
      </ScrollView>

      <View
        style={styles.bottomWrapper}>
        <View>
          <Text style={[h4]}>Harga Tarif Mobil</Text>
          <Text style={[h1, {color: theme.colors.navy, fontSize: 15}]}>
            IDR 600.000 <Text style={[h3, {fontSize: 12}]}>/ 3 hari</Text>
          </Text>
        </View>
        <View style={{width: '50%', alignSelf: 'flex-end'}}>
          <Button title="Lanjutkan" onPress={() => {}} _theme="navy" />
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
  }
});
