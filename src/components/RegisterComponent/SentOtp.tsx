import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import Button from 'components/Button';
import {h1, h2, h3} from 'utils/styles';
import {FONT_SIZE_16, FONT_SIZE_20} from 'utils/typography';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {utilsState} from 'redux/features/utils/utilsSlice';
import { authRegister } from 'redux/features/auth/authAPI';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const sentOtp: FC = () => {
  const userData = useAppSelector(utilsState).userData;
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const methods = {
    handleSentOtp:async()=> {
      let res = await dispatch(authRegister(userData));
      if(res.type.includes('rejected')) {
        // console.log(JSON.stringify(res));
        if(res.payload?.detail?.find((x: any)=> x.field === 'password' || x.field === 'password_confirmation')) {
          navigation.navigate('RegisterPassword');
          return;
        }
        navigation.navigate('Register');
        return;
      }

      navigation.push('RegisterVerification', {page: 'inputOtp'});
      
      
    }
  }

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
      }}>
      <Text style={[h3, {marginTop: 24}]}>
        Kirim Kode OTP ke{' '}
        {userData?.registration_type === 'email' ? 'Email' : 'Nomor'} :
      </Text>
      <Text style={[h1, styles.textPhone]}>
        {userData?.registration_type === 'email'
          ? userData.email
          : userData.registration_type === 'phone'
          ? userData.phone
          : userData.wa}
      </Text>
      <Button _theme="navy" title="Kirim OTP" onPress={methods.handleSentOtp} />
    </View>
  );
};

export default sentOtp;

const styles = StyleSheet.create({
  textPhone: {
    fontSize: FONT_SIZE_20,
    marginTop: 20,
    marginBottom: 64,
  },
});
