import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import appBar from 'components/AppBar/AppBar';
import hoc from 'components/hoc';
import {container, iconSize, rowCenter} from 'utils/mixins';
import {h1, h2, h3, h4, h5} from 'utils/styles';
import {FONT_SIZE_12, FONT_SIZE_20} from 'utils/typography';
import {theme} from 'utils';
import CustomTextInput from 'components/TextInput';
import Button from 'components/Button';
import {
  ic_apple,
  ic_blue_check,
  ic_facebook,
  ic_google,
  ic_uncheck,
  ic_wa,
} from 'assets/icons';
import {IParamLogin, IParamRegister} from 'types/auth.types';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {authLogin} from 'redux/features/auth/authAPI';
import Toast from 'components/Toast/Toast';
import {
  toggleLoader,
  utilsState,
} from 'redux/features/utils/utilsSlice';
import DropdownFlag from 'components/Dropdown/Dropdown';
import countryCodes from 'utils/country-codes.json';
import { RootStackParamList } from 'types/navigator';
import SelectVerificationMethod from 'components/RegisterComponent/SelectVerificationMethod';
import SentOtp from 'components/RegisterComponent/SentOtp';
import InputOtp from 'components/RegisterComponent/InputOtp';
import { appDataState, saveFormRegister } from 'redux/features/appData/appDataSlice';

interface IErrorMessage {
  error_password: string;
  error_password_confirmation: string;
}

interface IPasswordForm {
  password: string;
  password_confirmation: string;
}
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'RegisterVerification'>;

const RegisterVerificationScreen: FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ProfileScreenRouteProp>();
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState(countryCodes[0]);
  const [selectWa, setSelectWa] = useState<boolean>(false);
  const userData = useAppSelector(appDataState).userData;
  //   const auth = useAppSelector(authSlice);

  const [form, setForm] = useState<IPasswordForm>({
    password: '',
    password_confirmation: '',
  });
  const [formError, setFormError] = useState<IErrorMessage>({
    error_password: '',
    error_password_confirmation: '',
  });

  useEffect(() => {
    navigation.setOptions(
      appBar({
        // title: 'Home'
      }),
    );
  }, [navigation]);

  const methods = {
    handleRegister: async () => {
      try {
        let _errorMessage: any = {};
        let status = true;
        Object.keys(form).map((x, i) => {
          if (!form[x as keyof IPasswordForm]) {
            status = false;
            _errorMessage[`error_${x}`] = `${x} tidak boleh kosong`;
          }
        });
        setFormError(_errorMessage);
        if (form.password !== form.password_confirmation) {
          setFormError({
            ...formError,
            error_password_confirmation: 'Konfirmasi Password tidak sama',
          });
          return;
        }
        if (status) {
          dispatch(saveFormRegister({...userData, form}));
          navigation.navigate('RegisterVerification', {page: 'selectMethod'});
        }
      } catch (error) {
        console.log(error);
      }
    },
  };

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
