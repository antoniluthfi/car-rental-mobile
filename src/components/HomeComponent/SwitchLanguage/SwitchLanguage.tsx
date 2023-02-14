import React, { useState } from 'react';
import { h1 } from 'utils/styles';
import { ic_getride } from 'assets/icons';
import { rowCenter } from 'utils/mixins';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
  } from 'react-native';
import { theme } from 'utils';
import { useTranslation } from 'react-i18next';

const SwitchLanguage = () => {
  const {i18n} = useTranslation();
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleSwitch = (e?: any) => {
    setIsEnabled(previousState => !previousState);
    i18n.changeLanguage(e ? 'en' : 'id');
  };

  return (
    <View style={[rowCenter, {justifyContent: 'space-between', margin: 16}]}>
      <Image
        source={ic_getride}
        style={{height: 28, width: 63, resizeMode: 'contain'}}
      />

      <TouchableOpacity
        style={[
          rowCenter,
          {
            // marginRight: 16,
          },
        ]}
        onPress={() => toggleSwitch(isEnabled)}>
        <View
          style={[
            styles.switchWrapper1,
            {
              backgroundColor: isEnabled ? theme.colors.navy : '#fff',
              borderWidth: 1,
              borderColor: isEnabled ? theme.colors.navy : theme.colors.grey4
            },
          ]}>
          <Text style={[h1, {color: isEnabled ? '#fff' : '#828181'}]}>ID</Text>
        </View>

        <View style={[
            styles.switchWrapper2,
            {
              backgroundColor: !isEnabled ? theme.colors.navy : '#fff',
              borderWidth: 1,
              borderColor: !isEnabled ? theme.colors.navy : theme.colors.grey4
            },
          ]}>
          <Text style={[h1, {color: !isEnabled ? '#fff' : '#828181'}]}>EN</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SwitchLanguage;

const styles = StyleSheet.create({
  switchWrapper1: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  switchWrapper2: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
});
