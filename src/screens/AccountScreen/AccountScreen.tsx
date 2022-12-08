import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import hoc from 'components/hoc';
import Button from 'components/Button';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {logout} from 'redux/features/auth/authSlice';
import {toggleLoader} from 'redux/features/utils/utilsSlice';
import {useNavigation} from '@react-navigation/native';
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
import {resetUser, userState} from 'redux/features/user/userSlice';

const AccountScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const userUpdateStatus = useAppSelector(userState);

  const methods = {
    handleLogout: () => {
      dispatch(toggleLoader(true));
      setTimeout(() => {
        dispatch(logout());
        dispatch(toggleLoader(false));
      }, 1000);
    },
    openCamera: async () => {
      try {
        const result: ImagePickerResponse = await launchCamera({
          mediaType: 'photo',
          quality: 0.5,
          includeBase64: true,
        });

        console.log('image library', result);
      } catch (error) {
        console.log('image library', error);
      }
    },
    openImageLibrary: async () => {
      try {
        const result: ImagePickerResponse = await launchImageLibrary({
          mediaType: 'photo',
          quality: 0.5,
          includeBase64: true,
        });

        console.log('image library', result);
      } catch (error) {
        console.log('image library', error);
      }
    },
  };

  useEffect(() => {
    if (
      userUpdateStatus.isChangePasswordSuccess ||
      userUpdateStatus.isUpdateSuccess
    ) {
      dispatch(resetUser());
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
              My Profile
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.imageContainer}>
          <Image source={ic_empty_profile} style={styles.image} />
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
            <Text style={[h5]}>Ubah Password</Text>
          </TouchableOpacity>
          <View style={styles.line} />

          <TouchableOpacity style={styles.button}>
            <Image source={ic_notification_bell} style={styles.icon} />
            <Text style={[h5]}>Notifikasi</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Button _theme="navy" onPress={methods.handleLogout} title={'LOGOUT'} />

      <ImagePickerModal
        trigger={modalVisible}
        onCameraPress={methods.openCamera}
        onImageLibraryPress={methods.openImageLibrary}
        onClose={() => {
          setModalVisible(false);
        }}
      />
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
  imageContainer: {
    width: 121,
    height: 121,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 30,
  },
  image: {
    width: 35,
    height: 44,
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
});
