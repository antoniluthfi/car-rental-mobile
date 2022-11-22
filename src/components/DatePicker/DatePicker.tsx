import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {ReactNode, useEffect, useState} from 'react';
import {ic_calendar, ic_clock, ic_pinpoin} from 'assets/icons';
import {rowCenter, iconSize, WINDOW_HEIGHT, WINDOW_WIDTH} from 'utils/mixins';
import {h1, h5} from 'utils/styles';
import {theme} from 'utils';
import DatePicker from 'react-native-modern-datepicker';
import BsheetDatePicker from 'components/BSheet/BsheetDatePicker';
import {showBSheet} from 'utils/BSheet';
import {FONT_SIZE_10} from 'utils/typography';

interface IProps {
  title: string;
  placeholder: string;
  mode: 'clock' | 'date';
  containerStyle: ViewStyle;
  content?: ReactNode;
  value: string;
  onChangeTime?: any;
}

const CustomDatePicker = ({
  title,
  mode,
  placeholder,
  containerStyle,
  value,
  content,
  onChangeTime,
}: IProps) => {
  // const [showBSheet, setShowSheet] = useState(false);
  const [hour, setHour] = useState('');
  const [minutes, setMinutes] = useState('');

  const methods = {
    handleBSheet: () => {
      showBSheet({
        content: content,
      });
    },
  };

  useEffect(() => {
    if (!onChangeTime) return;
    if (hour.length < 2) {
      onChangeTime(hour);
    } else {
      onChangeTime(hour + minutes);
    }
  }, [hour, minutes]);

  return (
    <View style={containerStyle}>
      <Text style={[h1, {fontSize: 14}]}>{title}</Text>
      <View style={[rowCenter, styles.wrapper]}>
        <Image
          source={mode === 'clock' ? ic_clock : ic_calendar}
          style={iconSize}
        />
        {content && (
          <TouchableOpacity onPress={methods.handleBSheet}>
            <Text style={[h5, {marginLeft: 10}]}>{value || placeholder}</Text>
          </TouchableOpacity>
        )}
        {!content && (
          <View style={[rowCenter, {marginLeft: 10}]}>
            <TextInput
              placeholder="00"
              maxLength={2}
              onChangeText={v => setHour(v)}
            />
            <Text style={{marginHorizontal: 5}}>:</Text>
            <TextInput
              placeholder="00"
              maxLength={2}
              onChangeText={v => setMinutes(v)}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey3,
    paddingVertical: 10,
    marginTop: 10,
  },
});
