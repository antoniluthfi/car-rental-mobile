import {ic_info_error} from 'assets/icons';
import {View, Text, TextInput, StyleSheet, Image} from 'react-native';
import {theme} from 'utils';
import {iconCustomSize, rowCenter} from 'utils/mixins';
import {h1} from 'utils/styles';

interface IProps {
  onChangeText: (text: string) => void;
  errorMessage?: string;
}

const SenderTextInput: React.FC<IProps> = ({onChangeText, errorMessage}) => {
  return (
    <View style={{marginBottom: 20}}>
      <View style={[rowCenter, {marginTop: 10}]}>
        <Text style={[h1, {fontSize: 12, marginBottom: 10, marginTop: 15}]}>
          Nama Pengirim
        </Text>
      </View>

      <View style={[rowCenter, styles.inputContainer]}>
        <TextInput
          onChangeText={onChangeText}
          placeholder="Nama Pengirim"
          style={{padding: 0, margin: 0}}
          // value={inputs.input1}
        />
      </View>

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

export default SenderTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'space-between',
    borderColor: theme.colors.black,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});
