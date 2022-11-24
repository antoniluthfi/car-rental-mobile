import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import hoc from 'components/hoc';
import {useNavigation} from '@react-navigation/native';
import appBar from 'components/AppBar/AppBar';
import {
  ic_arrow_down,
  ic_arrow_left,
  ic_arrow_left_white,
  ic_blue_check,
  ic_care,
  ic_check,
  ic_disable,
  ic_dog,
  ic_driver,
  ic_gas,
  ic_glasses,
  ic_info_blue,
  ic_insurance,
  ic_koper,
  ic_nosmoke,
  ic_park,
  ic_pen,
  ic_pinpoin,
  ic_pinpoin2,
  ic_seat,
  ic_snack,
  ic_time,
  ic_toll,
  ic_transisi,
  ic_uncheck,
} from 'assets/icons';
import {
  boxShadow,
  iconCustomSize,
  iconSize,
  rowCenter,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from 'utils/mixins';
import {h1, h2, h3, h4, h5} from 'utils/styles';
import DropdownFilter from 'components/DropdownFilter/DropdownFilter';
import {img_car_2} from 'assets/images';
import {theme} from 'utils';
import {FONT_SIZE_10, FONT_SIZE_12} from 'utils/typography';
import Carousel from 'react-native-reanimated-carousel';
import Button from 'components/Button';
import {showBSheet} from 'utils/BSheet';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';

const OrderDetailScreen: FC = () => {
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
              Detail Pesanan
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  const methods = {
    handlePengantaran: () => {
      showBSheet({
        content: (
          <View style={{flex: 1, alignItems: 'flex-start', width: '95%'}}>
            <Text style={[h1]}>Lokasi Pengantaran</Text>
            <View style={[rowCenter, styles.searchWrapper]}>
              <TextInput
                style={{width: '95%'}}
                placeholder="Cari berdasarkan Alamat"
              />
              <Image source={ic_glasses} style={iconSize} />
            </View>
            <Text style={[h1, {marginTop: 20}]}>Rekomendasi Tempat</Text>
            <View style={{width: '100%', flex: 1}}>
              <BottomSheetScrollView>
                {[...Array(6).fill(1)].map((x, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[rowCenter, styles.borderBottom]}
                    onPress={methods.handlePengantaran}>
                    <Image source={ic_pinpoin} style={iconSize} />
                    <View>
                      <Text style={[h1, {marginLeft: 5}]}>Cafe Bali</Text>
                      <Text style={[h5, {marginLeft: 5}]}>
                        Jalan Sanur, Denpasar, Bali
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </BottomSheetScrollView>
            </View>
          </View>
        ),
      });
    },
    handlePengembalian: () => {
      showBSheet({
        content: (
          <View style={{flex: 1, alignItems: 'flex-start', width: '95%'}}>
            <Text style={[h1]}>Lokasi Pengembalian</Text>
            <View style={[rowCenter, styles.searchWrapper]}>
              <TextInput
                style={{width: '95%'}}
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
              <BottomSheetScrollView>
                {[...Array(6).fill(1)].map((x, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[rowCenter, styles.borderBottom]}
                    onPress={methods.handlePengantaran}>
                    <Image source={ic_pinpoin} style={iconSize} />
                    <View>
                      <Text style={[h1, {marginLeft: 5}]}>Cafe Bali</Text>
                      <Text style={[h5, {marginLeft: 5}]}>
                        Jalan Sanur, Denpasar, Bali
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </BottomSheetScrollView>
            </View>
          </View>
        ),
      });
    },
    handleDetailPayment: () => {
      showBSheet({
        content: (
          <View style={{flex: 1, alignItems: 'flex-start', width: '95%'}}>
            <Text style={[h1, {fontSize: 20}]}>Detail Pembayaran</Text>

            <View
              style={[
                rowCenter,
                {justifyContent: 'space-between', width: '100%', marginTop: 20},
              ]}>
              <Text style={h1}>Suzuki Ertiga</Text>
              <Text style={h4}>4 Penumpang</Text>
            </View>

            <View
              style={[
                rowCenter,
                {justifyContent: 'space-between', width: '100%', marginTop: 15},
              ]}>
              <Text style={h4}>Tanggal Mulai Sewa</Text>
              <Text style={h4}>01 Juli 2022</Text>
            </View>

            <View
              style={[
                rowCenter,
                {justifyContent: 'space-between', width: '100%', marginTop: 15},
              ]}>
              <Text style={h4}>No. Penerbangan</Text>
              <Text style={h4}>10:00 AM</Text>
            </View>

            <View
              style={[
                rowCenter,
                {justifyContent: 'space-between', width: '100%', marginTop: 20},
              ]}>
              <Text style={h4}>Tanggal Selesai</Text>
              <Text style={h4}>01 Juli 2022</Text>
            </View>

            <View
              style={[
                rowCenter,
                {justifyContent: 'space-between', width: '100%', marginTop: 15},
              ]}>
              <Text style={h4}>Jam Selesai</Text>
              <Text style={h4}>10:00 AM</Text>
            </View>
            <View style={[styles.lineHorizontal, {width: '100%'}]} />

            <Text style={[h1, {marginTop: 20}]}>Biaya Sewa</Text>
            <View
              style={[
                rowCenter,
                {justifyContent: 'space-between', width: '100%', marginTop: 15},
              ]}>
              <Text style={h4}>Harga</Text>
              <Text style={h4}>IDR 600.000 / 3 Hari</Text>
            </View>
            <View style={[styles.lineHorizontal, {width: '100%'}]} />

            <Text style={[h1, {marginTop: 20}]}>Biaya Lainnya</Text>
            <View
              style={[
                rowCenter,
                {justifyContent: 'space-between', width: '100%', marginTop: 15},
              ]}>
              <Text style={h4}>Biaya Layanan</Text>
              <Text style={h4}>IDR 2.000</Text>
            </View>
            <View
              style={[
                rowCenter,
                {justifyContent: 'space-between', width: '100%', marginTop: 15},
              ]}>
              <Text style={h4}>Biaya Asuransi</Text>
              <Text style={h4}>IDR 2.000</Text>
            </View>
            <View style={[styles.lineHorizontal, {width: '100%'}]} />

            <View
              style={[
                rowCenter,
                {justifyContent: 'space-between', width: '100%', marginTop: 15},
              ]}>
              <Text style={[h1, {color: theme.colors.navy}]}>Total Pembayaran</Text>
              <Text style={h1}>IDR 607.000</Text>
            </View>
          </View>
        ),
      });
    },
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          margin: 16,
        }}>
        <ScrollView>
          <View style={{marginTop: 20}}>
            <Text style={[h1]}>Ketentuan Mobil</Text>
            <View style={styles.infoUserWrapper}>
              <Text style={[h1, {fontSize: 12}]}>Kevin Sanjaya</Text>
              <Text style={[h3, {fontSize: 12, marginVertical: 5}]}>
                +62 82123456789
              </Text>
              <Text style={[h3, {fontSize: 12}]}>kevinsanjaya@gmail.com</Text>
            </View>
            <View style={styles.lineHorizontal} />
          </View>

          <View>
            <View style={[rowCenter, {justifyContent: 'space-between'}]}>
              <Text style={h1}>Detail Perjalanan</Text>
              <TouchableOpacity
                style={[rowCenter, {marginTop: 20, marginBottom: 20}]}
                onPress={() => setCheckInfo(prev => !prev)}>
                <Image
                  source={checkInfo ? ic_blue_check : ic_uncheck}
                  style={iconSize}
                />
                <Text style={[h5, {fontSize: 12}]}>
                  {' '}
                  Mengambil Ke Tempat Sewa
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={[h4, {marginTop: 10}]}>Lokasi Pengantaran</Text>
            <TouchableOpacity
              style={[rowCenter, styles.borderBottom]}
              onPress={methods.handlePengantaran}>
              <Image source={ic_pinpoin} style={iconSize} />
              <Text style={[h5, {marginLeft: 5}]}>Pilih Lokasi Anda</Text>
            </TouchableOpacity>

            <Text style={[h4, {marginTop: 20}]}>Lokasi Pengembalian</Text>
            <TouchableOpacity
              style={[rowCenter, styles.borderBottom]}
              onPress={methods.handlePengembalian}>
              <Image source={ic_pinpoin} style={iconSize} />
              <Text style={[h5, {marginLeft: 5}]}>Pilih Lokasi Anda</Text>
            </TouchableOpacity>
          </View>

          <View style={{marginVertical: 20}}>
            <Text style={h1}>Form Permintaan Khusus</Text>
            <View style={styles.formWrapper}>
              <TextInput
                multiline={true}
                placeholder="Tulis yang kamu butuhkan untuk kebutuhan perjalanan mu, contoh (Kursi Bayi, Kursi Roda, etc.)"
                style={{
                  height: 100,
                  paddingRight: 15,
                }}
                maxLength={150}
              />
              <Image
                source={ic_pen}
                style={[
                  iconCustomSize(15),
                  {position: 'absolute', top: 10, right: 10},
                ]}
              />
            </View>
          </View>
          <View style={styles.lineHorizontal} />
        </ScrollView>
      </View>
      <View
        style={[
          boxShadow('#000', {height: 1, width: 1}, 3.27, 0.24),
          styles.bottomView,
        ]}>
        <TouchableOpacity onPress={methods.handleDetailPayment}>
          <Text style={h1}>Total Pembayaran</Text>
          <View style={rowCenter}>
            <Text
              style={[
                h1,
                {color: theme.colors.navy, marginRight: 10, marginBottom: 12},
              ]}>
              IDR 607.000
            </Text>
            <Image
              source={ic_arrow_down}
              style={[iconCustomSize(10), {marginBottom: 12}]}
            />
          </View>
        </TouchableOpacity>
        <Button _theme="navy" title="Lanjutkan Pembayaran" onPress={() => navigation.navigate('PaymentMethod')} />
      </View>
    </>
  );
};

export default hoc(OrderDetailScreen);

const styles = StyleSheet.create({
  infoUserWrapper: {
    backgroundColor: theme.colors.grey7,
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  lineHorizontal: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey6,
    marginTop: 10,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey5,
    paddingVertical: 10,
  },
  searchWrapper: {
    width: '100%',
    backgroundColor: theme.colors.grey7,
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  formWrapper: {
    borderWidth: 1,
    borderColor: theme.colors.grey6,
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  bottomView: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: -40,
    width: '100%',
    padding: 16,
    paddingBottom: 25,
  },
});
