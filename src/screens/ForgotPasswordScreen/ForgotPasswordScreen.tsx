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
import {IParamForgotPasswordRequest} from 'types/forgot-password.types';
import {forgotPasswordRequest} from 'redux/features/forgotPassword/forgotPasswordAPI';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/store';
// import {toggleLoader} from 'redux/features/loader/loaderSlice';

interface IErrorMessage {
  error_email: string;
}

const ForgotPasswordScreen: FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const forgotPasswordState = useSelector(
    (state: RootState) => state.forgotPassword,
  );

  const [form, setForm] = useState<IParamForgotPasswordRequest>({
    email: 'sumaalbaroh1892@gmail.com',
  });
  const [formError, setFormError] = useState<IErrorMessage>({
    error_email: '',
  });

  useEffect(() => {
    if (forgotPasswordState.status === 'success_request') {
      navigation.navigate('ResetPassword');
    }
  }, [forgotPasswordState]);

  const methods = {
    handleSendEmail: async () => {
      try {
        let _errorMessage: any = {};
        let status = true;
        Object.keys(form).map((x, i) => {
          if (!form[x as keyof IParamForgotPasswordRequest]) {
            status = false;
            _errorMessage[`error_${x}`] = `${x} tidak boleh kosong`;
          }
        });
        setFormError(_errorMessage);
        if (status) {
          dispatch(toggleLoader(true));

          setTimeout(async () => {
            await dispatch(forgotPasswordRequest(form));
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
      <Text style={[h1, styles.textHeader]}>Lupa Password</Text>
      <Text style={[h3, styles.textDesc]}>
        Masukan email anda untuk reset password
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
      </View>
      <Button
        _theme="navy"
        title="Kirim Email"
        styleWrapper={{marginTop: 40}}
        onPress={methods.handleSendEmail}
      />
    </View>
  );
};

export default hoc(ForgotPasswordScreen);

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
