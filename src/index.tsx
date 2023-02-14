import React from 'react';
import Router from './navigator/RootNavigator';
import {Provider} from 'react-redux';
import store, {persistor} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import BottomSheet, {
  BottomSheetModalProvider,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet';
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
