import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import Splash from './Splash';
import HomePage from './HomePage';
import store from '../../redux/store';

const App = () => {
  const normalBool = true;

  return (
    <SafeAreaView style={style.safeArea}>
      <Provider store={store}>
        <View style={style.appWrapper}>
          {normalBool ? <HomePage /> : <Splash />}
        </View>
      </Provider>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    fontFamily: 'Trebuchet MS',
  },
  appWrapper: {
    flex: 1,
  },
});

export default App;
