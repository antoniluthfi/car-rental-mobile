import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import hoc from 'components/hoc';
import Button from 'components/Button';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {useNavigation} from '@react-navigation/native';
import appBar from 'components/AppBar/AppBar';
import {rowCenter} from 'utils/mixins';
import {ic_arrow_left_white} from 'assets/icons';
import {h1} from 'utils/styles';
import ChangePasswordTextInput from 'components/MyProfileComponent/ChangePasswordTextInput/ChangePasswordTextInput';
import {passwordValidation} from 'utils/functions';
import {showToast} from 'utils/Toast';
import {changePassword} from 'redux/features/user/userAPI';
import {userState} from 'redux/features/user/userSlice';
import useLangSelector from 'utils/useLangSelector';

type ChangePasswordForm = {
  old_password: string;
  new_password: string;
  pass_confirmation: string;
};

const ChangePasswordScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const userUpdateStatus = useAppSelector(userState).isChangePasswordSuccess;
  const t = useLangSelector().settings;
  const t_global = useLangSelector().global;
  
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<ChangePasswordForm>({
    old_password: '12345678abc',
    new_password: '12345678abc1',
    pass_confirmation: '12345678abc1',
  });
  const [formError, setFormError] = useState<ChangePasswordForm>({
    old_password: '',
    new_password: '',
    pass_confirmation: '',
  });

  const methods = {
    handleSubmit: () => {
      setLoading(true);

      const _errorMessage: any = {};
      let status = true;
      if (!form.old_password) {
        _errorMessage['old_password'] = 'Masukan password lama';
        status = false;
      }

      if (!form.new_password) {
        _errorMessage['new_password'] = 'Masukan password baru';
        status = false;
      }

      if (!form.pass_confirmation) {
        _errorMessage['pass_confirmation'] =
          'Masukkan konfirmasi password baru';
        status = false;
      }

      setFormError({..._errorMessage});

      if (!status) {
        setLoading(false);
        return;
      }

      const validated = passwordValidation(
        form.new_password,
        form.pass_confirmation,
      );

      if (!validated) {
        if (form.new_password !== form.pass_confirmation) {
          showToast({
            title: 'Gagal',
            type: 'error',
            message: 'Password Baru dan Konfirmasi Password Baru Tidak Sesuai',
          });
        } else {
          showToast({
            title: 'Gagal',
            type: 'warning',
            message:
              'Password Minimal 8 Karakter dan Terdiri Dari Angka dan Juga Huruf',
          });
        }

        setLoading(false);
        return;
      }

      dispatch(changePassword(form));
      setLoading(false);
    },
  };

  useEffect(() => {
    if (userUpdateStatus) {
      showToast({
        title: 'Berhasil',
        type: 'success',
        message: 'Berhasil merubah password',
      });
      navigation.goBack();
    }
  }, [userUpdateStatus]);

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
              {t.changePassword}
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View>
        <ChangePasswordTextInput
          label={t.oldPassword}
          placeholder={t.oldPasswordPlaceholder}
          onChangeText={v => {
            setForm({...form, old_password: v});
            setFormError({...formError, old_password: ''});
          }}
          value={form.old_password}
          errorMessage={formError.old_password}
        />

        <ChangePasswordTextInput
          label={t.newPassword}
          placeholder={t.newPasswordPlaceholder}
          onChangeText={v => {
            setForm({...form, new_password: v});
            setFormError({...formError, new_password: ''});
          }}
          value={form.new_password}
          errorMessage={formError.new_password}
        />

        <ChangePasswordTextInput
          label={t.confirmPassword}
          placeholder={t.confirmPasswordPlaceholder}
          onChangeText={v => {
            setForm({...form, pass_confirmation: v});
            setFormError({...formError, pass_confirmation: ''});
          }}
          value={form.pass_confirmation}
          errorMessage={formError.pass_confirmation}
        />
      </View>

      <Button
        _theme="navy"
        onPress={methods.handleSubmit}
        title={t_global.button.save}
        isLoading={loading}
      />
    </View>
  );
};

export default hoc(ChangePasswordScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: '5%',
    justifyContent: 'space-between',
  },
});
