import {ic_check2, ic_rounded_close} from 'assets/icons';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from 'utils';
import { rowCenter } from 'utils/mixins';
import {h1} from 'utils/styles';

type Props = {
  label: string
  onRemoveImage: () => void
}

const FileExistCard: React.FC<Props> = ({ label, onRemoveImage }) => {
  return (
    <View style={styles.container}>
      <View style={rowCenter}>
        <Image source={ic_check2} style={styles.checkImage} resizeMode="contain" />
        <Text style={[h1, styles.label]}>{label}</Text>
      </View>

      <TouchableOpacity onPress={onRemoveImage}>
        <Image source={ic_rounded_close} style={styles.closeImage} />
      </TouchableOpacity>
    </View>
  );
};

export default FileExistCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: theme.colors.grey6,
    borderRadius: 6,
    paddingHorizontal: '3%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10
  },
  checkImage: {
    width: 25,
    height: 25,
    marginRight: 10
  },
  label: {
    color: theme.colors.blue,
    fontSize: 14,
  },
  closeImage: {
    width: 15,
    height: 15,
  },
});
