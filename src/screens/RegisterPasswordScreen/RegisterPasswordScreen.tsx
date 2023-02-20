import appBar from 'components/AppBar/AppBar';
import Button from 'components/Button';
import CustomTextInput from 'components/TextInput';
import hoc from 'components/hoc';
import React, {FC, useEffect, useState} from 'react';
import {authState} from 'redux/features/auth/authSlice';
import {container} from 'utils/mixins';
import {FONT_SIZE_12, FONT_SIZE_20} from 'utils/typography';
import {h1, h3} from 'utils/styles';
import {theme} from 'utils';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  appDataState,
  saveFormRegister,
} from 'redux/features/appData/appDataSlice';

interface IErrorMessage {
  error_password: string;
  error_password_confirmation: string;
}

interface IPasswordForm {
  password: string;
  password_confirmation: string;
}

const RegisterPasswordScreen: FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const userData = useAppSelector(appDataState).userData;
  const errorRegister = useAppSelector(authState).errors;

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

  useEffect(() => {
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
          dispatch(saveFormRegister({...userData, ...form}));
          navigation.navigate('RegisterVerification', {page: 'selectMethod'});
        }
      } catch (error) {
        console.log(error);
      }
    },
  };

  return (
    <View style={[container]}>
      <Text style={[h1, styles.textHeader]}>
        {t('register.create_password')}
      </Text>
      <Text style={[h3, styles.textDesc]}>{t('register.create_account')}</Text>
      <View style={styles.inputWrapper}>
        <CustomTextInput
          placeholder="Masukan Password anda"
          title="Password"
          secureTextEntry
          onChangeText={v => {
            setForm({...form, password: v});
            setFormError({...formError, [`error_password`]: ''});
          }}
          value={form.password}
          errorMessage={formError.error_password}
        />

        <View style={{marginTop: 18}} />

        <CustomTextInput
          placeholder="Konfirmasi Password anda"
          title="Konfirmasi Password*"
          secureTextEntry
          onChangeText={v => {
            setForm({...form, password_confirmation: v});
            setFormError({...formError, [`error_password_confirmation`]: ''});
          }}
          value={form.password_confirmation}
          errorMessage={formError.error_password_confirmation}
        />
      </View>
      <Button
        _theme="navy"
        title="Lanjutkan"
        styleWrapper={{marginTop: 40}}
        onPress={methods.handleRegister}
      />
    </View>
  );
};

export default hoc(RegisterPasswordScreen);

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
