import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ic_getride, ic_get_ride_2} from 'assets/icons';
import useLangSelector from 'utils/useLangSelector';
import {h1, h4, h5} from 'utils/styles';
import {theme} from 'utils';
import {img_car_4, img_wave} from 'assets/images';
import {WINDOW_WIDTH} from 'utils/mixins';

const GetRideDescription = () => {
  const t = useLangSelector().Home;
  return (
          
    <View style={{backgroundColor: '#fff'}}>
      <View
        style={{
          padding: 40,
        }}>
        <Image
          source={ic_getride}
          style={{height: 38, width: 94}}
          resizeMode={'contain'}
        />
        <Text style={[h1, styles.textTitle]}>{t.getrideDescription.title}</Text>
        <Text style={[h5, styles.textDesc]}>
          {t.getrideDescription.description}
        </Text>
      </View>
      <View style={{marginBottom: 30}}>
        <Image
          source={img_wave}
          style={{height: 281, width: WINDOW_WIDTH, flex: 1}}
        />
        <Image
          source={img_car_4}
          style={{
            height: 161,
            width: 288,
            position: 'absolute',
            alignSelf: 'center',
            top: '20%',
          }}
          resizeMode={'contain'}
        />
      </View>
    </View>
  );
};

export default GetRideDescription;

const styles = StyleSheet.create({
  textTitle: {color: theme.colors.navy, fontSize: 18, marginVertical: 18},
  textDesc: {
    lineHeight: 24,
  },
});
