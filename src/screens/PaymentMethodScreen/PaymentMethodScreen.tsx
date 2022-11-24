import {useNavigation} from '@react-navigation/native';
import {
  ic_american_express,
  ic_arrow_left_white,
  ic_arrow_right,
  ic_bca,
  ic_confirmation,
  ic_dana,
  ic_gopay,
  ic_jcb,
  ic_mandiri,
  ic_master_card,
  ic_ovo,
  ic_visa,
} from 'assets/icons';
import appBar from 'components/AppBar/AppBar';
import Button from 'components/Button';
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
import {theme} from 'utils';
import {showBSheet} from 'utils/BSheet';
import {iconCustomSize, iconSize, rowCenter, WINDOW_WIDTH} from 'utils/mixins';
import {h1, h4} from 'utils/styles';

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
              Pilih Metode Pembayaran
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  const methods = {
    handleConfirmation: () => {
      showBSheet({
        content: (
          <View
            style={{
              width: WINDOW_WIDTH,
              flex: 1,
              alignItems: 'center',
              margin: 16,
            }}>
            <Image
              source={ic_confirmation}
              style={iconCustomSize(200)}
              resizeMode={'contain'}
            />
            <Text>Apakah anda yakin melanjutkan Pembayaran ini?</Text>
            <View style={{width: '95%', margin: 16}}>
              <Button
                _theme="navy"
                title="Iya, Lanjutkan"
                onPress={() => {}}
                styleWrapper={{marginBottom: 20}}
              />
              <Button _theme="white" title="Kembali" onPress={() => {}} />
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
        }}>
        <ScrollView>
          <View style={{margin: 16}}>
            <Text style={h1}>Pilih Metode Pembayaran</Text>
            <Text style={[h1, {fontSize: 14, marginTop: 25}]}>
              Card Payment
            </Text>

            <TouchableOpacity
              style={[
                rowCenter,
                {justifyContent: 'space-between', marginTop: 14},
              ]}
              onPress={methods.handleConfirmation}>
              <Text style={h4}>Kartu Kredit / Debit</Text>

              <View
                style={[
                  rowCenter,
                  {width: '40%', justifyContent: 'space-between'},
                ]}>
                <Image source={ic_visa} style={iconSize} />
                <Image source={ic_master_card} style={iconSize} />
                <Image source={ic_jcb} style={iconSize} />
                <Image source={ic_american_express} style={iconSize} />
                <Image
                  source={ic_arrow_right}
                  style={iconCustomSize(12)}
                  resizeMode={'contain'}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.lineHorizontal} />

          <View style={{margin: 16}}>
            <Text style={[h1, {fontSize: 14, marginTop: 25}]}>
              Virtual Account
            </Text>

            <TouchableOpacity
              style={[
                rowCenter,
                {justifyContent: 'space-between', marginTop: 14},
              ]}>
              <Text style={h4}>BCA</Text>

              <View
                style={[
                  rowCenter,
                  // {width: '40%', justifyContent: 'space-between'},
                ]}>
                <Image source={ic_bca} style={[iconSize, {marginRight: 10}]} />
                <Image
                  source={ic_arrow_right}
                  style={iconCustomSize(12)}
                  resizeMode={'contain'}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                rowCenter,
                {justifyContent: 'space-between', marginTop: 14},
              ]}>
              <Text style={h4}>Mandiri</Text>

              <View
                style={[
                  rowCenter,
                  // {width: '40%', justifyContent: 'space-between'},
                ]}>
                <Image
                  source={ic_mandiri}
                  style={[iconSize, {marginRight: 10}]}
                />
                <Image
                  source={ic_arrow_right}
                  style={iconCustomSize(12)}
                  resizeMode={'contain'}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.lineHorizontal} />

          <View style={{margin: 16}}>
            <Text style={[h1, {fontSize: 14, marginTop: 25}]}>
              Virtual Account
            </Text>

            <TouchableOpacity
              style={[
                rowCenter,
                {justifyContent: 'space-between', marginTop: 14},
              ]}>
              <Text style={h4}>Transfer</Text>

              <View
                style={[
                  rowCenter,
                  {width: '20%', justifyContent: 'space-between'},
                ]}>
                <Image source={ic_bca} style={[iconSize, {marginRight: 10}]} />
                <Image
                  source={ic_mandiri}
                  style={[iconSize, {marginRight: 10}]}
                />
                <Image
                  source={ic_arrow_right}
                  style={iconCustomSize(12)}
                  resizeMode={'contain'}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.lineHorizontal} />

          <View style={{margin: 16}}>
            <Text style={[h1, {fontSize: 14, marginTop: 25}]}>
              Instant Payment
            </Text>

            <TouchableOpacity
              style={[
                rowCenter,
                {justifyContent: 'space-between', marginTop: 14},
              ]}>
              <Text style={h4}>OVO</Text>

              <View style={[rowCenter]}>
                <Image source={ic_ovo} style={[iconSize, {marginRight: 10}]} />
                <Image
                  source={ic_arrow_right}
                  style={iconCustomSize(12)}
                  resizeMode={'contain'}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                rowCenter,
                {justifyContent: 'space-between', marginTop: 14},
              ]}>
              <Text style={h4}>Gopay</Text>

              <View style={[rowCenter]}>
                <Image
                  source={ic_gopay}
                  style={[iconSize, {marginRight: 10}]}
                />
                <Image
                  source={ic_arrow_right}
                  style={iconCustomSize(12)}
                  resizeMode={'contain'}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                rowCenter,
                {justifyContent: 'space-between', marginTop: 14},
              ]}>
              <Text style={h4}>DANA</Text>

              <View style={[rowCenter]}>
                <Image source={ic_dana} style={[iconSize, {marginRight: 10}]} />
                <Image
                  source={ic_arrow_right}
                  style={iconCustomSize(12)}
                  resizeMode={'contain'}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.lineHorizontal} />
        </ScrollView>
      </View>
    </>
  );
};

export default hoc(OrderDetailScreen);

const styles = StyleSheet.create({
  lineHorizontal: {
    borderBottomColor: theme.colors.grey6,
    borderBottomWidth: 1,
  },
});
