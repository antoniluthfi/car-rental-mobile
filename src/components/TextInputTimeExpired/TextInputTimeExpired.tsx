import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {rowCenter} from 'utils/mixins';
import {h5} from 'utils/styles';
import {theme} from 'utils';

const TextInputTimeExpired = () => {
  const textRef1 = useRef<TextInput>(null);
  const textRef2 = useRef<TextInput>(null);

  const [inputs, setInputs] = useState({
    input1: '',
    input2: '',
  });

  useEffect(() => {
    if (inputs.input1.length === 2) {
      textRef2.current?.focus();
    }
  }, [inputs]);

  return (
    <View style={{flex: 1}}>
      <View
        style={[rowCenter, {marginTop: 12, justifyContent: 'space-between'}]}>
        <Text style={[h5, {fontSize: 12}]}>Masa Berlaku</Text>
      </View>

      <View style={[rowCenter, styles.creditCard]}>
        <TextInput
          onChangeText={v => setInputs({...inputs, input1: v})}
          placeholder="MM"
          maxLength={2}
          ref={textRef1}
          value={inputs.input1}
        />
        <Text> / </Text>
        <TextInput
          onChangeText={v => setInputs({...inputs, input2: v})}
          placeholder="YY"
          maxLength={2}
          ref={textRef2}
          value={inputs.input2}
        />
      </View>
    </View>
  );
};

export default TextInputTimeExpired;

const styles = StyleSheet.create({
  creditCard: {
    borderWidth: 1,
    borderColor: theme.colors.grey4,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
});
