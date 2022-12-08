import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CountryFlag from 'react-native-country-flag';
import {rowCenter} from 'utils/mixins';
import {h5} from 'utils/styles';
import React, {useState} from 'react';
import CustomModal from 'components/CustomModal/CustomModal';
import dialCodePhone from 'assets/data/dialCodePhone.json';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';
import {theme} from 'utils';

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  onChangeText,
  value,
  placeholder,
}) => {
  const [trigger, setTrigger] = useState<boolean>(false);
  const [code, setCode] = useState<string>('62');
  const [flag, setFlag] = useState<string>('ID');
  const [keyword, setKeyword] = useState<string>('');

  const renderItem = ({item}: {item: RenderItemData}) => {
    return (
      <React.Fragment>
        <TouchableOpacity
          style={styles.buttonList}
          onPress={() => {
            setCode(item.dial_code.slice(1));
            setFlag(item.code);
            setTrigger(false);
          }}>
          <Text style={[h5, {marginRight: 5}]}>{item.dial_code}</Text>
          <CountryFlag isoCode={item.code} size={15} />
          <Text style={[h5, {marginLeft: 5}]}>{item.name}</Text>
        </TouchableOpacity>
        <View style={styles.lineBreak} />
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <View style={rowCenter}>
        <TouchableOpacity
          style={[styles.countryCodeContainer, {flexBasis: '20%'}]}
          onPress={() => setTrigger(true)}>
          <Text style={h5}>+{code}</Text>
          <CountryFlag isoCode={flag} size={15} />
        </TouchableOpacity>

        <View style={[styles.inputContainer, {flexBasis: '78%'}]}>
          <TextInput
            onChangeText={text => {
              onChangeText(code, text);
            }}
            placeholder={placeholder}
            style={{padding: 0, margin: 0}}
            value={value}
            keyboardType="numeric"
          />
        </View>
      </View>

      <CustomModal
        trigger={trigger}
        onClose={() => setTrigger(false)}
        headerTitle="Pilih Kode Negara">
        <View style={styles.container}>
          <View style={[styles.inputContainer, styles.inputSearchContainer]}>
            <TextInput
              onChangeText={text => setKeyword(text)}
              placeholder="Cari Kode Negara"
              style={{padding: 0, margin: 0}}
              value={keyword}
            />
          </View>

          <FlatList
            data={dialCodePhone.filter(
              code =>
                code.code.toLowerCase().match(keyword.toLowerCase()) ||
                code.name.toLowerCase().match(keyword.toLowerCase()),
            )}
            contentContainerStyle={styles.list}
            renderItem={renderItem}
            keyExtractor={(item, i) => {
              return i.toString();
            }}
            initialNumToRender={10}
            windowSize={5}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={30}
          />
        </View>
      </CustomModal>
    </React.Fragment>
  );
};

export default PhoneNumberInput;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'space-between',
    borderColor: '#CBCBCB',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#CBCBCB',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 14,
    paddingHorizontal: 5,
    marginRight: 7,
  },
  inputSearchContainer: {
    width: '90%',
    marginHorizontal: '5%',
    backgroundColor: theme.colors.grey8,
  },
  list: {paddingBottom: 30, paddingHorizontal: '5%'},
  container: {
    marginVertical: 10,
    width: '100%',
    height: WINDOW_HEIGHT / 1.3,
  },
  lineBreak: {
    borderBottomColor: 'rgba(173, 162, 162, 0.5)',
    borderBottomWidth: 1,
  },
  buttonList: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    width: '100%',
  },
});
