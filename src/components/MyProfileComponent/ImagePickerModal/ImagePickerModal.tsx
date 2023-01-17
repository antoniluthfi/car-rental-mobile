import React from 'react';
import {h2, h5} from 'utils/styles';
import {showToast} from 'utils/Toast';
import {toggleBSheet} from 'redux/features/utils/utilsSlice';
import {useAppDispatch} from 'redux/hooks';
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

interface IProps {
  onCameraChange: (res: ImagePickerResponse['assets']) => void;
  onImageLibraryChange: (res: ImagePickerResponse['assets']) => void;
}

const ImagePickerModal: React.FC<IProps> = ({
  onCameraChange,
  onImageLibraryChange,
}) => {
  const dispatch = useAppDispatch();

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

        dispatch(toggleBSheet(false));
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

      dispatch(toggleBSheet(false));
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
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text textBreakStrategy="simple" style={h2}>
            Pilih Opsi
          </Text>
        </View>
      </View>

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
  );
};

export default ImagePickerModal;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
    padding: '5%',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  headerTitleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
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
