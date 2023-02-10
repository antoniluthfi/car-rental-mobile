import React, {ReactNode, useEffect, useRef, useState} from 'react';
import useLangSelector from 'utils/useLangSelector';
import {h1, h5} from 'utils/styles';
import {ic_calendar, ic_clock, ic_info_error} from 'assets/icons';
import {showBSheet} from 'utils/BSheet';
import {theme} from 'utils';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
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
import moment from 'moment';

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
  const [alertHour, setAlertHour] = useState('');
  const ref1 = useRef<any>(null);
  const ref2 = useRef<any>(null);
  const lang = useLangSelector();

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

  useEffect(() => {
    if (parseInt(hour) < 7) {
      setAlertHour('Rent Time Starts At 7');
    } else {
      setAlertHour('');
    }
  }, [hour]);
  console.log('value = ', value);
  const IsoDateTo = moment(value, 'YYYY/MM/DD').format('DD-MM-YYYY');


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
        {content && (
          <TouchableOpacity onPress={methods.handleBSheet}>
            <Text style={[h5, colorSelecting(value), {marginLeft: 10}]}>
              {IsoDateTo || placeholder}
            </Text>
          </TouchableOpacity>
        )}
        {!content && !disableTime && (
          <View style={[rowCenter, {marginLeft: 10}]}>
            <TextInput
              placeholder="00"
              ref={ref1}
              maxLength={2}
              value={hour}
              onChangeText={v => {
                if (Number(v) > 23) {
                  setHour('23');
                } else {
                  setHour(v);
                }
              }}
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
              value={minutes}
              onChangeText={v => {
                if (Number(v) > 59) {
                  setMinutes('59');
                } else {
                  setMinutes(v);
                }
              }}
              keyboardType="numeric"
              style={{padding: 0, margin: 0}}
            />
          </View>
        )}
        {disableTime && (
          <Text style={{marginLeft: 10, marginVertical: 4}}>
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
    // alignSelf: 'flex-end',
  },
});
