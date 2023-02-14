import React from 'react';
import {FC} from 'react';
import {h1, h4} from 'utils/styles';
import {Image, StyleSheet, Text, View} from 'react-native';
import {img_register_bg} from 'assets/images';
import {useTranslation} from 'react-i18next';

const TourLayout: FC = () => {
  const {t} = useTranslation();

  return (
    <View>
      <View
        style={{
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text style={[h1]}>{t('myBooking.noOrder')}</Text>
        <Text style={[h4]}>{t('myBooking.noRental')}</Text>
        <Image
          source={img_register_bg}
          style={{
            width: '90%',
            height: 200,
            resizeMode: 'contain',
            alignSelf: 'center',
            marginTop: 20,
          }}
        />
      </View>
    </View>
  );
};

export default TourLayout;

const styles = StyleSheet.create({});
