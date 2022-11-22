import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {ic_mail, ic_phone, ic_wa} from 'assets/icons';
import {iconSize, rowCenter} from 'utils/mixins';
import {theme} from 'utils';
import { FONT_SIZE_14 } from 'utils/typography';
import { IRegisterVerificationMethod, IRegisterVerificationStep } from 'types/global.types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { utilsState } from 'redux/features/utils/utilsSlice';
import { appDataState, saveFormRegister } from 'redux/features/appData/appDataSlice';

const SelectVerificationMethod: FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const dispatch = useAppDispatch();
  const userData = useAppSelector(appDataState).userData;

  const methods = {
    handleNavigate:(method: IRegisterVerificationMethod) => {
      dispatch(saveFormRegister({...userData, registration_type: method}));
      navigation.push('RegisterVerification', {page: 'sendOtp'});
    }
  }

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
      }}>
      <TouchableOpacity style={[rowCenter, styles.boxWrapper]} onPress={()=> methods.handleNavigate('phone')}>
        <Image source={ic_phone} style={iconSize} />
        <Text style={styles.textBox}>No. Handphone</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[rowCenter, styles.boxWrapper]} onPress={()=> methods.handleNavigate('email')}>
        <Image source={ic_mail} style={iconSize} />
        <Text style={styles.textBox}>Email</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[rowCenter, styles.boxWrapper]} onPress={()=> methods.handleNavigate('wa')}>
        <Image source={ic_wa} style={iconSize} />
        <Text style={styles.textBox}>Whatsapp</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectVerificationMethod;

const styles = StyleSheet.create({
  boxWrapper: {
    borderWidth: 1,
    borderColor: theme.colors.grey5,
    borderRadius: 8,
    width: '95%',
    padding: 15,
    // justifyContent: 'center',
    paddingLeft: '28%',
    marginTop: 24,
  },
  textBox: {
    fontSize: FONT_SIZE_14,
    fontWeight: '500',
    marginLeft: 15,
  },
});
