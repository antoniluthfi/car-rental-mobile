import React, { ReactNode, useRef, useState } from 'react';
import { dateFormatter } from 'utils/functions';
import { h1, h5 } from 'utils/styles';
import { ic_calendar, ic_clock, ic_info_error } from 'assets/icons';
import { showBSheet } from 'utils/BSheet';
import { theme } from 'utils';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  rowCenter,
  iconSize,
  iconCustomSize,
  colorSelecting,
} from 'utils/mixins';

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
  snapPoint?: string[];
}

const CustomDatePicker = ({
  title,
  mode,
  placeholder,
  containerStyle,
  inputContainerStyle,
  value,
  content,
  // onChangeTime,
  disableTime = false,
  errorMessage,
  snapPoint,
}: IProps) => {
  // const [showBSheet, setShowSheet] = useState(false);
  const [alertHour, setAlertHour] = useState('');
  const ref2 = useRef<any>(null);

  const methods = {
    handleBSheet: () => {
      showBSheet({
        snapPoint,
        content,
      });
    },
  };

  return (
    <View style={containerStyle}>
      <Text style={[h1, {fontSize: 14}]}>{title}</Text>
      {mode === 'clock' && alertHour && (
        <Text style={styles.textAlertClock}>{alertHour}</Text>
      )}
      <View style={[rowCenter, styles.wrapper, inputContainerStyle]}>
        <Image
          source={mode === 'clock' ? ic_clock : ic_calendar}
          style={iconSize}
        />
        {mode === 'date' && (
          <TouchableOpacity onPress={methods.handleBSheet}>
            <Text style={[h5, colorSelecting(value), {marginLeft: 10}]}>
              {dateFormatter(value) || placeholder}
            </Text>
          </TouchableOpacity>
        )}

        {mode === 'clock' && !disableTime && (
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={methods.handleBSheet}>
            <Text>
              {value?.slice(0, 2) || '00'} :{' '}
              {value?.length > 2 ? value.slice(-2) : '00'}
            </Text>
          </TouchableOpacity>
        )}

        {mode === 'clock' && disableTime && (
          <Text style={styles.inputContainer}>
            {value?.slice(0, 2) || '00'} :{' '}
            {value?.length > 2 ? value.slice(-2) : '00'}
          </Text>
        )}
      </View>
      {mode === 'clock' && (
        <Text style={styles.textFormatHour}>24 Hours Format Time - WITA</Text>
      )}
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
    width: '100%',
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  textFormatHour: {
    fontSize: 10,
    alignSelf: 'flex-end',
    fontStyle: 'italic',
    color: theme.colors.grey4,
  },
  textAlertClock: {
    fontSize: 10,
    color: '#f79616',
  },
  inputContainer: {marginLeft: 10, marginVertical: 4},
});
