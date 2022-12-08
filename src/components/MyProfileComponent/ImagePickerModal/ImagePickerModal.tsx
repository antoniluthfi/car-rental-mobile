import {ic_password_lock, ic_profile_active} from 'assets/icons';
import CustomModal from 'components/CustomModal/CustomModal';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {h5} from 'utils/styles';

interface IProps {
  trigger: boolean;
  onClose: () => void;
  onCameraPress: () => void;
  onImageLibraryPress: () => void;
}

const ImagePickerModal: React.FC<IProps> = ({
  trigger,
  onClose,
  onCameraPress,
  onImageLibraryPress,
}) => {
  return (
    <CustomModal trigger={trigger} onClose={onClose}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onCameraPress}>
          <Image source={ic_profile_active} style={styles.icon} />
          <Text style={[h5]}>Kamera</Text>
        </TouchableOpacity>
        <View style={styles.line} />

        <TouchableOpacity style={styles.button} onPress={onImageLibraryPress}>
          <Image source={ic_password_lock} style={styles.icon} />
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
