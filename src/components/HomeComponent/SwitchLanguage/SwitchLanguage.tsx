import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {iconSize, rowCenter} from 'utils/mixins';
import {ic_getride} from 'assets/icons';
import {useAppDispatch} from 'redux/hooks';
import {toggleLanguages} from 'redux/features/appData/appDataSlice';
import {h1} from 'utils/styles';
import {theme} from 'utils';

const SwitchLanguage = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const dispatch = useAppDispatch();
  // const lang = useLangSelector();

  const toggleSwitch = (e?: any) => {
    console.log(e);
    setIsEnabled(previousState => !previousState);
    dispatch(toggleLanguages(e ? 'en' : 'id'));
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
