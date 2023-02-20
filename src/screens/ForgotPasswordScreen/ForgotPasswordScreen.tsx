import appBar from 'components/AppBar/AppBar';
import Button from 'components/Button';
import CustomTextInput from 'components/TextInput';
import hoc from 'components/hoc';
import React, {FC, useEffect, useState} from 'react';
import {container} from 'utils/mixins';
import {FONT_SIZE_12, FONT_SIZE_20} from 'utils/typography';
import {forgotPasswordRequest} from 'redux/features/forgotPassword/forgotPasswordAPI';
import {h1, h3} from 'utils/styles';
import {IParamForgotPasswordRequest} from 'types/forgot-password.types';
import {RootState} from 'redux/store';
import {showToast} from 'utils/Toast';
import {StyleSheet, Text, View} from 'react-native';
import {theme} from 'utils';
import {toggleLoader} from 'redux/features/utils/utilsSlice';
import {useAppDispatch} from 'redux/hooks';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
// import {toggleLoader} from 'redux/features/loader/loaderSlice';

interface IErrorMessage {
  error_email: string;
}

const ForgotPasswordScreen: FC = () => {
  const {t} = useTranslation();
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
        const _errorMessage: any = {};
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
          message: t('global.alert.error_occurred'),
          title: t('global.alert.warning'),
          type: 'error',
        });
      }
    },
  };

  return (
    <View style={[container]}>
      <Text style={[h1, styles.textHeader]}>
        {t('forgot_password.forgot_password')}
      </Text>
      <Text style={[h3, styles.textDesc]}>
        {t('forgot_password.enter_email_to_reset_password')}
      </Text>
      <View style={styles.inputWrapper}>
        <CustomTextInput
          placeholder={t('forgot_password.enter_email')}
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
        title={t('global.button.send_email')}
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
