import appBar from 'components/AppBar/AppBar';
import Button from 'components/Button';
import countryCodes from 'utils/country-codes.json';
import CustomTextInput from 'components/TextInput';
import DropdownFlag from 'components/Dropdown/Dropdown';
import hoc from 'components/hoc';
import React, {FC, useEffect, useState} from 'react';
import {authState} from 'redux/features/auth/authSlice';
import {container, iconSize, rowCenter} from 'utils/mixins';
import {FONT_SIZE_12, FONT_SIZE_20} from 'utils/typography';
import {h1, h3, h4} from 'utils/styles';
import {IParamRegister} from 'types/auth.types';
import {saveFormRegister} from 'redux/features/appData/appDataSlice';
import {theme} from 'utils';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ic_blue_check, ic_uncheck, ic_wa} from 'assets/icons';

interface IErrorMessage {
  error_fullname: '';
  error_email: '';
  error_phone: '';
  error_wa: '';
}

const RegisterScreen: FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const errorRegister = useAppSelector(authState).errors;
  const [selected, setSelected] = useState(countryCodes[0]);
  const [selectWa, setSelectWa] = useState<boolean>(false);

  const [form, setForm] = useState<IParamRegister>({
    fullname: '',
    email: '',
    phone: '',
    wa: '',
    code: countryCodes[0].dial_code,
  });
  const [formError, setFormError] = useState<IErrorMessage>({
    error_fullname: '',
    error_email: '',
    error_phone: '',
    error_wa: '',
  });

  useEffect(() => {
    navigation.setOptions(
      appBar({
        // title: 'Home'
      }),
    );
  }, [navigation]);

  useEffect(() => {
    if (!selectWa) return;
    setForm({...form, wa: form.phone});
  }, [selectWa]);

  useEffect(() => {
    console.log('errorRegister = ', errorRegister);
    const _errorMessage: any = {};
    errorRegister?.detail?.map((x: {field: string; message: string}) => {
      _errorMessage[`error_${x.field}`] = x?.message;
    });
    setFormError(_errorMessage);
  }, [errorRegister]);

  const methods = {
    handleRegister: async () => {
      try {
        const _errorMessage: any = {};
        let status = true;
        Object.keys(form).map((x, i) => {
          if (!form[x as keyof IParamRegister]) {
            status = false;
            _errorMessage[`error_${x}`] = `${x} tidak boleh kosong`;
          }
        });
        setFormError(_errorMessage);
        if (status) {
          dispatch(saveFormRegister(form));
          navigation.navigate('RegisterPassword');
        }
      } catch (error) {
        console.log(error);
      }
    },
  };

  return (
    <View style={[container]}>
      <Text style={[h1, styles.textHeader]}>{t('auth.sign_up')}</Text>
      <Text style={[h3, styles.textDesc]}>
        Buat akun untuk masuk ke aplikasi
      </Text>
      <View style={styles.inputWrapper}>
        <CustomTextInput
          placeholder="Nama Lengkap"
          title="Nama Lengkap"
          onChangeText={v => {
            setForm({...form, fullname: v});
            setFormError({...formError, [`error_fullname`]: ''});
          }}
          value={form.fullname}
          errorMessage={formError.error_fullname}
        />

        <View style={{marginTop: 18}} />

        <CustomTextInput
          placeholder="Masukan Email anda"
          title="Email"
          onChangeText={v => {
            setForm({...form, email: v});
            setFormError({...formError, [`error_email`]: ''});
          }}
          value={form.email}
          errorMessage={formError.error_email}
        />
        <Text style={[styles.title, h1]}>{t('register.phone_number')}*</Text>
        <View
          style={[
            {justifyContent: 'space-between', flexDirection: 'row', height: 60},
          ]}>
          <View style={{width: '30%', marginTop: 10}}>
            <DropdownFlag
              data={countryCodes}
              label=""
              onSelect={(v: any) => {
                setForm({...form, code: v.dial_code});
                setSelected(v);
              }}
              selected={selected}
            />
          </View>
          <View style={{width: '65%'}}>
            <CustomTextInput
              placeholder="Masukan No. Handphone anda"
              // title="Email"
              onChangeText={v => {
                setForm({...form, phone: v});
                setFormError({...formError, [`error_phone`]: ''});
              }}
              value={form.phone}
              errorMessage={formError.error_phone}
            />
          </View>
        </View>

        <View
          style={[rowCenter, {justifyContent: 'space-between', marginTop: 20}]}>
          <Text style={[{fontSize: FONT_SIZE_12}, h1]}>Whatsapp</Text>
          <TouchableOpacity
            style={[rowCenter]}
            onPress={() => setSelectWa(!selectWa)}>
            <Image
              source={selectWa ? ic_blue_check : ic_uncheck}
              style={iconSize}
            />
            <Text style={[h4, {marginLeft: 5}]}>
              {t('register.same_as_phone_number')}
            </Text>
          </TouchableOpacity>
        </View>
        <CustomTextInput
          placeholder="Masukan No. Whatsapp"
          // title="Email"
          disabled={selectWa}
          onChangeText={v => {
            setForm({...form, wa: v});
            setFormError({...formError, [`error_wa`]: ''});
          }}
          value={form.wa}
          errorMessage={formError.error_wa}
          leftIcon={ic_wa}
        />
      </View>
      <Button
        _theme="navy"
        title="Daftar"
        styleWrapper={{marginTop: 40}}
        onPress={methods.handleRegister}
      />
    </View>
  );
};

export default hoc(RegisterScreen);

const styles = StyleSheet.create({
  textHeader: {
    fontSize: FONT_SIZE_20,
    color: theme.colors.navy,
  },
  textDesc: {
    fontSize: FONT_SIZE_12,
    color: theme.colors.grey5,
    marginTop: 12,
  },
  inputWrapper: {
    marginTop: 26,
  },
  textFPass: {
    fontSize: FONT_SIZE_12,
    color: theme.colors.blue,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  textOpsiLogin: {
    alignSelf: 'center',
    marginTop: 37,
  },
  iconWrapper: {
    alignSelf: 'center',
    marginTop: 20,
    width: '30%',
    justifyContent: 'space-between',
  },
  textRegister: {
    fontSize: FONT_SIZE_12,
    alignSelf: 'center',
    marginTop: 20,
  },
  textRegister2: {
    color: theme.colors.blue,
  },
  title: {
    fontSize: FONT_SIZE_12,
    marginTop: 20,
  },
});
