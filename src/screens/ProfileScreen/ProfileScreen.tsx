import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import hoc from 'components/hoc';
import Button from 'components/Button';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import appBar from 'components/AppBar/AppBar';
import {iconCustomSize, rowCenter} from 'utils/mixins';
import {ic_arrow_left_white, ic_check2, ic_wa} from 'assets/icons';
import {h1} from 'utils/styles';
import {showToast} from 'utils/Toast';
import {editUser, uploadFile} from 'redux/features/user/userAPI';
import {userState} from 'redux/features/user/userSlice';
import ProfileTextInput from 'components/MyProfileComponent/ProfileTextInput/ProfileTextInput';
import Checkbox from 'components/Checkbox/Checkbox';
import CustomModal from 'components/CustomModal/CustomModal';
import ChangePasswordTextInput from 'components/MyProfileComponent/ChangePasswordTextInput/ChangePasswordTextInput';
import {getUser} from 'redux/features/appData/appDataAPI';
import {appDataState} from 'redux/features/appData/appDataSlice';
import UploadImageInput from 'components/UploadImageInput/UploadImageInput';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import FileExistCard from 'components/MyProfileComponent/FileExistCard/FileExistCard';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector(appDataState).userProfile;
  const user = useAppSelector(userState);

  const [loading, setLoading] = useState<boolean>(false);
  const [whatsappChecked, setWhatsappChecked] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [passwordConfirmationModal, setPasswordConfirmationModal] =
    useState<boolean>(false);
  const [form, setForm] = useState<ProfileForm>({
    name: '',
    phone_code: '',
    phone: '',
    email: '',
    wa_number: '',
    photo_ktp: '',
    photo_license: '',
    password: '12345678abc',
  });
  const [formError, setFormError] = useState<ProfileForm>({
    name: '',
    phone_code: '',
    phone: '',
    email: '',
    wa_number: '',
    photo_ktp: '',
    photo_license: '',
    password: '',
  });
  const [temporaryFileUpload, setTemporaryFileUpload] =
    useState<TemporaryFileUpload>({
      photo_ktp: '',
      photo_license: '',
    });

  const methods = {
    handleValidate: () => {
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

      setPasswordConfirmationModal(true);
    },
    handleSubmit: () => {
      setLoading(true);

      let _errorMessage: any = {};
      let status = true;
      if (!form.password) {
        _errorMessage['password'] = 'Masukkan Kata Sandi';
        status = false;
      }

      setFormError({..._errorMessage});

      if (!status) {
        setLoading(false);
        return;
      }

      const formData = {
        ...form,
        email: userProfile.email,
        photo_profile: userProfile.photo_profile,
        photo_ktp: temporaryFileUpload.photo_ktp || form.photo_ktp,
        photo_license: temporaryFileUpload.photo_license || form.photo_license,
      };
      dispatch(editUser(formData));
      setLoading(false);
    },
    openImagePicker: async (type: 'photo_ktp' | 'photo_license') => {
      try {
        const result: ImagePickerResponse = await launchImageLibrary({
          mediaType: 'photo',
          quality: 0.5,
          includeBase64: true,
        });

        if (Number(result.assets?.[0]?.fileSize) > 2097152) {
          setFormError({
            ...formError,
            [type]: 'Maaf, ukuran file tidak boleh lebih dari 2MB!',
          });
        } else {
          setFormError({
            ...formError,
            [type]: '',
          });

          dispatch(uploadFile({file: result.assets?.[0], name: type}));
        }
      } catch (error) {
        console.log(error);
      }
    },
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(getUser());
    }, []),
  );

  useEffect(() => {
    if (user.isUpdateSuccess) {
      showToast({
        title: 'Berhasil',
        type: 'success',
        message: 'Berhasil Mengedit Data Profil',
      });

      setPasswordConfirmationModal(false);
      setTimeout(() => {
        navigation.goBack();
      }, 500);
    }
  }, [user.isUpdateSuccess]);

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

  useEffect(() => {
    if (userProfile.id) {
      setForm(prev => ({
        ...prev,
        name: userProfile.name,
        phone_code: userProfile.phone_code.slice(1),
        phone: userProfile.phone.slice(1),
        email: userProfile.email,
        wa_number: userProfile.wa_number,
        photo_ktp: userProfile.personal_info.ktp,
        photo_license: userProfile.personal_info.sim,
      }));

      setWhatsappChecked(userProfile.phone === userProfile.wa_number);
    }
  }, [userProfile]);

  useEffect(() => {
    if (Object.keys(user.data).length) {
      setTemporaryFileUpload(prev => ({
        ...prev,
        ...user.data,
      }));
    }
  }, [user.data]);

  useEffect(() => {
    if (
      form.name === userProfile.name &&
      (!temporaryFileUpload.photo_ktp ||
        (temporaryFileUpload.photo_license &&
          form.photo_ktp === userProfile.personal_info.ktp)) &&
      (!temporaryFileUpload.photo_license ||
        (temporaryFileUpload.photo_ktp &&
          form.photo_license === userProfile.personal_info.sim))
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [form, userProfile.id]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{marginBottom: 20}}>
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
          editable={false}
          defaultCode={form.phone_code}
        />

        <ProfileTextInput
          label="Whatsapp"
          placeholder="Masukan No. Whatsapp"
          rightImageSource={ic_wa}
          onChangeText={(v: string) => {
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
              disabled
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

        <View style={[rowCenter]}>
          <Text style={[h1, {fontSize: 12, marginTop: 15}]}>Foto KTP</Text>
        </View>
        {form.photo_ktp ? (
          <FileExistCard
            label="foto-ktp.jpg"
            onRemoveImage={() => {
              setForm({...form, photo_ktp: ''});
            }}
          />
        ) : (
          <UploadImageInput
            selectedImageLabel="foto-ktp.jpg"
            selected={temporaryFileUpload.photo_ktp}
            onPress={() => methods.openImagePicker('photo_ktp')}
            onDelete={() => {
              setTemporaryFileUpload({...temporaryFileUpload, photo_ktp: ''});
            }}
            errorMessage={formError.photo_ktp}
          />
        )}

        <View style={[rowCenter]}>
          <Text style={[h1, {fontSize: 12, marginTop: 15}]}>Foto SIM</Text>
        </View>
        {form.photo_license ? (
          <FileExistCard
            label="foto-sim.jpg"
            onRemoveImage={() => {
              setForm({...form, photo_license: ''});
            }}
          />
        ) : (
          <UploadImageInput
            selectedImageLabel="foto-sim.jpg"
            selected={temporaryFileUpload.photo_license}
            onPress={() => methods.openImagePicker('photo_license')}
            onDelete={() => {
              setTemporaryFileUpload({
                ...temporaryFileUpload,
                photo_license: '',
              });
            }}
            errorMessage={formError.photo_license}
          />
        )}
      </View>

      <Button
        _theme="navy"
        onPress={methods.handleValidate}
        title={'Simpan'}
        isLoading={loading}
        disabled={isDisabled}
      />

      <CustomModal
        trigger={passwordConfirmationModal}
        onClose={() => setPasswordConfirmationModal(false)}
        headerTitle="Kata Sandi">
        <View style={styles.passwordModalContainer}>
          <ChangePasswordTextInput
            label="Masukan Kata Sandi untuk melakukan perubahan"
            placeholder="Kata sandi anda"
            onChangeText={v => {
              setForm({...form, password: v});
              setFormError({...formError, password: ''});
            }}
            value={form.password}
            errorMessage={formError.password}
          />

          <Button
            _theme="navy"
            onPress={methods.handleSubmit}
            title={'Konfirmasi'}
            isLoading={loading}
          />
        </View>
      </CustomModal>
    </ScrollView>
  );
};

export default hoc(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    padding: '5%',
    justifyContent: 'space-between',
  },
  passwordModalContainer: {
    width: '100%',
    padding: '5%',
  },
});
