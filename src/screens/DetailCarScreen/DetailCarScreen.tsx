import {URL_IMAGE} from '@env';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
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
import appBar from 'components/AppBar/AppBar';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox/Checkbox';
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
import {getVehiclesById} from 'redux/features/vehicles/vehiclesAPI';
import {vehiclesState} from 'redux/features/vehicles/vehiclesSlice';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {RootStackParamList} from 'types/navigator';
import {theme} from 'utils';
import {showBSheet} from 'utils/BSheet';
import {currencyFormat} from 'utils/currencyFormat';
import {iconSize, rowCenter, WINDOW_WIDTH} from 'utils/mixins';
import {h1, h3, h4, h5} from 'utils/styles';
import useLangSelector from 'utils/useLangSelector';
const t_priceTerm = useLangSelector().priceTerm;

type IDailyRules = {title: string; list: string[]};

const DATA_INCLUDE_PRICES = [
  {
    desc: t_priceTerm.driver,
    icon: ic_driver,
  },
  {
    desc: t_priceTerm.additional_needs,
    icon: ic_care,
  },
  {
    desc: t_priceTerm.parking,
    icon: ic_park,
  },
  {
    desc: t_priceTerm.fuel,
    icon: ic_gas,
  },
  {
    desc: t_priceTerm.snacks,
    icon: ic_snack,
  },
  {
    desc: t_priceTerm.toll,
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
  const t = useLangSelector().carDetail;
  const t_dailyRules = useLangSelector().dailyRules;
  const t_global = useLangSelector().global;

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
              {t.carDetail}
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation, t]);

  useEffect(() => {
    dispatch(getVehiclesById(route.params.vehicle_id));
  }, []);

  const methods = {
    showRules: () => {
      showBSheet({
        content: (
          <View style={{flex: 1, alignItems: 'flex-start', width: '95%'}}>
            <Text style={[h1]}>Rules Penyewaan</Text>
            <View style={[rowCenter, {marginTop: 10}]}>
              <Image source={ic_info_blue} style={iconSize} />
              <Text style={[h1, {color: theme.colors.blue}]}>
                {' '}
                {t.important}
              </Text>
            </View>
            <View style={{width: '100%', flex: 1}}>
              <BottomSheetScrollView>
                <View style={{marginTop: 20, margin: 16}}>
                  {Object.keys(t_dailyRules).map((x, i) => (
                    <View key={i}>
                      <Text style={[h1, {marginTop: 10}]}>
                        {t_dailyRules[x as keyof typeof t_dailyRules].title}
                        <View style={{marginLeft: 20, marginTop: 10}}>
                          {t_dailyRules[
                            x as keyof typeof t_dailyRules
                          ].list.map((x, i) => (
                            <View
                              key={i}
                              style={{flexDirection: 'row', marginBottom: 5}}>
                              <Text>• </Text>
                              <Text style={[h4, {lineHeight: 24}]}>{x}</Text>
                            </View>
                          ))}
                        </View>
                      </Text>
                    </View>
                  ))}
                </View>
              </BottomSheetScrollView>
            </View>
          </View>
        ),
      });
    },
  };

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
            <Text style={[h1, {paddingVertical: 5}]}>{t.seatCapacity}</Text>
            <Text style={h3}>
              {vehicle.max_passanger} {t.seat}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image source={ic_koper} style={iconSize} />
            <Text style={[h1, {paddingVertical: 5}]}>{t.bagDetail}</Text>
            <Text style={h3}>
              {vehicle.max_suitcase} {t.bag}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image source={ic_transisi} style={iconSize} />
            <Text style={[h1, {paddingVertical: 5}]}>{t.transmision}</Text>
            <Text style={h3}>Manual</Text>
          </View>
        </View>

        <View style={{marginTop: 20, margin: 16}}>
          <Text style={[h1]}>{t.car_conditions}</Text>
          <View
            style={[
              rowCenter,
              {flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 5},
            ]}>
            {vehicle.smoke_allowed && (
              <View style={[rowCenter, {marginBottom: 17}]}>
                <Image source={ic_nosmoke} style={iconSize} />
                <Text style={[h4, {marginLeft: 10}]}>{t.smoking}</Text>
              </View>
            )}

            {vehicle.disablility_allowed && (
              <View style={[rowCenter, {marginBottom: 17}]}>
                <Image source={ic_disable} style={iconSize} />
                <Text style={[h4, {marginLeft: 10}]}>{t.disability}</Text>
              </View>
            )}

            {vehicle.pet_allowed && (
              <View style={[rowCenter, {marginBottom: 17}]}>
                <Image source={ic_dog} style={iconSize} />
                <Text style={[h4, {marginLeft: 10}]}>{t.pet}</Text>
              </View>
            )}
          </View>
          <View style={styles.lineHorizontal} />
        </View>

        <View style={{marginTop: 20, margin: 16}}>
          <Text style={[h1]}>{t.priceTerm}</Text>
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
            <Text style={[h1, {color: theme.colors.blue}]}> {t.important}</Text>
          </View>
          <Text style={[h1, {marginTop: 10}]}>
            {t_dailyRules.sebelum_pengambilan.title}
          </Text>
          <View style={{marginLeft: 20, marginTop: 10}}>
            {t_dailyRules.sebelum_pengambilan.list.map((x, i) => (
              <View key={i} style={{flexDirection: 'row', marginBottom: 5}}>
                <Text>• </Text>
                <Text style={[h4, {lineHeight: 24}]}>{x}</Text>
              </View>
            ))}
          </View>
          <Text
            style={[h4, {color: theme.colors.blue, alignSelf: 'flex-end'}]}
            onPress={methods.showRules}>
            {t.learnMore}
          </Text>
          <View style={styles.lineHorizontal} />
        </View>

        <View style={{marginTop: 20, margin: 16}}>
          <Text style={[h1, {marginTop: 10}]}>
            {t.rentalRequirement}
          </Text>
          <View style={{marginLeft: 20, marginTop: 10}}>
            {[...t.policies, ...t.requirements].map((x, i) => (
              <View key={i} style={{flexDirection: 'row', marginBottom: 5}}>
                <Text>• </Text>
                <Text style={[h4, {lineHeight: 24}]}>{x}</Text>
              </View>
            ))}
          </View>
          <View style={styles.lineHorizontal} />
        </View>

        {/* <View style={{marginTop: 20, margin: 16}}>
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
        </View> */}
        <Checkbox
          label={t.agreeState}
          onChange={val => setCheckInfo(val)}
          checked={checkInfo}
        />
      </ScrollView>

      <View style={styles.bottomWrapper}>
        <View>
          <Text style={[h4]}>{t.carPrice}</Text>
          <Text style={[h1, {color: theme.colors.navy, fontSize: 15}]}>
            {currencyFormat(vehicle.price)}{' '}
            <Text style={[h3, {fontSize: 12}]}>{t.perDay}</Text>
          </Text>
        </View>
        <View style={{flexBasis: '50%', alignSelf: 'flex-end'}}>
          <Button
            title={t_global.button.next}
            onPress={() => navigation.navigate('OrderDetail')}
            _theme="navy"
            disabled={!checkInfo}
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
