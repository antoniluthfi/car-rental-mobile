import i18n from 'assets/lang/i18n';
import React from 'react';
import Router from './navigator/RootNavigator';
import store, {persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const initI18n = i18n;

const index: React.FC = () => {
  return (
    <Provider store={store}>
      <BottomSheetModalProvider>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
        </PersistGate>
      </BottomSheetModalProvider>
    </Provider>
  );
};

export default index;
