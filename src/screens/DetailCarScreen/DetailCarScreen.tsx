import appBar from 'components/AppBar/AppBar';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox/Checkbox';
import CustomCarousel from 'components/CustomCarousel/CustomCarousel';
import hoc from 'components/hoc';
import React, {FC, useEffect, useState} from 'react';
import {appDataState} from 'redux/features/appData/appDataSlice';
import {authState, logout} from 'redux/features/auth/authSlice';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {currencyFormat} from 'utils/currencyFormat';
import {getVehiclesById} from 'redux/features/vehicles/vehiclesAPI';
import {h1, h3, h4, h5} from 'utils/styles';
import {iconSize, rowCenter, WINDOW_WIDTH} from 'utils/mixins';
import {RootStackParamList} from 'types/navigator';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {showBSheet} from 'utils/BSheet';
import {showToast} from 'utils/Toast';
import {theme} from 'utils';
import {URL_IMAGE} from '@env';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {useTranslation} from 'react-i18next';
import {vehiclesState} from 'redux/features/vehicles/vehiclesSlice';
import {
  ic_arrow_left_white,
  ic_care,
  ic_disable,
  ic_dog,
  ic_driver,
  ic_gas,
  ic_info_blue,
  ic_koper,
  ic_nosmoke,
  ic_park,
  ic_seat,
  ic_transisi,
} from 'assets/icons';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type IDailyRules = {title: string; list: string[]};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'DetailCar'>;
const DetailCarScreen: FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ProfileScreenRouteProp>();
  const dispatch = useAppDispatch();
  const vehicle = useAppSelector(vehiclesState).vehicleById;
  const auth = useAppSelector(authState).auth;
  const formDaily = useAppSelector(appDataState).formDaily;

  const {t} = useTranslation();

  const DATA_INCLUDE_PRICES = [
    {
      desc: t('priceTerm.handSanitizer'),
      icon: ic_driver,
    },
    {
      desc: t('priceTerm.mask'),
      icon: ic_care,
    },
    {
      desc: t('priceTerm.tissue'),
      icon: ic_park,
    },
    {
      desc: t('priceTerm.mineralWater'),
      icon: ic_gas,
    },
  ];

  const dailyRules = [
    {
      desc: t('dailyRules.sebelum_pengambilan.title'),
      list: [
        t('dailyRules.sebelum_pengambilan.list_1'),
        t('dailyRules.sebelum_pengambilan.list_2'),
        t('dailyRules.sebelum_pengambilan.list_3'),
      ],
    },
    {
      desc: t('dailyRules.saat_pengambilan.title'),
      list: [
        t('dailyRules.saat_pengambilan.list_1'),
        t('dailyRules.saat_pengambilan.list_2'),
        t('dailyRules.saat_pengambilan.list_3'),
        t('dailyRules.saat_pengambilan.list_4'),
      ],
    },
    {
      desc: t('dailyRules.penggunaan.title'),
      list: [
        t('dailyRules.penggunaan.list_1'),
        t('dailyRules.penggunaan.list_2'),
        t('dailyRules.penggunaan.list_3'),
        t('dailyRules.penggunaan.list_4'),
        t('dailyRules.penggunaan.list_5'),
        t('dailyRules.penggunaan.list_6'),
      ],
    },
    {
      desc: t('dailyRules.overtime.title'),
      list: [
        t('dailyRules.overtime.list_1'),
        t('dailyRules.overtime.list_2'),
        t('dailyRules.overtime.list_3'),
      ],
    },
    {
      desc: t('dailyRules.asuransi.title'),
      list: [
        t('dailyRules.asuransi.list_1'),
        t('dailyRules.asuransi.list_2'),
        t('dailyRules.asuransi.list_3'),
        t('dailyRules.asuransi.list_4'),
      ],
    },
    {
      desc: t('dailyRules.refund.title'),
      list: [
        t('dailyRules.refund.list_1'),
        t('dailyRules.refund.list_2'),
        t('dailyRules.refund.list_3'),
        t('dailyRules.refund.list_4'),
        t('dailyRules.refund.list_5'),
      ],
    },
  ];

  const policies = [
    t('carDetail.policies.list_1'),
    t('carDetail.policies.list_2'),
    t('carDetail.policies.list_3'),
    t('carDetail.policies.list_4'),
  ];

  const requirements = [
    t('carDetail.requirements.list_1'),
    t('carDetail.requirements.list_2'),
    t('carDetail.requirements.list_3'),
    t('carDetail.requirements.list_4'),
  ];

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
              {t('carDetail.carDetail')}
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
                {t('carDetail.important')}
              </Text>
            </View>
            <View style={{width: '100%', flex: 1}}>
              <BottomSheetScrollView>
                <View style={{paddingHorizontal: '5%'}}>
                  {dailyRules.map((x, i) => (
                    <View key={i}>
                      <Text style={[h1, {marginTop: 10}]}>
                        {dailyRules[x as any].desc}
                      </Text>

                      <View style={{marginTop: 10, marginLeft: 5}}>
                        {dailyRules[x as any].list.map((desc, j) => (
                          <View
                            key={j}
                            style={{flexDirection: 'row', marginBottom: 5}}>
                            <Text>• </Text>
                            <Text style={[h4, {lineHeight: 24}]}>{desc}</Text>
                          </View>
                        ))}
                      </View>
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
          paginationSize={7}
          paginationPosition={-15}
          progressValueSpace={30}
          renderCarouselTitle={
            <View style={styles.carouselTitleContainer}>
              <Text style={{fontWeight: 'bold'}}>{vehicle.name}</Text>
            </View>
          }
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
            <Text style={[h1, {paddingVertical: 5}]}>
              {t('carDetail.seatCapacity')}
            </Text>
            <Text style={h3}>
              {vehicle.max_passanger} {t('carDetail.seat')}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image source={ic_koper} style={iconSize} />
            <Text style={[h1, {paddingVertical: 5}]}>
              {t('carDetail.bagDetail')}
            </Text>
            <Text style={h3}>
              {vehicle.max_suitcase} {t('carDetail.bag')}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image source={ic_transisi} style={iconSize} />
            <Text style={[h1, {paddingVertical: 5}]}>
              {t('carDetail.transmision')}
            </Text>
            <Text style={h3}>Manual</Text>
          </View>
        </View>

        <View style={{marginTop: 20, margin: 16}}>
          <Text style={[h1]}>{t('carDetail.car_conditions')}</Text>
          <View
            style={[
              rowCenter,
              {flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 5},
            ]}>
            {vehicle.smoke_allowed && (
              <View style={[rowCenter, {marginBottom: 17}]}>
                <Image source={ic_nosmoke} style={iconSize} />
                <Text style={[h4, {marginLeft: 10}]}>
                  {t('carDetail.smoking')}
                </Text>
              </View>
            )}

            {vehicle.disablility_allowed && (
              <View style={[rowCenter, {marginBottom: 17}]}>
                <Image source={ic_disable} style={iconSize} />
                <Text style={[h4, {marginLeft: 10}]}>
                  {t('carDetail.disability')}
                </Text>
              </View>
            )}

            {vehicle.pet_allowed && (
              <View style={[rowCenter, {marginBottom: 17}]}>
                <Image source={ic_dog} style={iconSize} />
                <Text style={[h4, {marginLeft: 10}]}>{t('carDetail.pet')}</Text>
              </View>
            )}
          </View>
          <View style={styles.lineHorizontal} />
        </View>

        <View style={{marginTop: 20, margin: 16}}>
          <Text style={[h1]}>{t('carDetail.priceTerm')}</Text>
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
            <Text style={[h1, {color: theme.colors.blue}]}>
              {' '}
              {t('carDetail.important')}
            </Text>
          </View>
          <Text style={[h1, {marginTop: 10}]}>
            {t('dailyRules.sebelum_pengambilan.title')}
          </Text>
          <View style={{marginLeft: 20, marginTop: 10}}>
            {dailyRules[0].list.map((x, i) => (
              <View key={i} style={{flexDirection: 'row', marginBottom: 5}}>
                <Text>• </Text>
                <Text style={[h4, {lineHeight: 24}]}>{x}</Text>
              </View>
            ))}
          </View>
          <Text
            style={[h4, {color: theme.colors.blue, alignSelf: 'flex-end'}]}
            onPress={methods.showRules}>
            {t('carDetail.learnMore')}
          </Text>
          <View style={styles.lineHorizontal} />
        </View>

        <View style={{marginTop: 20, margin: 16}}>
          <Text style={[h1, {marginTop: 10}]}>
            {t('carDetail.rentalRequirement')}
          </Text>
          <View style={{marginLeft: 20, marginTop: 10}}>
            {[...policies, ...requirements].map((x, i) => (
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
          label={t('myBooking.agreeState')}
          onChange={val => setCheckInfo(val)}
          checked={checkInfo}
        />
      </ScrollView>

      <View style={styles.bottomWrapper}>
        <View>
          <Text style={[h4]}>{t('myBooking.carPrice')}</Text>
          <Text style={[h1, {color: theme.colors.navy, fontSize: 15}]}>
            {currencyFormat(vehicle.price - (vehicle.discount_price || 0))}{' '}
            <Text style={[h3, {fontSize: 12}]}>{t('myBooking.perDay')}</Text>
          </Text>
          {vehicle.discount_price > 0 && (
            <Text style={[h5, styles.hargaCoret]}>
              {currencyFormat(vehicle.price)}
            </Text>
          )}
        </View>
        <View style={{flexBasis: '50%', alignSelf: 'flex-end'}}>
          <Button
            title={t('global.button.next')}
            onPress={() => {
              console.log(auth);
              if (!auth?.access_token) {
                showToast({
                  message: 'Please Login first to continue!',
                  type: 'error',
                  title: 'Error',
                });
                dispatch(logout());
                return;
              }
              if (!formDaily.start_booking_date) {
                navigation.goBack();
                return;
              }
              navigation.navigate('OrderDetail');
            }}
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
  carouselTitleContainer: {
    padding: 10,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 20,
    top: 20,
  },
  hargaCoret: {
    textDecorationLine: 'line-through',
    textDecorationColor: 'orange',
    color: theme.colors.grey4,
    marginTop: 6,
  },
});
