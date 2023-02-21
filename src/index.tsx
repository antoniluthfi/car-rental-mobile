import CodePush from 'react-native-code-push';
import i18n from 'assets/lang/i18n';
import React from 'react';
import Router from './navigator/RootNavigator';
import store, {persistor} from './redux/store';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';

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

const codePushOptions = {checkFrequency: CodePush.CheckFrequency.ON_APP_START};

const App = CodePush(codePushOptions)(index);

export default App;
