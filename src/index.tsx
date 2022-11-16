import React from 'react';
import Router from './navigator/RootNavigator';
import {Provider} from 'react-redux';
import {store} from './redux/store';
const index: React.FC = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default index;
