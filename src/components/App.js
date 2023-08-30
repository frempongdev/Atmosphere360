import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Splash from './Splash';

const App = () => {
  return (
    <SafeAreaView style={style.safeArea}>
      <View style={style.appWrapper}>
        <Splash />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  appWrapper: {
    flex: 1,
  },
});
export default App;
