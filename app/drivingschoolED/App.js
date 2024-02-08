import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import {Provider} from 'react-redux';
import {Navigator} from './screens/RootStackScreen';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './screens/navigation/TabNavigation';
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
