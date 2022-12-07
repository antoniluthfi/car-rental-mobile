import {ic_password_lock, ic_profile_active} from 'assets/icons';
import React from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {h2, h5} from 'utils/styles';

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
    <Modal
      visible={trigger}
      animationType="slide"
      transparent
      statusBarTranslucent
      onRequestClose={onClose}>
      <Modal
        visible={trigger}
        animationType="fade"
        transparent
        statusBarTranslucent
        onRequestClose={onClose}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={[styles.modalContainer, styles.modalBackground]} />
        </TouchableWithoutFeedback>
      </Modal>

      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <View style={styles.headerTitleContainer}>
              <Text
                textBreakStrategy="simple"
                style={[h2, styles.modalHeaderTitle]}>
                Pilih Opsi
              </Text>
            </View>
          </View>

          <View style={styles.lineBreak} />

          <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onCameraPress}>
              <Image source={ic_profile_active} style={styles.icon} />
              <Text style={[h5]}>Kamera</Text>
            </TouchableOpacity>
            <View style={styles.line} />

            <TouchableOpacity
              style={styles.button}
              onPress={onImageLibraryPress}>
              <Image source={ic_password_lock} style={styles.icon} />
              <Text style={[h5]}>Galeri</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ImagePickerModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalHeaderTitle: {
    fontFamily: 'Neo Sans Regular',
    marginBottom: 10,
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
  },
  modalBackground: {backgroundColor: 'rgba(120, 120, 120, 0.5)'},
  header: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    paddingTop: 10,
  },
  backButton: {
    alignItems: 'center',
    flexDirection: 'column',
    height: 50,
    justifyContent: 'center',
    marginRight: 16,
  },
  headerTitleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  lineBreak: {
    borderBottomColor: 'rgba(173, 162, 162, 0.5)',
    borderBottomWidth: 1,
  },
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
