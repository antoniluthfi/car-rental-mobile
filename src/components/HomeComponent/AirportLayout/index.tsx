import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FC } from 'react';
import { img_coming_soon } from 'assets/images';

const AirportLayout: FC = () => {
  return (
    <View>
      <Image source={img_coming_soon} style={{
        width: '90%',
        alignSelf: 'center',
        height: 300,
        resizeMode: 'contain'
      }} />
    </View>
  )
}

export default AirportLayout;

const styles = StyleSheet.create({});