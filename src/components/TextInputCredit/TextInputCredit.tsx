import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ic_visa,
  ic_master_card,
  ic_american_express,
  ic_jcb,
} from 'assets/icons';
import {rowCenter, iconSize} from 'utils/mixins';
import {h5} from 'utils/styles';
import {theme} from 'utils';

const TextInputCredit = ({
  onChangeText,
}: {
  onChangeText: (v: string) => void;
}) => {
  const textRef1 = useRef<TextInput>(null);
  const textRef2 = useRef<TextInput>(null);
  const textRef3 = useRef<TextInput>(null);
  const textRef4 = useRef<TextInput>(null);

  const [inputs, setInputs] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
  });

  useEffect(() => {
    //  if (inputs.input4.length === 0) {
    //     textRef3.current?.focus();
    //     return;
    //   } else if (inputs.input3.length === 0) {
    //     textRef2.current?.focus();
    //     return;
    //   } else if (inputs.input2.length === 0) {
    //     textRef1.current?.focus();
    //     return;
    //   }
    onChangeText(inputs.input1 + inputs.input2 + inputs.input3 + inputs.input4);

    if (inputs.input3.length === 4) {
      textRef4.current?.focus();
    } else if (inputs.input2.length === 4) {
      textRef3.current?.focus();
    } else if (inputs.input1.length === 4) {
      textRef2.current?.focus();
    }
    // else if (inputs.input4.length === 0) {
    //   textRef3.current?.focus();
    // } else if (inputs.input3.length === 0) {
    //   textRef2.current?.focus();
    // } else if (inputs.input2.length === 0) {
    //   textRef1.current?.focus();
    // }
  }, [inputs]);

  return (
    <View>
      <View
        style={[rowCenter, {marginTop: 12, justifyContent: 'space-between'}]}>
        <Text style={[h5, {fontSize: 12}]}>No. Kartu Kredit / Debit</Text>
        <View
          style={[rowCenter, {width: '40%', justifyContent: 'space-between'}]}>
          <Image source={ic_visa} style={iconSize} />
          <Image source={ic_master_card} style={iconSize} />
          <Image source={ic_american_express} style={iconSize} />
          <Image source={ic_jcb} style={iconSize} />
        </View>
      </View>

      <View style={[rowCenter, styles.creditCard]}>
        <TextInput
          onChangeText={v => setInputs({...inputs, input1: v})}
          placeholder="0000"
          maxLength={4}
          ref={textRef1}
          value={inputs.input1}
        />
        <Text> - </Text>
        <TextInput
          onChangeText={v => setInputs({...inputs, input2: v})}
          placeholder="0000"
          maxLength={4}
          ref={textRef2}
          value={inputs.input2}
        />
        <Text> - </Text>
        <TextInput
          onChangeText={v => setInputs({...inputs, input3: v})}
          placeholder="0000"
          maxLength={4}
          ref={textRef3}
          value={inputs.input3}
        />
        <Text> - </Text>
        <TextInput
          onChangeText={v => setInputs({...inputs, input4: v})}
          placeholder="0000"
          maxLength={4}
          ref={textRef4}
          value={inputs.input4}
        />
      </View>
    </View>
  );
};

export default TextInputCredit;

const styles = StyleSheet.create({
  creditCard: {
    borderWidth: 1,
    borderColor: theme.colors.grey4,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
});
