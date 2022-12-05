import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {ReactNode, useEffect, useRef, useState} from 'react';
import {ic_calendar, ic_clock, ic_info_error} from 'assets/icons';
import {rowCenter, iconSize, iconCustomSize} from 'utils/mixins';
import {h1, h5} from 'utils/styles';
import {theme} from 'utils';
import {showBSheet} from 'utils/BSheet';

interface IProps {
  title: string;
  placeholder: string;
  mode: 'clock' | 'date';
  containerStyle: ViewStyle;
  inputContainerStyle?: ViewStyle;
  content?: ReactNode;
  value: string;
  onChangeTime?: any;
  disableTime?: boolean;
  errorMessage?: string;
}

const CustomDatePicker = ({
  title,
  mode,
  placeholder,
  containerStyle,
  inputContainerStyle,
  value,
  content,
  onChangeTime,
  disableTime = false,
  errorMessage,
}: IProps) => {
  // const [showBSheet, setShowSheet] = useState(false);
  const [hour, setHour] = useState('');
  const [minutes, setMinutes] = useState('');
  const ref1 = useRef<any>(null);
  const ref2 = useRef<any>(null);

  const methods = {
    handleBSheet: () => {
      showBSheet({
        content,
      });
    },
  };

  useEffect(() => {
    if (!onChangeTime) return;
    if (hour.length === 2) ref2.current?.focus();

    if (hour.length < 2) {
      onChangeTime(hour);
    } else {
      onChangeTime(hour + minutes);
    }
  }, [hour, minutes]);

  return (
    <View style={containerStyle}>
      <Text style={[h1, {fontSize: 14}]}>{title}</Text>
      <View style={[rowCenter, styles.wrapper, inputContainerStyle]}>
        <Image
          source={mode === 'clock' ? ic_clock : ic_calendar}
          style={iconSize}
        />
        {content && (
          <TouchableOpacity onPress={methods.handleBSheet}>
            <Text style={[h5, {marginLeft: 10}]}>{value || placeholder}</Text>
          </TouchableOpacity>
        )}
        {!content && !disableTime && (
          <View style={[rowCenter, {marginLeft: 10}]}>
            <TextInput
              placeholder="00"
              ref={ref1}
              maxLength={2}
              onChangeText={v => setHour(v)}
              editable={!disableTime}
              keyboardType="numeric"
              style={{padding: 0, margin: 0}}
            />
            <Text style={{marginHorizontal: 5}}>:</Text>
            <TextInput
              ref={ref2}
              placeholder="00"
              maxLength={2}
              editable={!disableTime}
              onChangeText={v => setMinutes(v)}
              keyboardType="numeric"
              style={{padding: 0, margin: 0}}
            />
          </View>
        )}
        {disableTime && (
          <Text style={{marginLeft: 10}}>
            {value?.slice(0, 2) || '00'} :{' '}
            {value?.length > 2 ? value.slice(-2) : '00'}
          </Text>
        )}
      </View>
      {errorMessage && (
        <View
          style={[{alignSelf: 'flex-end', marginTop: 5, flexDirection: 'row'}]}>
          <Image source={ic_info_error} style={iconCustomSize(15)} />
          <Text style={[h1, {fontSize: 10, color: theme.colors.red}]}>
            {' '}
            {errorMessage}
          </Text>
        </View>
      )}
    </View>
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey5,
    paddingVertical: 10,
  },
});
