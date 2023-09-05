import React from 'react';
import {ImageBackground, SafeAreaView, StyleSheet, View} from 'react-native';
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
          <ImageBackground
            style={style.imagBg}
            source={{
              uri: 'https://raw.githubusercontent.com/frempongdev/Image-Master/main/weather%20bck.jpg?token=GHSAT0AAAAAAB4773Z3QVRHGEMHKWCKCICKZHGPL6Q',
            }}>
            {normalBool ? <HomePage /> : <Splash />}
          </ImageBackground>
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
  imagBg: {
    flex: 1,
  },
});

export default App;
