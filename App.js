/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import RouteComponent from './src/navigation';
import {NativeBaseProvider} from 'native-base';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NativeBaseProvider>
          <RouteComponent />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
