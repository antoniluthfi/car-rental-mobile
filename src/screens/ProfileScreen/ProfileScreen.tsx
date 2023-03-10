import appBar from 'components/AppBar/AppBar';
import BSheetPasswordTextInput from 'components/MyProfileComponent/BSheetPasswordTextInput/BSheetPasswordTextInput';
import Button from 'components/Button';
import FileExistCard from 'components/MyProfileComponent/FileExistCard/FileExistCard';
import hoc from 'components/hoc';
import ImagePickerModal from 'components/MyProfileComponent/ImagePickerModal/ImagePickerModal';
import ProfileTextInput from 'components/MyProfileComponent/ProfileTextInput/ProfileTextInput';
import React, {useCallback, useEffect, useState} from 'react';
import UploadImageInput from 'components/UploadImageInput/UploadImageInput';
import {appDataState} from 'redux/features/appData/appDataSlice';
import {editUser, uploadFile} from 'redux/features/user/userAPI';
import {getUser} from 'redux/features/appData/appDataAPI';
import {h1, h2} from 'utils/styles';
import {ic_arrow_left_white, ic_wa} from 'assets/icons';
import {ImagePickerResponse} from 'react-native-image-picker';
import {rowCenter} from 'utils/mixins';
import {showBSheet} from 'utils/BSheet';
import {showToast} from 'utils/Toast';
import {toggleBSheet} from 'redux/features/utils/utilsSlice';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {userState} from 'redux/features/user/userSlice';
import {useTranslation} from 'react-i18next';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector(appDataState).userProfile;
  const user = useAppSelector(userState);
  const {t} = useTranslation();

  const [loading, setLoading] = useState<boolean>(false);
  const [whatsappChecked, setWhatsappChecked] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  // FIXME: create optional generic for setTypeUpload state
  const [typeUpload, setTypeUpload] = useState<
    'photo_ktp' | 'photo_license' | 'photo_profile'
  >('photo_profile');
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
      const _errorMessage: any = {};
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

      methods.showPasswordConfirmationModal();
    },
    handleSubmit: () => {
      setLoading(true);

      const _errorMessage: any = {};
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
    onCameraChange: (val: ImagePickerResponse['assets']) => {
      // FIXME: filtering typeUpload !== 'photo_profile' because no need to upload photo profile on this screen
      // please create better code than this
      if (typeUpload !== 'photo_profile') {
        dispatch(uploadFile({file: val?.[0], name: typeUpload}));
      }
    },
    onImageLibraryChange: (val: ImagePickerResponse['assets']) => {
      // FIXME: filtering typeUpload !== 'photo_profile' because no need to upload photo profile on this screen
      // please create better code than this
      if (typeUpload !== 'photo_profile') {
        dispatch(uploadFile({file: val?.[0], name: typeUpload}));
      }
    },
    showImagePickerOptionsModal: () => {
      showBSheet({
        snapPoint: ['30%', '30%'],
        content: (
          <ImagePickerModal
            onCameraChange={methods.onCameraChange}
            onImageLibraryChange={methods.onImageLibraryChange}
          />
        ),
      });
    },
    showPasswordConfirmationModal: () => {
      showBSheet({
        snapPoint: ['35%', '35%'],
        content: (
          <View style={styles.passwordModalContainer}>
            <View style={styles.header}>
              <View style={styles.headerTitleContainer}>
                <Text textBreakStrategy="simple" style={h2}>
                  {t('Account.password')}
                </Text>
              </View>
            </View>

            <BSheetPasswordTextInput
              label={t('Account.insert_password_to_update')}
              placeholder={t('Account.your_password')}
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
        ),
      });
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
        title: t('global.alert.success'),
        type: 'success',
        message: t('global.alert.success_change_profile_data'),
      });

      dispatch(toggleBSheet(false));
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
            <Text style={[h1, {color: 'white', marginLeft: 10}]}>
              {t('settings.profile')}
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation, t]);

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
          label={t('settings.fullName')}
          placeholder={t('settings.fullNamePlaceholder')}
          onChangeText={(v: string) => {
            setForm({...form, name: v});
            setFormError({...formError, name: ''});
          }}
          value={form.name}
          errorMessage={formError.name}
        />

        <ProfileTextInput
          label="Email"
          placeholder={t('forgot_password.enter_email')}
          keyboardType="email-address"
          onChangeText={(v: string) => {
            setForm({...form, email: v});
            setFormError({...formError, email: ''});
          }}
          editable={false}
          value={form.email}
          errorMessage={formError.email}
        />

        <ProfileTextInput
          label={t('register.phone_number')}
          placeholder={t('register.enter_phone_number')}
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
          placeholder={t('register.enter_whatsapp_number')}
          rightImageSource={ic_wa}
          onChangeText={(v: string) => {
            setForm({...form, wa_number: v});
            setFormError({...formError, wa_number: ''});
          }}
          value={form.wa_number}
          errorMessage={formError.wa_number}
          editable={false}
          // includeCheckbox={
          //   <Checkbox
          //     label={t('register.same_as_phone_number')}
          //     customContainerStyle={{margin: 0}}
          //     customLabelStyle={{fontSize: 12}}
          //     customCheckboxStyle={iconCustomSize(15)}
          //     checked={whatsappChecked}
          //     disabled
          //     onChange={val => {
          //       setForm(prev => ({
          //         ...form,
          //         wa_number:
          //           val && prev.phone ? prev.phone_code + prev.phone : '',
          //       }));
          //       setWhatsappChecked(val);
          //     }}
          //   />
          // }
        />

        <View style={[rowCenter]}>
          <Text style={[h1, {fontSize: 12, marginTop: 15}]}>
            {t('Account.id_card_photo')}
          </Text>
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
            onPress={() => {
              methods.showImagePickerOptionsModal();
              setTypeUpload('photo_ktp');
            }}
            onDelete={() => {
              setTemporaryFileUpload({...temporaryFileUpload, photo_ktp: ''});
            }}
            errorMessage={formError.photo_ktp}
          />
        )}

        <View style={[rowCenter]}>
          <Text style={[h1, {fontSize: 12, marginTop: 15}]}>
            {t('Account.license_photo')}
          </Text>
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
            onPress={() => {
              methods.showImagePickerOptionsModal();
              setTypeUpload('photo_license');
            }}
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
        title={t('global.button.save')}
        isLoading={loading}
        disabled={isDisabled}
      />
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
    paddingHorizontal: '5%',
  },
  header: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  headerTitleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
});
