import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import appBar from 'components/AppBar/AppBar';
import hoc from 'components/hoc';
import {container, iconSize, rowCenter} from 'utils/mixins';
import {h1, h2, h3} from 'utils/styles';
import {FONT_SIZE_12, FONT_SIZE_20} from 'utils/typography';
import {theme} from 'utils';
import CustomTextInput from 'components/TextInput';
import Button from 'components/Button';
import {ic_apple, ic_facebook, ic_google} from 'assets/icons';
import {IParamLogin} from 'types/auth.types';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {authLogin} from 'redux/features/auth/authAPI';
import {toggleLoader} from 'redux/features/utils/utilsSlice';
import {showToast} from 'utils/Toast';
import {useTranslation} from 'react-i18next';
// import {toggleLoader} from 'redux/features/loader/loaderSlice';

interface IErrorMessage {
  error_email: string;
  error_password: string;
}

const LoginScreen: FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<IParamLogin>({
    email: 'sumaalbaroh1892@gmail.com',
    password: '12345678abc',
  });
  const [formError, setFormError] = useState<IErrorMessage>({
    error_email: '',
    error_password: '',
  });

  useEffect(() => {
    navigation.setOptions(
      appBar({
        // title: 'Home'
      }),
    );
  }, [navigation]);

  const methods = {
    handleLogin: async () => {
      try {
        const _errorMessage: any = {};
        let status = true;
        Object.keys(form).map((x, i) => {
          if (!form[x as keyof IParamLogin]) {
            status = false;
            _errorMessage[`error_${x}`] = `${x} tidak boleh kosong`;
          }
        });
        setFormError(_errorMessage);
        if (status) {
          dispatch(toggleLoader(true));

          setTimeout(async () => {
            await dispatch(authLogin(form));
            dispatch(toggleLoader(false));
          }, 1500);
        }
      } catch (error) {
        dispatch(toggleLoader(false));
        showToast({
          message: t('global.alert.error_occurred'),
          title: t('global.alert.warning'),
          type: 'error',
        });
      }
    },
  };

  return (
    <View style={[container]}>
      <Text style={[h1, styles.textHeader]}>{t('auth.sign_in')}</Text>
      <Text style={[h3, styles.textDesc]}>
        {t('auth.enter_email_to_login')}
      </Text>
      <View style={styles.inputWrapper}>
        <CustomTextInput
          placeholder="Masukan Email"
          title="Email"
          onChangeText={v => {
            setForm({...form, email: v});
            setFormError({...formError, [`error_email`]: ''});
          }}
          value={form.email}
          errorMessage={formError.error_email}
        />

        <View style={{marginTop: 18}} />

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
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={[h2, styles.textFPass]}>
            {t('forgot_password.forgot_password')}?
          </Text>
        </TouchableOpacity>
      </View>
      <Button
        _theme="navy"
        title="Login"
        styleWrapper={{marginTop: 40}}
        onPress={methods.handleLogin}
      />
      <Text style={[h3, styles.textDesc, styles.textOpsiLogin]}>
        {t('auth.or_login_using')}
      </Text>
      <View style={[rowCenter, styles.iconWrapper]}>
        <Image source={ic_google} style={iconSize} />
        <Image source={ic_facebook} style={iconSize} />
        <Image source={ic_apple} style={iconSize} />
      </View>
      <Text style={[h2, styles.textRegister]}>
        {t('auth.do_not_have_an_account')}?{' '}
        <Text
          style={styles.textRegister2}
          onPress={() => navigation.navigate('Register')}>
          {t('auth.sign_up_now')}
        </Text>
      </Text>
    </View>
  );
};

export default hoc(LoginScreen);

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
});
