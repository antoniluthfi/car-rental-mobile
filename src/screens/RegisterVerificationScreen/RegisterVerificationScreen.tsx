import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useEffect} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import appBar from 'components/AppBar/AppBar';
import hoc from 'components/hoc';
import {container} from 'utils/mixins';
import {h1, h3} from 'utils/styles';
import {FONT_SIZE_12, FONT_SIZE_20} from 'utils/typography';
import {theme} from 'utils';
import { RootStackParamList } from 'types/navigator';
import SelectVerificationMethod from 'components/RegisterComponent/SelectVerificationMethod';
import SentOtp from 'components/RegisterComponent/SentOtp';
import InputOtp from 'components/RegisterComponent/InputOtp';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'RegisterVerification'>;

const RegisterVerificationScreen: FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ProfileScreenRouteProp>();

  useEffect(() => {
    navigation.setOptions(
      appBar({
        // title: 'Home'
      }),
    );
  }, [navigation]);

  return (
    <View style={[container, {
        alignItems: 'center',
        justifyContent: 'center',
    }]}>
      <Text style={[h1, styles.textHeader]}>Verification</Text>
      <Text style={[h3, styles.textDesc]}>
        Pilih metode verifikasi anda untuk kemanan dan melanjutkan pembayaran
        pemesanan anda
      </Text>

      {route.params?.page === 'selectMethod' && <SelectVerificationMethod/>}
      {route.params?.page === 'sendOtp' && <SentOtp />}
      {route.params?.page === 'inputOtp' && <InputOtp/>}

    </View>
  );
};

export default hoc(RegisterVerificationScreen);

const styles = StyleSheet.create({
  textHeader: {
    fontSize: FONT_SIZE_20,
    color: theme.colors.navy,
  },
  textDesc: {
    fontSize: FONT_SIZE_12,
    color: theme.colors.grey5,
    marginTop: 12,
    textAlign: 'center'
  },
});
