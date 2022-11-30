import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import appBar from 'components/AppBar/AppBar';
import hoc from 'components/hoc';
import {container} from 'utils/mixins';
import {h1, h3} from 'utils/styles';
import {FONT_SIZE_12, FONT_SIZE_20} from 'utils/typography';
import {theme} from 'utils';
import CustomTextInput from 'components/TextInput';
import Button from 'components/Button';
import {useAppDispatch} from 'redux/hooks';
import {toggleLoader} from 'redux/features/utils/utilsSlice';
import {showToast} from 'utils/Toast';
import {IParamsResetPassword} from 'types/forgot-password.types';
import {
  forgotPasswordConfirmation,
  forgotPasswordReset,
} from 'redux/features/forgotPassword/forgotPasswordAPI';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/store';
// import {toggleLoader} from 'redux/features/loader/loaderSlice';

interface IErrorMessage {
  error_password: string;
  error_password_confirmation: string;
}

const ResetPasswordScreen: FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const forgotPasswordState = useSelector(
    (state: RootState) => state.forgotPassword,
  );

  const [form, setForm] = useState<IParamsResetPassword>({
    password: '12345678abc',
    password_confirmation: '12345678abc',
  });
  const [formError, setFormError] = useState<IErrorMessage>({
    error_password: '',
    error_password_confirmation: '',
  });

  useEffect(() => {
    if (forgotPasswordState.status === 'success_reset') {
      showToast({
        message: 'Kata sandi berhasil diubah, silakan login kembali',
        title: 'Success',
        type: 'success',
      });

      navigation.navigate('Login')
    }
  }, [forgotPasswordState]);

  const methods = {
    handleConfirmPassword: async () => {
      try {
        let _errorMessage: any = {};
        let status = true;
        Object.keys(form).map((x, i) => {
          if (!form[x as keyof IParamsResetPassword]) {
            status = false;
            _errorMessage[`error_${x}`] = `${x} tidak boleh kosong`;
          }
        });
        setFormError(_errorMessage);
        if (status) {
          dispatch(toggleLoader(true));

          setTimeout(async () => {
            await dispatch(forgotPasswordConfirmation());
            await dispatch(forgotPasswordReset(form));
            dispatch(toggleLoader(false));
          }, 1500);
        }
      } catch (error) {
        dispatch(toggleLoader(false));
        showToast({
          message: 'Terjadi kesalahan',
          title: 'Warning',
          type: 'error',
        });
        console.log(error);
      }
    },
  };

  return (
    <View style={[container]}>
      <Text style={[h1, styles.textHeader]}>Reset Password</Text>
      <Text style={[h3, styles.textDesc]}>Reset Password Anda</Text>
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
          title="Konfirmasi Password"
          secureTextEntry
          onChangeText={v => {
            setForm({...form, password_confirmation: v});
            setFormError({...formError, [`error_password_confirmation`]: ''});
          }}
          value={form.password}
          errorMessage={formError.error_password_confirmation}
        />

        <View style={{marginTop: 18}} />
      </View>
      <Button
        _theme="navy"
        title="Simpan"
        styleWrapper={{marginTop: 40}}
        onPress={methods.handleConfirmPassword}
      />
    </View>
  );
};

export default hoc(ResetPasswordScreen);

const styles = StyleSheet.create({
  textHeader: {
    fontSize: FONT_SIZE_20,
    color: theme.colors.navy,
  },
  textDesc: {
    fontSize: FONT_SIZE_12,
    color: theme.colors.black,
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