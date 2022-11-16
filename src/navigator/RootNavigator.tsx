import {NavigationContainer} from '@react-navigation/native';
import GlobalLoader from 'components/GlobalLoader/GlobalLoader';
import Toast from 'components/Toast/Toast';
import React from 'react';
import {View} from 'react-native';
import {utilsState} from 'redux/features/utils/utilsSlice';
import {useAppSelector} from 'redux/hooks';
import MainStackNavigator from './MainStackNavigator';

const Router: React.FC = () => {
  const loader = useAppSelector(utilsState).isShowLoader;
  const toastState = useAppSelector(utilsState);
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
      {<GlobalLoader isShow={loader} />}
      <Toast
        message={toastState.messageToast}
        title={toastState.titleToast}
        type={toastState.typeToast}
        show={toastState.isShowToast}
      />
    </View>
  );
};

export default Router;
