import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Splash from './Splash';
import HomePage from './HomePage';

const App = () => {
  const normalBool = true;

  return (
    <SafeAreaView style={style.safeArea}>
      <View style={style.appWrapper}>
        {normalBool ? <HomePage /> : <Splash />}
      </View>
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
