/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import Navigation from './src/Navigations/Navigation';
import {Text, View} from 'react-native';
import Login from './src/screens/Login';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  
  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 2000);
  }, []);

  return (
    <Provider store={store}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Navigation />
      </View>
    </Provider>
  );
};

export default App;
