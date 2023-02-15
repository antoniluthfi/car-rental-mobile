import React from 'react';
import {h1, h5} from 'utils/styles';
import {ic_getride} from 'assets/icons';
import {Image, StyleSheet, Text, View} from 'react-native';
import {img_car_4, img_getride} from 'assets/images';
import {theme} from 'utils';
import {WINDOW_WIDTH} from 'utils/mixins';
import {useTranslation} from 'react-i18next';

const GetRideDescription = () => {
  const {t} = useTranslation();

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
        <Text style={[h1, styles.textTitle]}>
          {t('Home.getrideDescription.title')}
        </Text>
        <Text style={[h5, styles.textDesc]}>
          {t('Home.getrideDescription.description')}
        </Text>
      </View>
      <View style={{marginBottom: 30}}>
        <Image
          source={img_getride}
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
