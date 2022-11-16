import {Text, View} from 'react-native';
import React from 'react';
import hoc from 'components/hoc';
import Button from 'components/Button';
import { useAppDispatch } from 'redux/hooks';
import { logout } from 'redux/features/auth/authSlice';
import { toggleLoader } from 'redux/features/utils/utilsSlice';

const AccountScreen: React.FC = () => {
  // const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const methods = {
    handleLogout:()=> {
      dispatch(toggleLoader(true))
      setTimeout(() => {
        dispatch(logout())
        dispatch(toggleLoader(false))
      }, 1000);
    }
  }
  return (
    <View>
      <Text>MyAccount</Text>
      <Button
        _theme='navy'
        onPress={methods.handleLogout}
        title={'LOGOUT'}
      />
    </View>
  );
};

export default hoc(AccountScreen);
