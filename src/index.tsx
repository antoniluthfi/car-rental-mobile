import React from 'react';
import Router from './navigator/RootNavigator';
import {Provider} from 'react-redux';
import store, {persistor} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
const index: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router />
      </PersistGate>
    </Provider>
  );
};

export default index;
