import {
  ic_image_file,
  ic_info_error,
  ic_rounded_close,
  ic_rounded_image_file,
} from 'assets/icons';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import {theme} from 'utils';
import {iconCustomSize, rowCenter} from 'utils/mixins';
import {h1} from 'utils/styles';

interface IProps {
  onPress: () => void;
  onDelete: () => void;
  selected?: string;
  errorMessage?: string;
}

const UploadImageInput: React.FC<IProps> = ({
  onPress,
  selected,
  errorMessage,
  onDelete,
}) => {
  return (
    <View>
      <View style={[rowCenter, {marginTop: 10}]}>
        <Text style={[h1, {fontSize: 12, marginBottom: 10, marginTop: 15}]}>
          Upload Foto :
        </Text>
      </View>

      <TouchableOpacity style={styles.uploadInputContainer} onPress={onPress}>
        <Image source={ic_image_file} style={{width: 29, height: 37}} />
        <Text>
          Upload your image here, or{' '}
          <Text style={[h1, {fontSize: 14, color: theme.colors.blue}]}>
            browse
          </Text>
        </Text>
      </TouchableOpacity>

      {selected && (
        <View style={styles.uploadedImage}>
          <View style={styles.imageDetail}>
            <Image
              source={ic_rounded_image_file}
              style={{width: 28, height: 28, marginRight: 10}}
            />
            <Text style={[h1, {fontSize: 14}]}>Bukti Pembayaran.jpg</Text>
          </View>

          <TouchableOpacity onPress={onDelete}>
            <Image source={ic_rounded_close} style={{width: 15, height: 15}} />
          </TouchableOpacity>
        </View>
      )}

      {errorMessage && (
        <View style={[rowCenter, {marginTop: 5}]}>
          <Image source={ic_info_error} style={iconCustomSize(15)} />
          <Text style={[h1, {fontSize: 12, color: theme.colors.red}]}>
            {' '}
            {errorMessage}
          </Text>
        </View>
      )}
    </View>
  );
};

export default UploadImageInput;

const styles = StyleSheet.create({
  uploadInputContainer: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: theme.colors.grey3,
    borderRadius: 5,
    height: 165,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadedImage: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
