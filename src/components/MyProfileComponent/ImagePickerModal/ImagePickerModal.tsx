// import {ic_password_lock, ic_profile_active} from 'assets/icons';
import CustomModal from 'components/CustomModal/CustomModal';
import React, {Dispatch, SetStateAction} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  // Image,
} from 'react-native';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {h5} from 'utils/styles';
import {showToast} from 'utils/Toast';

interface IProps {
  trigger: boolean;
  setTrigger: Dispatch<SetStateAction<boolean>>;
  onCameraChange: (res: ImagePickerResponse['assets']) => void;
  onImageLibraryChange: (res: ImagePickerResponse['assets']) => void;
}

const ImagePickerModal: React.FC<IProps> = ({
  trigger,
  setTrigger,
  onCameraChange,
  onImageLibraryChange,
}) => {
  const onOpenCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result: ImagePickerResponse = await launchCamera({
          mediaType: 'photo',
          quality: 0.5,
          includeBase64: true,
        });

        setTrigger(false);
        if (Number(result.assets?.[0]?.fileSize) > 2097152) {
          throw new Error('Maaf, ukuran file tidak boleh lebih dari 2MB!');
        } else {
          onCameraChange(result.assets);
        }
      } else {
        throw new Error('Camera permission denied');
      }
    } catch (error: any) {
      showToast({
        title: 'Gagal',
        type: 'error',
        message: error?.message || 'Terjadi kesalahan',
      });
    }
  };

  const onOpenImageLibrary = async () => {
    try {
      const result: ImagePickerResponse = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.5,
        includeBase64: true,
      });

      setTrigger(false);
      if (Number(result.assets?.[0]?.fileSize) > 2097152) {
        throw new Error('Maaf, ukuran file tidak boleh lebih dari 2MB!');
      } else {
        onImageLibraryChange(result.assets);
      }
    } catch (error: any) {
      showToast({
        title: 'Gagal',
        type: 'error',
        message: error?.message || 'Terjadi kesalahan',
      });
    }
  };

  return (
    <CustomModal trigger={trigger} onClose={() => setTrigger(false)}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onOpenCamera}>
          {/* <Image source={ic_profile_active} style={styles.icon} /> */}
          <Text style={[h5]}>Kamera</Text>
        </TouchableOpacity>
        <View style={styles.line} />

        <TouchableOpacity style={styles.button} onPress={onOpenImageLibrary}>
          {/* <Image source={ic_password_lock} style={styles.icon} /> */}
          <Text style={[h5]}>Galeri</Text>
        </TouchableOpacity>
      </View>
    </CustomModal>
  );
};

export default ImagePickerModal;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
    padding: '5%',
  },
  list: {paddingBottom: 30, paddingHorizontal: '5%'},
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
