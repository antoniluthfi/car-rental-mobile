import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {rowCenter} from 'utils/mixins';
import {h5} from 'utils/styles';
import {theme} from 'utils';

const TextInputName = ({onChangeText}: {onChangeText: (v: string) => void}) => {
  const [input, setInput] = useState('');

  return (
    <View style={{marginBottom: 15}}>
      <View
        style={[rowCenter, {marginTop: 12, justifyContent: 'space-between'}]}>
        <Text style={[h5, {fontSize: 12}]}>Nama Pemegang Kartu</Text>
      </View>

      <View style={[rowCenter, styles.creditCard]}>
        <TextInput
          onChangeText={v => {
            setInput(v);
            onChangeText(v);
          }}
          placeholder="nama pemegang kartu"
          maxLength={15}
          value={input}
        />
      </View>
    </View>
  );
};

export default TextInputName;

const styles = StyleSheet.create({
  creditCard: {
    borderWidth: 1,
    borderColor: theme.colors.grey4,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
});
