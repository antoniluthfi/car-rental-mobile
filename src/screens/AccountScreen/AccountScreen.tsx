import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  PermissionsAndroid,
  Switch,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import hoc from 'components/hoc';
import Button from 'components/Button';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {logout} from 'redux/features/auth/authSlice';
import {toggleLoader} from 'redux/features/utils/utilsSlice';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import appBar from 'components/AppBar/AppBar';
import {rowCenter} from 'utils/mixins';
import {
  ic_arrow_left_white,
  ic_camera,
  ic_empty_profile,
  ic_notification_bell,
  ic_password_lock,
  ic_profile_active,
} from 'assets/icons';
import {h1, h5} from 'utils/styles';
import ImagePickerModal from 'components/MyProfileComponent/ImagePickerModal/ImagePickerModal';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {resetUser, user, userState} from 'redux/features/user/userSlice';
import {
  notificationState,
  resetNotification,
} from 'redux/features/notifications/notificationSlice';
import {showToast} from 'utils/Toast';
import {editUser, uploadFile} from 'redux/features/user/userAPI';
import {
  appDataState,
  toggleLanguages,
} from 'redux/features/appData/appDataSlice';
import CustomModal from 'components/CustomModal/CustomModal';
import ChangePasswordTextInput from 'components/MyProfileComponent/ChangePasswordTextInput/ChangePasswordTextInput';
import {URL_IMAGE} from '@env';
import {getUser} from 'redux/features/appData/appDataAPI';
import langSelector from 'utils/useLangSelector';
import useLangSelector from 'utils/useLangSelector';

const AccountScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userState);
  const userProfile = useAppSelector(appDataState).userProfile;
  const notificationUpdateStatus =
    useAppSelector(notificationState).isUpdateSuccess;

  const [isEnabled, setIsEnabled] = useState(true);

  const lang = useLangSelector();

  const toggleSwitch = (e?: any) => {
    console.log(e);
    setIsEnabled(previousState => !previousState);
    dispatch(toggleLanguages(e ? 'en' : 'id'));
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [passwordConfirmationModal, setPasswordConfirmationModal] =
    useState<boolean>(false);
  const [password, setPassword] = useState<string>('12345678abc');
  const [errorPassword, setErrorPassword] = useState<string>('');

  const methods = {
    handleLogout: () => {
      dispatch(toggleLoader(true));
      setTimeout(() => {
        dispatch(logout());
        dispatch(toggleLoader(false));
      }, 1000);
    },
    openCamera: (val: ImagePickerResponse['assets']) => {
      dispatch(uploadFile({file: val?.[0], name: 'photo_profile'}));
    },
    openImageLibrary: async (val: ImagePickerResponse['assets']) => {
      dispatch(uploadFile({file: val?.[0], name: 'photo_profile'}));
    },
    handleSubmit: () => {
      setLoading(true);

      if (!password) {
        setErrorPassword('Masukkan Kata Sandi');
        setLoading(false);
        return;
      }

      const formData = {
        name: userProfile.name,
        phone_code: userProfile.phone_code.slice(1),
        phone: userProfile.phone.slice(1),
        email: userProfile.email,
        wa_number: userProfile.wa_number,
        photo_ktp: userProfile.personal_info.ktp,
        photo_license: userProfile.personal_info.sim,
        photo_profile: user.data.photo_profile,
        password,
      };

      dispatch(editUser(formData)).then(() => {
        setPasswordConfirmationModal(false);
        showToast({
          title: 'Berhasil',
          type: 'success',
          message: 'Berhasil mengubah foto profil',
        });
        dispatch(getUser());
      });
      setLoading(false);
    },
  };

  const ProfileImage = useMemo(
    () => (
      <Image
        source={
          userProfile.photo_profile
            ? {
                uri: URL_IMAGE + userProfile.photo_profile,
              }
            : ic_empty_profile
        }
        style={styles.image}
        resizeMode="cover"
      />
    ),
    [userProfile.photo_profile],
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(getUser());
    }, []),
  );

  useEffect(() => {
    if (Object.keys(user.data).length) {
      setPasswordConfirmationModal(true);
    }
  }, [user.data]);

  useEffect(() => {
    if (user.isChangePasswordSuccess || user.isUpdateSuccess) {
      dispatch(resetUser());
    }

    if (notificationUpdateStatus) {
      dispatch(resetNotification());
    }
  }, [user, notificationUpdateStatus]);

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
              {lang.Account.header}
            </Text>
          </TouchableOpacity>
        ),
        trailing: (
          <TouchableOpacity
            style={[
              rowCenter,
              {
                marginRight: 16,
              },
            ]} onPress={()=>toggleSwitch(isEnabled)}>
            <Text style={[h1, {color: isEnabled ? '#fff' : '#828181', marginRight: 10}]}>id</Text>
            <Text style={[h1, {color: !isEnabled ? '#fff' : '#828181'}]}>en</Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation, lang, isEnabled]);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>{ProfileImage}</View>
          <TouchableOpacity
            style={styles.pickerContainer}
            onPress={() => setModalVisible(true)}>
            <Image source={ic_camera} style={styles.camera} />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Profile')}>
            <Image source={ic_profile_active} style={styles.icon} />
            <Text style={[h5]}>Profile</Text>
          </TouchableOpacity>
          <View style={styles.line} />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('ChangePassword');
            }}>
            <Image source={ic_password_lock} style={styles.icon} />
            <Text style={[h5]}>{lang.Account.menu_2}</Text>
          </TouchableOpacity>
          <View style={styles.line} />

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Notification')}>
            <Image source={ic_notification_bell} style={styles.icon} />
            <Text style={[h5]}>Notifikasi</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Button _theme="navy" onPress={methods.handleLogout} title={'LOGOUT'} />

      <ImagePickerModal
        trigger={modalVisible}
        setTrigger={setModalVisible}
        onCameraChange={methods.openCamera}
        onImageLibraryChange={methods.openImageLibrary}
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
              setPassword(v);
              setErrorPassword('');
            }}
            value={password}
            errorMessage={errorPassword}
          />

          <Button
            _theme="navy"
            onPress={methods.handleSubmit}
            title={'Konfirmasi'}
            isLoading={loading}
          />
        </View>
      </CustomModal>
    </View>
  );
};

export default hoc(AccountScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: '5%',
    justifyContent: 'space-between',
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 121,
    height: 121,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 30,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  pickerContainer: {
    width: 37,
    height: 37,
    backgroundColor: '#344F67',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -10,
  },
  camera: {
    width: 15,
    height: 15,
  },
  buttonContainer: {
    marginTop: 50,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 23,
    marginRight: 15,
  },
  line: {
    marginVertical: 20,
    borderWidth: 0.5,
    borderColor: '#D9D9D9',
  },
  passwordModalContainer: {
    width: '100%',
    padding: '5%',
  },
});
