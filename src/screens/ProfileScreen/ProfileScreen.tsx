import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import hoc from 'components/hoc';
import Button from 'components/Button';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {useNavigation} from '@react-navigation/native';
import appBar from 'components/AppBar/AppBar';
import {iconCustomSize, rowCenter} from 'utils/mixins';
import {ic_arrow_left_white, ic_wa} from 'assets/icons';
import {h1} from 'utils/styles';
import {passwordValidation} from 'utils/functions';
import {showToast} from 'utils/Toast';
import {changePassword} from 'redux/features/user/userAPI';
import {userState} from 'redux/features/user/userSlice';
import ProfileTextInput from 'components/MyProfileComponent/ProfileTextInput/ProfileTextInput';
import Checkbox from 'components/Checkbox/Checkbox';

type ProfileForm = {
  name: string;
  phone_code: string;
  phone: string;
  email: string;
  wa_number: string;
  photo_ktp: any;
  photo_license: any;
};

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const userUpdateStatus = useAppSelector(userState).isChangePasswordSuccess;

  const [loading, setLoading] = useState<boolean>(false);
  const [whatsappChecked, setWhatsappChecked] = useState<boolean>(false);
  const [form, setForm] = useState<ProfileForm>({
    name: '',
    phone_code: '',
    phone: '',
    email: '',
    wa_number: '',
    photo_ktp: {},
    photo_license: {},
  });
  const [formError, setFormError] = useState<ProfileForm>({
    name: '',
    phone_code: '',
    phone: '',
    email: '',
    wa_number: '',
    photo_ktp: {},
    photo_license: {},
  });

  const methods = {
    handleSubmit: () => {
      setLoading(true);

      let _errorMessage: any = {};
      let status = true;
      if (!form.name) {
        _errorMessage['name'] = 'Masukan Nama Anda';
        status = false;
      }

      if (!form.phone) {
        _errorMessage['phone'] = 'Masukan No. Handphone';
        status = false;
      }

      if (!form.email) {
        _errorMessage['email'] = 'Masukkan Email';
        status = false;
      }

      setFormError({..._errorMessage});

      if (!status) {
        setLoading(false);
        return;
      }

      // dispatch(changePassword(form));
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
            <Text style={[h1, {color: 'white', marginLeft: 10}]}>Profile</Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View>
        <ProfileTextInput
          label="Nama Lengkap"
          placeholder="Masukan Nama Anda"
          onChangeText={(v: string) => {
            setForm({...form, name: v});
            setFormError({...formError, name: ''});
          }}
          value={form.name}
          errorMessage={formError.name}
        />

        <ProfileTextInput
          label="Email"
          placeholder="Masukan Email"
          keyboardType="email-address"
          onChangeText={(v: string) => {
            setForm({...form, email: v});
            setFormError({...formError, email: ''});
          }}
          value={form.email}
          errorMessage={formError.email}
        />

        <ProfileTextInput
          label="No. Handphone"
          placeholder="Masukan No. Handphone"
          type="phone_number"
          onChangeText={(code: string, v: string) => {
            setForm({...form, phone_code: code, phone: v});
            setFormError({...formError, phone: ''});
          }}
          value={form.phone}
          errorMessage={formError.phone}
        />

        <ProfileTextInput
          label="Whatsapp"
          placeholder="Masukan No. Whatsapp"
          rightImageSource={ic_wa}
          onChangeText={v => {
            setForm({...form, wa_number: v});
            setFormError({...formError, wa_number: ''});
          }}
          value={form.wa_number}
          errorMessage={formError.wa_number}
          editable={false}
          includeCheckbox={
            <Checkbox
              label="Sama dengan No. Handphone"
              customContainerStyle={{margin: 0}}
              customLabelStyle={{fontSize: 12}}
              customCheckboxStyle={iconCustomSize(15)}
              checked={whatsappChecked}
              onChange={val => {
                setForm(prev => ({
                  ...form,
                  wa_number:
                    val && prev.phone ? prev.phone_code + prev.phone : '',
                }));
                setWhatsappChecked(val);
              }}
            />
          }
        />
      </View>

      <Button
        _theme="navy"
        onPress={methods.handleSubmit}
        title={'Simpan'}
        isLoading={loading}
      />
    </View>
  );
};

export default hoc(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: '5%',
    justifyContent: 'space-between',
  },
});
