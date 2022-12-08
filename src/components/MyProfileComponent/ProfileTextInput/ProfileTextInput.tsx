import {ic_info_error} from 'assets/icons';
import {View, Text, TextInput, StyleSheet, Image} from 'react-native';
import {theme} from 'utils';
import {iconCustomSize, rowCenter} from 'utils/mixins';
import {h1} from 'utils/styles';
import PhoneNumberInput from '../PhoneNumberInput/PhoneNumberInput';
import {ProfileTextInputProps} from './types';

const ProfileTextInput: React.FC<ProfileTextInputProps> = ({
  onChangeText,
  errorMessage,
  value,
  label,
  placeholder,
  type = 'default',
  rightImageSource,
  editable = true,
  keyboardType,
  includeCheckbox,
  defaultCode
}) => {
  return (
    <View style={{marginBottom: 20}}>
      <View
        style={[
          rowCenter,
          !!includeCheckbox ? {justifyContent: 'space-between'} : {},
        ]}>
        <Text style={[h1, {fontSize: 12, marginBottom: 10, marginTop: 5}]}>
          {label}
        </Text>
        {includeCheckbox}
      </View>

      {type === 'default' ? (
        <View
          style={[
            styles.inputContainer,
            {backgroundColor: editable ? 'none' : theme.colors.grey6},
          ]}>
          {!!rightImageSource && (
            <Image
              source={rightImageSource}
              style={[iconCustomSize(20), {marginRight: 10}]}
            />
          )}

          <TextInput
            onChangeText={onChangeText as any}
            placeholder={placeholder}
            style={{padding: 0, margin: 0}}
            value={value}
            editable={editable}
            keyboardType={keyboardType}
          />
        </View>
      ) : (
        <PhoneNumberInput
          onChangeText={onChangeText}
          placeholder={placeholder}
          value={value}
          editable={editable}
          defaultCode={defaultCode}
        />
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

export default ProfileTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#CBCBCB',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});
